import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-surface px-8">
      <div className="flex flex-col items-center gap-5">
        <span
          aria-hidden="true"
          className="text-[80px] font-bold tracking-[var(--tracking-brand-wide)] text-accent sm:text-[120px]"
        >
          404
        </span>
        <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent sm:w-[60px]" />
        <h1 className="text-2xl font-bold text-fg sm:text-[32px]">Page introuvable</h1>
        <p className="max-w-[300px] text-center text-sm font-normal leading-relaxed text-fg-secondary sm:max-w-none sm:text-base">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-fg transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5"
        >
          <LuArrowLeft size={16} aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  )
}
