import Image from 'next/image';
import Link from 'next/link';
import { LuArrowDown, LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';

import CopyEmail from './CopyEmail';

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
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-name" className="relative isolate w-full overflow-hidden bg-surface">
      {/* Warm honey halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[26.25rem] w-[26.25rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_var(--glow)_0%,_transparent_70%)] sm:h-[35rem] sm:w-[35rem] lg:left-auto lg:right-[6%] lg:translate-x-0"
      />

      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-12 px-6 py-12 md:px-[7.5rem] sm:py-16 lg:min-h-[65dvh] lg:flex-row lg:gap-20 lg:py-20">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-8 items-center lg:items-start">
          {/* Name block */}
          <h1
            id="hero-name"
            className="reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[var(--tracking-brand)] uppercase text-center lg:text-left"
          >
            <span className="block text-fg leading-none">Gauthier</span>
            <span className="block text-accent leading-none">Painteaux</span>
          </h1>

          {/* Subtitle */}
          <p className="reveal reveal-delay-1 text-fg text-lg sm:text-xl font-medium text-center lg:text-left">
            Développeur Web Fullstack
          </p>

          {/* Intro text */}
          <p className="reveal reveal-delay-2 text-fg-secondary text-base font-normal leading-relaxed max-w-[30rem] text-center lg:text-left">
            Je conçois et développe des applications web modernes et performantes.
          </p>

          {/* CTA Buttons */}
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch sm:items-center">
            <Link
              href="mailto:contact@gauthierpainteaux.fr"
              className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-fg transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent-strong active:scale-[0.97]"
            >
              <LuMail size={16} aria-hidden="true" />
              Me contacter
            </Link>
            <Link
              href="#projets"
              className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-border-accent px-7 py-3.5 text-sm font-semibold text-accent transition-[background-color,color,scale] duration-150 ease-out-strong hover:bg-accent hover:text-accent-fg active:scale-[0.97]"
            >
              Voir mes projets
              <LuArrowDown size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Social links */}
          <ul className="reveal reveal-delay-4 flex flex-wrap gap-x-1 gap-y-2 items-center social-list">
            {socials.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <Link
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
                >
                  <Icon size={18} aria-hidden="true" className="text-accent" />
                  <span className="text-[0.8125rem] font-medium">{label}</span>
                </Link>
              </li>
            ))}
            <li>
              <CopyEmail
                label="Email"
                iconSize={18}
                className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-2 text-[0.8125rem] font-medium text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
              />
            </li>
          </ul>
        </div>

        {/* Right Column - Photo */}
        <div className="reveal-photo reveal-delay-2 flex-shrink-0 order-first lg:order-last">
          <div className="w-[12.5rem] h-[12.5rem] sm:w-[18.75rem] sm:h-[18.75rem] lg:w-80 lg:h-80 rounded-full border-2 border-border-accent shadow-[var(--shadow-photo)] overflow-hidden">
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
  );
}
