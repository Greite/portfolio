'use client'

import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'

export default function ErrorPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-brand-50 px-8">
      <div className="flex flex-col items-center gap-5">
        <span className="text-[80px] font-bold tracking-[6px] text-brand-600 sm:text-[120px]">500</span>
        <div className="h-[3px] w-10 rounded-sm bg-brand-600 sm:w-[60px]" />
        <h1 className="text-2xl font-bold text-brand-950 sm:text-[32px]">Erreur serveur</h1>
        <p className="max-w-[300px] text-center text-sm font-normal leading-relaxed text-brand-950 opacity-70 sm:max-w-none sm:text-[15px]">
          Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.
        </p>
        <Link
          href="/"
          className="mt-2 flex items-center gap-2 rounded-full bg-brand-950 px-6 py-3 text-sm font-semibold text-brand-50 transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5"
        >
          <LuArrowLeft size={16} aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
