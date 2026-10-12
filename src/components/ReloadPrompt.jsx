import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRegisterSW } from 'virtual:pwa-register/react';

/* Shows when the SW is ready or a new build is waiting.
   "Refresh" activates the new service worker and reloads. */
export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const ref = useRef(null);
  const visible = needRefresh || offlineReady;

  useEffect(() => {
    if (visible && ref.current) {
      gsap.fromTo(ref.current,
        { y: 90, opacity: 0, scale: 0.92, rotation: -1.5 },
        { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.5)' });
    }
  }, [visible]);

  // "ready offline" auto-dismisses; "new version" stays until acted on
  useEffect(() => {
    if (offlineReady && !needRefresh) {
      const t = setTimeout(close, 4500);
      return () => clearTimeout(t);
    }
  }, [offlineReady, needRefresh]);

  const close = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: 90, opacity: 0, scale: 0.92, duration: 0.4, ease: 'power3.in',
      onComplete: () => { setOfflineReady(false); setNeedRefresh(false); },
    });
  };

  if (!visible) return null;

  return (
    <div ref={ref} role="status" aria-live="polite"
      className="fixed bottom-24 right-4 sm:right-6 z-[80] will-change-transform">
      <div className="glass rounded-2xl px-5 py-4 flex items-center gap-4 max-w-xs
        shadow-[0_12px_40px_-8px_rgba(15,23,42,0.35)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.7)]">

        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
          {needRefresh
            ? 'New version available — refresh to update.'
            : 'App is ready to work offline.'}
        </p>

        {needRefresh && (
          <button
            onClick={() => updateServiceWorker(true)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500
              text-white text-xs font-bold transition-colors cursor-pointer">
            Refresh
          </button>
        )}

        <button onClick={close} aria-label="Dismiss"
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
            transition-colors text-xl leading-none cursor-pointer">×</button>
      </div>
    </div>
  );
}