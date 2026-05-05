import Image from 'next/image'
import Link from 'next/link'
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gauthier-painteaux-1018a2167/',
    Icon: LuLinkedin,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Greite',
    Icon: LuGithub,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:contact@gauthierpainteaux.fr',
    Icon: LuMail,
    external: false,
  },
]

export default function Hero() {
  return (
    <section aria-labelledby="hero-name" className="w-full bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] min-h-[65dvh] flex-col items-center gap-12 px-6 py-12 md:px-[120px] sm:py-16 lg:flex-row lg:gap-20 lg:py-20">
        {/* Left Column */}
        <div className="reveal flex flex-1 flex-col gap-8 items-center lg:items-start">
          {/* Name block */}
          <h1
            id="hero-name"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[var(--tracking-brand)] sm:tracking-[var(--tracking-brand-wide)] uppercase text-center lg:text-left"
          >
            <span className="block text-fg leading-none">Gauthier</span>
            <span className="block text-accent leading-none">Painteaux</span>
          </h1>

          {/* Subtitle */}
          <p className="text-fg text-lg sm:text-xl font-medium text-center lg:text-left">Développeur Web Fullstack</p>

          {/* Intro text */}
          <p className="text-fg-secondary text-base font-normal leading-relaxed max-w-[480px] text-center lg:text-left">
            Je conçois et développe des applications web modernes et performantes.
          </p>

          {/* CTA Button */}
          <Link
            href="mailto:contact@gauthierpainteaux.fr"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
          >
            <LuMail size={16} aria-hidden="true" />
            Me contacter
          </Link>

          {/* Social links */}
          <ul className="flex flex-wrap gap-x-1 gap-y-2 items-center social-list">
            {socials.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <Link
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 transition-opacity hover:opacity-80"
                >
                  <Icon size={18} aria-hidden="true" className="text-accent" />
                  <span className="text-fg text-[13px] font-medium">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Photo */}
        <div className="reveal reveal-delay-1 flex-shrink-0">
          <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-80 lg:h-80 rounded-full border-2 border-border-accent shadow-[var(--shadow-photo)] overflow-hidden">
            <Image
              className="rounded-full object-cover w-full h-full"
              src="/photo.webp"
              alt="Photo de profil de Gauthier Painteaux, développeur fullstack"
              width={320}
              height={320}
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 320px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
