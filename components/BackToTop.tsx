'use client';

import { useEffect, useState } from 'react';
import { LuArrowUp } from 'react-icons/lu';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      tabIndex={visible ? 0 : -1}
      className={`material fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-accent bg-surface-raised/90 text-accent shadow-[var(--shadow-photo)] backdrop-blur-md transition-[opacity,translate,scale,background-color,color] ease-out-strong hover:bg-accent hover:text-accent-fg active:scale-[0.97] ${
        visible
          ? 'translate-y-0 opacity-100 duration-[220ms]'
          : 'pointer-events-none translate-y-4 opacity-0 duration-150'
      }`}
    >
      <LuArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
