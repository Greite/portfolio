import Container from '@components/Container'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosMail, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io'

export default function Home() {
  const now = dayjs()
  const currentJobYear = Math.floor(now.diff('2023-06-01', 'years', true))
  const currentJobMonth = Math.floor(now.diff('2023-06-01', 'months', true) - currentJobYear * 12)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Quelle est l'expérience actuelle de Gauthier Painteaux ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gauthier Painteaux est actuellement Lead Développeur chez Koul depuis juin 2023. Il a évolué du poste de Développeur Web Fullstack (juin 2023 - mai 2025) à Lead Développeur (depuis juin 2025). Il travaille principalement avec Next.JS, Symfony, TypeScript et Docker.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelles technologies maîtrise Gauthier Painteaux ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gauthier Painteaux maîtrise un large éventail de technologies fullstack : côté frontend avec React, Next.JS, TypeScript ; côté backend avec Symfony, Slim et WordPress ; ainsi que des outils DevOps comme Docker.',
        },
      },
      {
        '@type': 'Question',
        name: 'Dans quelles entreprises Gauthier Painteaux a-t-il travaillé ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gauthier Painteaux a travaillé chez Koul (2023-présent) en tant que Lead Développeur, Globalis media system (2018-2023) comme Développeur Fullstack, Appartoo (2018) en stage, et DTI Soft (2016) en stage de développement avec Talend.',
        },
      },
    ],
  }

  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://gauthierpainteaux.fr/#person',
    },
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />
      <div className="flex w-full min-h-[65vh] py-12 sm:py-24 px-6 justify-center bg-brand-300">
        <div className="flex w-full max-w-7xl gap-10 lg:gap-0 flex-col-reverse lg:flex-row content-center items-center justify-between">
          <div className="flex flex-col gap-12 items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-left uppercase tracking-[4px] sm:tracking-[8px]">
              <span className="block text-brand-950 leading-none">Gauthier</span>
              <span className="block text-brand-950 leading-none">Painteaux</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl text-left">
              <span className="block text-brand-950 leading-tight">Développeur Web</span>
              <span className="block text-brand-950 leading-tight">Fullstack</span>
            </h2>

            <div className="flex flex-col gap-4 items-start">
              <Link href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/" target="_blank">
                <div className="flex flex-row gap-2 items-center">
                  <IoLogoLinkedin size="28px" className="text-brand-600" />
                  <span>LinkedIn</span>
                </div>
              </Link>

              <Link href="https://github.com/Greite" target="_blank">
                <div className="flex flex-row gap-2 items-center">
                  <IoLogoGithub size="28px" className="text-brand-600" />
                  <span>Github</span>
                </div>
              </Link>

              <Link href="mailto:contact@gauthierpainteaux.fr">
                <div className="flex flex-row gap-2 items-center">
                  <IoIosMail size="28px" className="text-brand-600" />
                  <span>contact@gauthierpainteaux.fr</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Image
              className="rounded-full border-[10px] border-black bg-white size-[300px] sm:size-[400px] object-cover"
              src="/photo.webp"
              alt="Gauthier Painteaux"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      <Container withDivider>
        <h3 className="text-4xl text-left">Expériences</h3>

        <div className="flex flex-col gap-6 pt-8">
          <div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-start">
              <h4 className="text-xl leading-tight text-left">
                <Link href="https://koul.io/" target="_blank">
                  Koul
                </Link>
              </h4>
              <p className="text-left font-medium">
                Juin 2023 - Aujourd&apos;hui (
                {currentJobYear !== 0 ? `${currentJobYear} ${currentJobYear > 1 ? 'ans' : 'an'}` : undefined}
                {currentJobMonth !== 0 ? ` et ${currentJobMonth} mois` : undefined})
              </p>
            </div>
            <p className="text-left">
              Lead Développeur <span className="italic font-light">(Juin 2025 - Aujourd&apos;hui)</span> - CDI
            </p>
            <p className="text-left">
              Développeur Web Fullstack <span className="italic font-light">(Juin 2023 - Mai 2025)</span> - CDI
            </p>
            <p className="text-left italic font-light">Next.JS, Symfony, TypeScript, Docker</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-start">
              <h4 className="text-xl leading-tight text-left">
                <Link href="https://globalis-ms.com/" target="_blank">
                  Globalis media system
                </Link>
              </h4>
              <p className="text-left font-medium">Novembre 2018 - Mai 2023 (4 ans et 5 mois)</p>
            </div>
            <p className="text-left">Développeur Web Fullstack - CDI</p>
            <p className="text-left italic font-light">Wordpress, React, Typescript, Slim, Symfony</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-start">
              <h4 className="text-xl leading-tight text-left">
                <Link href="https://appartoo.com/" target="_blank">
                  Appartoo
                </Link>
              </h4>
              <p className="text-left font-medium">Avril 2018 - Août 2018 (5 mois)</p>
            </div>
            <p className="text-left">Développeur Web Fullstack - Stage</p>
            <p className="text-left italic font-light">AngularJS, Symfony</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-start">
              <h4 className="text-xl leading-tight text-left">DTI Soft</h4>
              <p className="text-left font-medium">Mai 2016 - Juin 2016 (2 mois)</p>
            </div>
            <p className="text-left">Développeur - Stage</p>
            <p className="text-left italic font-light">Talend</p>
          </div>
        </div>
      </Container>

      <Container withDivider>
        <h3 className="text-4xl text-left">Formations</h3>

        <div className="flex flex-col gap-6 pt-8">
          <div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-start">
              <h4 className="text-xl leading-tight text-left">IUT Nancy Charlemagne</h4>
              <p className="text-left font-medium">2017 - 2018</p>
            </div>
            <p className="text-left">
              L.P. Concepteur intégrateur en système internet et intranet pour l&apos;entreprise
            </p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-start">
              <h4 className="text-xl leading-tight text-left">Lycée Raymond Poincaré</h4>
              <p className="text-left font-medium">2015 - 2017</p>
            </div>
            <p className="text-left">BTS SNIR - Systèmes numériques opt. A : Informatique et réseaux</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-start">
              <h4 className="text-xl leading-tight text-left">IUT Metz</h4>
              <p className="text-left font-medium">2014 - 2015</p>
            </div>
            <p className="text-left">DUT Informatique</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
