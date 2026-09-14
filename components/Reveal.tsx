'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export default function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${visible ? 'reveal' : 'reveal-pending'}`}>
      {children}
    </div>
  );
}
