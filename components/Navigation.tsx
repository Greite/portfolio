'use client';

import type { Dictionary } from '@root/dictionaries/fr';
import { type Locale, sectionIds, sectionKeys, switchLocalePath } from '@root/lib/locales';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuGithub, LuLinkedin, LuMail, LuMenu, LuX } from 'react-icons/lu';

import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  nav: Dictionary['nav'];
  theme: Dictionary['common']['theme'];
}

export default function Navigation({ nav, theme }: NavigationProps) {
  const { lang } = useParams<{ lang: Locale }>();
  const pathname = usePathname();
  const links = sectionKeys.map((key) => ({ key, id: sectionIds[lang][key], label: nav.sections[key] }));
  const otherLang: Locale = lang === 'fr' ? 'en' : 'fr';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Sur l'accueil, on garde la section en cours, sous son ancre traduite (`/en#projects` → `/fr#projets`).
  const activeKey = links.find((link) => link.id === activeId)?.key;
  // <a> et non <Link> : le root layout change de langue, un chargement complet met à jour <html lang>.
  const langSwitch = (
    <a
      href={`${switchLocalePath(pathname, otherLang)}${activeKey ? `#${sectionIds[otherLang][activeKey]}` : ''}`}
      hrefLang={otherLang}
      lang={otherLang}
      aria-label={`${nav.otherLang.code} – ${nav.otherLang.name}`}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-transparent px-3 text-sm font-semibold text-fg-secondary transition-[color,border-color,scale] duration-150 ease-out-strong hover:border-border-accent hover:text-accent active:scale-[0.97]"
    >
      {nav.otherLang.code}
    </a>
  );

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
    const sections = sectionKeys
      .map((key) => document.getElementById(sectionIds[lang][key]))
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
  }, [lang]);

  return (
    <>
      <nav aria-label={nav.main} className="sticky top-0 z-40 w-full [container-type:scroll-state]">
        <div className="nav-edge material bg-surface/[0.93] backdrop-blur-md">
          <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4 lg:px-10 xl:px-[7.5rem]">
            <Link
              href={`/${lang}`}
              aria-label={nav.home}
              className="inline-flex items-center rounded-md text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
            >
              <Logo size={36} />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-2 lg:flex">
              {links.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={`/${lang}#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 after:absolute after:-bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-200 after:ease-out-strong ${
                      isActive
                        ? 'text-accent after:scale-x-100'
                        : 'text-fg hover:text-accent after:scale-x-0 hover:after:scale-x-100'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="ml-3 flex items-center gap-2">
                <ThemeToggle labels={theme} />
                {langSwitch}
              </div>

              <a
                href="mailto:contact@gauthierpainteaux.fr"
                className="ml-3 inline-flex min-h-9 items-center rounded-full border border-border-accent px-5 py-2 text-sm font-semibold text-accent transition-[background-color,color,scale] duration-150 ease-out-strong hover:bg-accent hover:text-accent-fg active:scale-[0.97]"
              >
                {nav.contact}
              </a>
            </div>

            {/* Mobile: language switch stays visible next to the hamburger */}
            <div className="flex items-center gap-1 lg:hidden">
              {langSwitch}
              <button
                ref={hamburgerRef}
                type="button"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
                onClick={() => setIsMenuOpen(true)}
                aria-label={nav.openMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <LuMenu size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay. Kept mounted so the exit can animate; inert when closed. */}
      <div
        id="mobile-menu"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={nav.menu}
        data-state={isMenuOpen ? 'open' : 'closed'}
        inert={!isMenuOpen}
        className="material fixed inset-0 z-50 flex origin-top-right flex-col bg-surface/90 backdrop-blur-xl transition-[opacity,scale] ease-out-strong data-[state=closed]:pointer-events-none data-[state=closed]:scale-[0.98] data-[state=closed]:opacity-0 data-[state=closed]:duration-150 data-[state=open]:duration-[180ms] data-[state=open]:will-change-[opacity,scale] lg:hidden"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4">
          <Link
            href={`/${lang}`}
            aria-label={nav.home}
            className="inline-flex items-center rounded-md text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
            onClick={closeMenu}
          >
            <Logo size={36} />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
            onClick={closeMenu}
            aria-label={nav.closeMenu}
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
                <li key={link.id} className="stagger-item" style={{ animationDelay: `${60 + index * 60}ms` }}>
                  <a
                    href={`/${lang}#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center gap-4 py-6 transition-colors duration-150 hover:text-accent ${
                      index < links.length - 1 ? 'border-b border-border' : ''
                    } ${isActive ? 'text-accent' : 'text-fg'}`}
                    onClick={closeMenu}
                  >
                    <span className="text-[0.8125rem] font-semibold text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-3xl font-bold tracking-[var(--tracking-brand-tight)]">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Bottom section */}
          <div className="flex flex-col items-center gap-7">
            <div className="flex items-center gap-3">
              <ThemeToggle labels={theme} />
              {langSwitch}
            </div>

            <Link
              href="mailto:contact@gauthierpainteaux.fr"
              className="flex w-full min-h-11 items-center justify-center gap-2.5 rounded-full bg-cta py-4 text-base font-semibold text-cta-fg transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent-strong active:scale-[0.97]"
              onClick={closeMenu}
            >
              <LuMail size={18} aria-hidden="true" />
              {nav.contact}
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
              >
                <LuLinkedin size={18} aria-hidden="true" className="text-accent" />
                <span className="text-[0.8125rem] font-medium">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/Greite"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
              >
                <LuGithub size={18} aria-hidden="true" className="text-accent" />
                <span className="text-[0.8125rem] font-medium">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
