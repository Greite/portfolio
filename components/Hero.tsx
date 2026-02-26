import Image from 'next/image'
import Link from 'next/link'
import { LuLinkedin, LuGithub, LuMail } from 'react-icons/lu'

export default function Hero() {
  return (
    <section className="w-full bg-brand-50">
      <div className="mx-auto flex w-full max-w-[1440px] min-h-[65vh] flex-col-reverse items-center gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:gap-20 lg:px-[120px] lg:py-20">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-8 items-center lg:items-start">
          {/* Name block */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[4px] sm:tracking-[6px] uppercase text-center lg:text-left">
            <span className="block text-brand-950 leading-none">Gauthier</span>
            <span className="block text-brand-600 leading-none">Painteaux</span>
          </h1>

          {/* Subtitle */}
          <p className="text-brand-950 text-lg sm:text-xl font-medium text-center lg:text-left">
            Développeur Web Fullstack
          </p>

          {/* Intro text */}
          <p className="text-brand-950 text-base font-normal opacity-70 leading-relaxed max-w-[480px] text-center lg:text-left">
            Je conçois et développe des applications web modernes et performantes.
          </p>

          {/* CTA Button */}
          <Link
            href="mailto:contact@gauthierpainteaux.fr"
            className="bg-brand-950 text-brand-50 font-semibold text-sm rounded-full py-3.5 px-7 flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <LuMail size={16} aria-hidden="true" />
            Me contacter
          </Link>

          {/* Social links */}
          <div className="flex gap-6 items-center">
            <Link
              href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/"
              target="_blank"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <LuLinkedin size="18px" className="text-brand-600" />
              <span className="text-brand-950 text-[13px] font-medium">LinkedIn</span>
            </Link>

            <span className="text-brand-600 font-medium select-none">/</span>

            <Link
              href="https://github.com/Greite"
              target="_blank"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <LuGithub size="18px" className="text-brand-600" />
              <span className="text-brand-950 text-[13px] font-medium">GitHub</span>
            </Link>

            <span className="text-brand-600 font-medium select-none">/</span>

            <Link
              href="mailto:contact@gauthierpainteaux.fr"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <LuMail size="18px" className="text-brand-600" />
              <span className="text-brand-950 text-[13px] font-medium">Email</span>
            </Link>
          </div>
        </div>

        {/* Right Column - Photo */}
        <div className="flex-shrink-0">
          <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-80 lg:h-80 rounded-full border-2 border-brand-600 shadow-[0_0_24px_4px_rgba(198,137,8,0.2)] overflow-hidden">
            <Image
              className="rounded-full object-cover w-full h-full"
              src="/photo.webp"
              alt="Gauthier Painteaux"
              width={320}
              height={320}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
