'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LuGithub, LuLinkedin, LuMail, LuMenu, LuX } from 'react-icons/lu'

const desktopLinks = [
  { label: 'À propos', href: '#a-propos' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Formations', href: '#formations' },
]

const mobileLinks = [
  { label: 'À propos', href: '#a-propos', num: '01' },
  { label: 'Expérience', href: '#experience', num: '02' },
  { label: 'Formations', href: '#formations', num: '03' },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b-1 border-brand-600 bg-brand-50/[0.93] shadow-[0_2px_12px_rgba(65,32,7,0.08),0_0_24px_4px_rgba(198,137,8,0.2)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-20">
          <a href="/" className="text-2xl font-bold text-brand-950">
            G.P
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {desktopLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-brand-950">
                {link.label}
              </a>
            ))}

            <a
              href="mailto:contact@gauthierpainteaux.fr"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-50"
            >
              Me contacter
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="text-brand-950 lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <LuMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-brand-50 lg:hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4">
            <a href="/" className="text-2xl font-bold text-brand-950" onClick={() => setIsMenuOpen(false)}>
              G.P
            </a>
            <button
              type="button"
              className="text-brand-950"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <LuX size={24} />
            </button>
          </div>

          {/* Menu body */}
          <div className="flex flex-1 flex-col justify-between px-8 py-[60px]">
            {/* Nav links */}
            <div className="flex flex-col">
              {mobileLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-4 py-6 ${index < mobileLinks.length - 1 ? 'border-b border-brand-950' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-[13px] font-normal text-brand-600">{link.num}</span>
                  <span className="text-[32px] font-bold tracking-[2px] text-brand-950">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Bottom section */}
            <div className="flex flex-col items-center gap-7">
              <Link
                href="mailto:contact@gauthierpainteaux.fr"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-950 py-4 text-base font-semibold text-brand-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <LuMail size={18} className="text-brand-50" />
                Me contacter
              </Link>

              <div className="flex items-center gap-8">
                <Link
                  href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <LuLinkedin size={18} className="text-brand-600" />
                  <span className="text-[13px] font-medium text-brand-950">LinkedIn</span>
                </Link>
                <Link
                  href="https://github.com/Greite"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <LuGithub size={18} className="text-brand-600" />
                  <span className="text-[13px] font-medium text-brand-950">GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
