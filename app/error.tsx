'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <div className="flex w-full h-screen flex-col sm:flex-row content-center items-center justify-evenly px-6 bg-[rgb(250,224,86)]">
        <div className="flex flex-col gap-12 items-center sm:items-start">
          <h1 className="text-6xl sm:text-7xl text-center sm:text-left uppercase">
            <span className="block text-brand-950">Une erreur est survenue</span>
          </h1>

          <h2 className="text-3xl text-center sm:text-left">
            <Link href="/">Retour à l&apos;acceuil</Link>
          </h2>
        </div>
      </div>
    </div>
  )
}
