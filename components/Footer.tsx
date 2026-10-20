import { getDictionary, getLang } from '@root/lib/i18n';
import { sectionIds, sectionKeys } from '@root/lib/locales';
import Link from 'next/link';
import { LuGithub, LuLinkedin } from 'react-icons/lu';

import CopyEmail from './CopyEmail';

export default async function Footer() {
  const lang = await getLang();
  const { nav, common, footer } = await getDictionary();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface-raised">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-6 py-12 md:px-[7.5rem] md:py-[3.75rem]">
        {/* Accent Line */}
        <div aria-hidden="true" className="h-[3px] w-full rounded-sm bg-accent" />

        {/* Footer Content */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-10">
          {/* Left - Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-[1.375rem] font-bold">
              <span className="text-fg">Gauthier </span>
              <span className="text-accent">Painteaux</span>
            </span>
            <span className="text-sm font-normal text-fg-secondary">{footer.role}</span>
          </div>

          {/* Center - Navigation */}
          <nav aria-label={footer.nav} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-[var(--tracking-brand-wide)] text-accent">NAVIGATION</h3>
            {sectionKeys.map((key) => (
              <a
                key={key}
                href={`/${lang}#${sectionIds[lang][key]}`}
                className="inline-flex min-h-11 items-center rounded-md text-sm font-normal text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
              >
                {nav.sections[key]}
              </a>
            ))}
          </nav>

          {/* Right - Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-[var(--tracking-brand-wide)] text-accent">CONTACT</h3>
            <CopyEmail
              labels={common}
              label="Email"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-sm font-normal text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
            />
            <Link
              href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-sm font-normal text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
            >
              <LuLinkedin size={16} aria-hidden="true" className="text-accent" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/Greite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-sm font-normal text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
            >
              <LuGithub size={16} aria-hidden="true" className="text-accent" />
              <span>GitHub / Greite</span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div aria-hidden="true" className="h-px w-full bg-border" />

        {/* Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span className="text-xs font-normal text-fg-secondary">
            © {currentYear} Gauthier Painteaux. {footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
