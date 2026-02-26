import Link from 'next/link'
import { LuLinkedin, LuGithub, LuMail } from 'react-icons/lu'

export default function Footer() {
  return (
    <footer className="w-full bg-brand-50">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-10 md:px-[120px] md:py-[60px]">
        {/* Accent Line */}
        <div className="h-[3px] w-full rounded-sm bg-brand-600" />

        {/* Footer Content */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-10">
          {/* Left - Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-[22px] font-bold text-brand-950">Gauthier Painteaux</span>
            <span className="text-sm font-normal text-brand-950 opacity-70">
              Lead Développeur chez Koul
            </span>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-semibold tracking-[4px] text-brand-600">NAVIGATION</span>
            <a href="#a-propos" className="text-sm font-normal text-brand-950">
              À propos
            </a>
            <a href="#experience" className="text-sm font-normal text-brand-950">
              Expérience
            </a>
            <a href="#formations" className="text-sm font-normal text-brand-950">
              Formations
            </a>
          </div>

          {/* Right - Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-semibold tracking-[4px] text-brand-600">CONTACT</span>
            <Link
              href="mailto:contact@gauthierpainteaux.fr"
              className="flex items-center gap-2.5"
            >
              <LuMail size="16px" className="text-brand-600" />
              <span className="text-sm font-normal text-brand-950">contact@gauthierpainteaux.fr</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/"
              target="_blank"
              className="flex items-center gap-2.5"
            >
              <LuLinkedin size="16px" className="text-brand-600" />
              <span className="text-sm font-normal text-brand-950">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/Greite"
              target="_blank"
              className="flex items-center gap-2.5"
            >
              <LuGithub size="16px" className="text-brand-600" />
              <span className="text-sm font-normal text-brand-950">GitHub / Greite</span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-brand-950 opacity-15" />

        {/* Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span className="text-xs font-normal text-brand-950 opacity-50">
            © 2026 Gauthier Painteaux. Tous droits réservés.
          </span>
        </div>
      </div>
    </footer>
  )
}
