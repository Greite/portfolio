import Link from 'next/link'

interface ExperienceEntry {
  company: string
  link?: string
  date: string
  startDate: string
  endDate?: string
  roles: { label: string; secondary?: boolean }[]
  tags: string[]
}

const entries: ExperienceEntry[] = [
  {
    company: 'Koul',
    link: 'https://koul.io/',
    date: 'Juin 2023 - Présent',
    startDate: '2023-06',
    roles: [{ label: 'Lead Developer' }, { label: 'Développeur Fullstack', secondary: true }],
    tags: ['Next.JS', 'Symfony', 'TypeScript', 'Docker'],
  },
  {
    company: 'Globalis media system',
    link: 'https://globalis-ms.com/',
    date: 'Nov 2018 - Mai 2023',
    startDate: '2018-11',
    endDate: '2023-05',
    roles: [{ label: 'Développeur Fullstack' }],
    tags: ['WordPress', 'React', 'TypeScript', 'Slim', 'Symfony', 'Laravel'],
  },
  {
    company: 'Appartoo',
    link: 'https://appartoo.com/',
    date: 'Avr - Août 2018',
    startDate: '2018-04',
    endDate: '2018-08',
    roles: [{ label: 'Stage développeur' }],
    tags: ['AngularJS', 'Symfony'],
  },
  {
    company: 'DTI Soft',
    date: 'Mai - Juin 2016',
    startDate: '2016-05',
    endDate: '2016-06',
    roles: [{ label: 'Stage développeur' }],
    tags: ['Talend'],
  },
]

function formatDuration(years: number, months: number): string {
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years > 1 ? 'ans' : 'an'}`)
  if (months > 0) parts.push(`${months} mois`)
  return parts.length > 0 ? ` (${parts.join(' et ')})` : ''
}

function diffYearsMonths(startISO: string): { years: number; months: number } {
  const start = new Date(startISO)
  const now = new Date()
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  if (now.getDate() < start.getDate()) months -= 1
  if (months < 0) months = 0
  return { years: Math.floor(months / 12), months: months % 12 }
}

export default function Experience() {
  const { years: currentJobYear, months: currentJobMonth } = diffYearsMonths('2023-06-01')

  return (
    <section id="experience" aria-labelledby="experience-heading" className="w-full scroll-mt-20 bg-surface">
      <div className="reveal mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 md:px-[120px] md:py-[100px]">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
          <h2 id="experience-heading" className="text-2xl font-semibold tracking-[var(--tracking-brand)] text-fg">
            Expérience
          </h2>
        </div>

        {/* Timeline */}
        <ol className="flex flex-col">
          {entries.map((entry, index) => {
            const isLast = index === entries.length - 1
            const durationSuffix = index === 0 ? formatDuration(currentJobYear, currentJobMonth) : ''

            return (
              <li key={entry.company} className="flex flex-row">
                {/* Dot Column */}
                <div aria-hidden="true" className="flex w-10 shrink-0 flex-col items-center">
                  <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-accent" />
                  {!isLast && <div className="w-0.5 flex-1 bg-accent" />}
                </div>

                {/* Content Column */}
                <div className={`flex flex-1 flex-col gap-1.5 pl-4${!isLast ? ' pb-10' : ''}`}>
                  <time dateTime={entry.startDate} className="text-xs font-semibold text-accent">
                    {entry.date}
                    {durationSuffix}
                  </time>

                  {entry.link ? (
                    <Link
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md text-xl font-semibold text-fg transition-opacity hover:opacity-80"
                    >
                      {entry.company}
                      <span className="sr-only"> (ouvre dans un nouvel onglet)</span>
                    </Link>
                  ) : (
                    <span className="text-xl font-semibold text-fg">{entry.company}</span>
                  )}

                  {entry.roles.map((role) => (
                    <span
                      key={role.label}
                      className={
                        role.secondary
                          ? 'text-[13px] font-normal text-fg-secondary'
                          : 'text-[15px] font-medium text-fg-secondary'
                      }
                    >
                      {role.label}
                    </span>
                  ))}

                  <ul className="flex flex-wrap gap-2 pt-2" aria-label={`Technologies utilisées chez ${entry.company}`}>
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-soft-fg"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
