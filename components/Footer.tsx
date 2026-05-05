import Link from 'next/link'
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-surface-raised">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-12 md:px-[120px] md:py-[60px]">
        {/* Accent Line */}
        <div aria-hidden="true" className="h-[3px] w-full rounded-sm bg-accent" />

        {/* Footer Content */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-10">
          {/* Left - Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-[22px] font-bold">
              <span className="text-fg">Gauthier </span>
              <span className="text-accent">Painteaux</span>
            </span>
            <span className="text-sm font-normal text-fg-secondary">Lead Développeur chez Koul</span>
          </div>

          {/* Center - Navigation */}
          <nav aria-label="Navigation pied de page" className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-[var(--tracking-brand)] text-accent">NAVIGATION</h3>
            <a
              href="#a-propos"
              className="inline-flex min-h-11 items-center rounded-md text-sm font-normal text-fg transition-opacity hover:opacity-80"
            >
              À propos
            </a>
            <a
              href="#experience"
              className="inline-flex min-h-11 items-center rounded-md text-sm font-normal text-fg transition-opacity hover:opacity-80"
            >
              Expérience
            </a>
            <a
              href="#projets"
              className="inline-flex min-h-11 items-center rounded-md text-sm font-normal text-fg transition-opacity hover:opacity-80"
            >
              Projets
            </a>
            <a
              href="#formations"
              className="inline-flex min-h-11 items-center rounded-md text-sm font-normal text-fg transition-opacity hover:opacity-80"
            >
              Formations
            </a>
          </nav>

          {/* Right - Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-[var(--tracking-brand)] text-accent">CONTACT</h3>
            <Link
              href="mailto:contact@gauthierpainteaux.fr"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-sm font-normal text-fg transition-opacity hover:opacity-80"
            >
              <LuMail size={16} aria-hidden="true" className="text-accent" />
              <span>contact@gauthierpainteaux.fr</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-sm font-normal text-fg transition-opacity hover:opacity-80"
            >
              <LuLinkedin size={16} aria-hidden="true" className="text-accent" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/Greite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-sm font-normal text-fg transition-opacity hover:opacity-80"
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
            © {currentYear} Gauthier Painteaux. Tous droits réservés.
          </span>
        </div>
      </div>
    </footer>
  )
}
