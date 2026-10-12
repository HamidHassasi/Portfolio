import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js 3D particle network background.
 *  - 3D drifting nodes inside a soft bounding volume
 *  - Dynamic LineSegments connecting nearby nodes (rebuilt each frame batch)
 *  - Additive-blended glow nodes with camera mouse parallax
 *  - Auto-adapts palette to light/dark mode via MutationObserver
 */
export default function GraphBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const NODE_COUNT = isMobile ? 55 : 110;
    const SPREAD = 34;
    const HALF_X = SPREAD / 2;
    const HALF_Y = SPREAD * 0.30;
    const HALF_Z = SPREAD * 0.26;
    const CONNECTION_DIST = 8.2;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const MAX_EDGES = NODE_COUNT * 5;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050614, 0.018);

    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    /* ---------- Nodes ---------- */
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.55;
      velocities[i] = {
        x: (Math.random() - 0.5) * 0.014,
        y: (Math.random() - 0.5) * 0.014,
        z: (Math.random() - 0.5) * 0.014,
      };
    }
    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Soft circular sprite for glowing nodes
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext('2d');
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(196,181,253,0.85)');
    grad.addColorStop(1, 'rgba(139,92,246,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);
    const nodeTexture = new THREE.CanvasTexture(spriteCanvas);

    const nodeMat = new THREE.PointsMaterial({
      size: 0.62,
      map: nodeTexture,
      color: 0xc4b5fd,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      alphaTest: 0.01,
    });
    const nodes = new THREE.Points(nodeGeom, nodeMat);
    scene.add(nodes);

    /* ---------- Edges ---------- */
    const edgePositions = new Float32Array(MAX_EDGES * 6);
    const edgeGeom = new THREE.BufferGeometry();
    edgeGeom.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    edgeGeom.setDrawRange(0, 0);

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeom, edgeMat);
    scene.add(edges);

    const updateEdges = () => {
      let idx = 0;
      const p = nodeGeom.attributes.position.array;
      for (let i = 0; i < NODE_COUNT && idx < MAX_EDGES; i++) {
        for (let j = i + 1; j < NODE_COUNT && idx < MAX_EDGES; j++) {
          const dx = p[i * 3] - p[j * 3];
          const dy = p[i * 3 + 1] - p[j * 3 + 1];
          const dz = p[i * 3 + 2] - p[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < CONNECTION_DIST_SQ) {
            edgePositions[idx * 6]     = p[i * 3];
            edgePositions[idx * 6 + 1] = p[i * 3 + 1];
            edgePositions[idx * 6 + 2] = p[i * 3 + 2];
            edgePositions[idx * 6 + 3] = p[j * 3];
            edgePositions[idx * 6 + 4] = p[j * 3 + 1];
            edgePositions[idx * 6 + 5] = p[j * 3 + 2];
            idx++;
          }
        }
      }
      edgeGeom.attributes.position.needsUpdate = true;
      edgeGeom.setDrawRange(0, idx * 2);
    };

    /* ---------- Mouse / resize ---------- */
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ---------- Theme ---------- */
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        scene.fog.color.set(0x050614);
        nodeMat.color.set(0xc4b5fd);
        edgeMat.color.set(0xa78bfa);
        edgeMat.opacity = 0.24;
      } else {
        scene.fog.color.set(0xf5f3ff);
        nodeMat.color.set(0x8b5cf6);
        edgeMat.color.set(0x7c3aed);
        edgeMat.opacity = 0.14;
      }
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    /* ---------- Animate ---------- */
    let raf;
    let lastEdge = 0;
    let elapsed = 0;
    let prevTime = performance.now();
    const clock = new THREE.Clock();

    const animate = () => {
      const now = performance.now();
      const dt = Math.min(48, now - prevTime) / 16.67;
      prevTime = now;
      elapsed = clock.getElapsedTime();

      const p = nodeGeom.attributes.position.array;
      for (let i = 0; i < NODE_COUNT; i++) {
        p[i * 3]     += velocities[i].x * dt;
        p[i * 3 + 1] += velocities[i].y * dt;
        p[i * 3 + 2] += velocities[i].z * dt;

        if (p[i * 3] > HALF_X) { p[i * 3] = HALF_X; velocities[i].x *= -1; }
        if (p[i * 3] < -HALF_X) { p[i * 3] = -HALF_X; velocities[i].x *= -1; }
        if (p[i * 3 + 1] > HALF_Y) { p[i * 3 + 1] = HALF_Y; velocities[i].y *= -1; }
        if (p[i * 3 + 1] < -HALF_Y) { p[i * 3 + 1] = -HALF_Y; velocities[i].y *= -1; }
        if (p[i * 3 + 2] > HALF_Z) { p[i * 3 + 2] = HALF_Z; velocities[i].z *= -1; }
        if (p[i * 3 + 2] < -HALF_Z) { p[i * 3 + 2] = -HALF_Z; velocities[i].z *= -1; }
      }
      nodeGeom.attributes.position.needsUpdate = true;

      if (elapsed - lastEdge > 0.06) {
        updateEdges();
        lastEdge = elapsed;
      }

      // Mouse parallax (smoothed)
      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;
      camera.position.x = mouse.x * 4.5;
      camera.position.y = -mouse.y * 2.8;
      camera.lookAt(0, 0, 0);

      // Slow drift / breathing
      scene.rotation.y += 0.0007 * dt;
      scene.rotation.x = Math.sin(elapsed * 0.12) * 0.07;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      nodeGeom.dispose();
      edgeGeom.dispose();
      nodeMat.dispose();
      edgeMat.dispose();
      nodeTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none -z-20" />;
}