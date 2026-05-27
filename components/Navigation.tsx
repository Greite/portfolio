'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuGithub, LuLinkedin, LuMail, LuMenu, LuX } from 'react-icons/lu';

import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'À propos', href: '#a-propos', id: 'a-propos', num: '01' },
  { label: 'Expérience', href: '#experience', id: 'experience', num: '02' },
  { label: 'Projets', href: '#projets', id: 'projets', num: '03' },
  { label: 'Formations', href: '#formations', id: 'formations', num: '04' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';

      return;
    }

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();

        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length === 0) {
          return;
        }

        const top = visible.reduce((acc, cur) => (cur.boundingClientRect.top < acc.boundingClientRect.top ? cur : acc));

        setActiveId(top.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className="sticky top-0 z-40 w-full border-b border-border-strong bg-surface/[0.93] shadow-[var(--shadow-nav)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-[120px]">
          <Link
            href="/"
            aria-label="Accueil — Gauthier Painteaux"
            className="inline-flex items-center rounded-md text-fg transition-opacity hover:opacity-80"
          >
            <Logo size={36} />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            {links.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-accent' : 'text-fg hover:text-accent'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-accent"
                    />
                  )}
                </a>
              );
            })}

            <div className="ml-3">
              <ThemeToggle />
            </div>

            <a
              href="mailto:contact@gauthierpainteaux.fr"
              className="ml-3 inline-flex min-h-9 items-center rounded-full border border-border-accent px-5 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-fg"
            >
              Me contacter
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            ref={hamburgerRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-fg transition-opacity hover:opacity-80 lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <LuMenu size={24} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-50 flex animate-[fadeIn_180ms_ease-out] flex-col bg-surface lg:hidden"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4">
            <Link
              href="/"
              aria-label="Accueil — Gauthier Painteaux"
              className="inline-flex items-center rounded-md text-fg transition-opacity hover:opacity-80"
              onClick={closeMenu}
            >
              <Logo size={36} />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-fg transition-opacity hover:opacity-80"
              onClick={closeMenu}
              aria-label="Fermer le menu"
            >
              <LuX size={24} aria-hidden="true" />
            </button>
          </div>

          {/* Menu body */}
          <div className="flex flex-1 flex-col justify-between px-8 py-12">
            <ul className="flex flex-col">
              {links.map((link, index) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.href} className="stagger-item" style={{ animationDelay: `${60 + index * 60}ms` }}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center gap-4 py-6 ${
                        index < links.length - 1 ? 'border-b border-border' : ''
                      } ${isActive ? 'text-accent' : 'text-fg'}`}
                      onClick={closeMenu}
                    >
                      <span className="text-[13px] font-semibold text-accent">{link.num}</span>
                      <span className="text-3xl font-bold tracking-[var(--tracking-brand-tight)]">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Bottom section */}
            <div className="flex flex-col items-center gap-7">
              <ThemeToggle />

              <Link
                href="mailto:contact@gauthierpainteaux.fr"
                className="flex w-full min-h-11 items-center justify-center gap-2.5 rounded-full bg-cta py-4 text-base font-semibold text-cta-fg transition-opacity hover:opacity-90"
                onClick={closeMenu}
              >
                <LuMail size={18} aria-hidden="true" />
                Me contacter
              </Link>

              <div className="flex items-center gap-6">
                <Link
                  href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 transition-opacity hover:opacity-80"
                >
                  <LuLinkedin size={18} aria-hidden="true" className="text-accent" />
                  <span className="text-[13px] font-medium text-fg">LinkedIn</span>
                </Link>
                <Link
                  href="https://github.com/Greite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 transition-opacity hover:opacity-80"
                >
                  <LuGithub size={18} aria-hidden="true" className="text-accent" />
                  <span className="text-[13px] font-medium text-fg">GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
