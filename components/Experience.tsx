import dayjs from 'dayjs'
import Link from 'next/link'

interface ExperienceEntry {
  company: string
  link?: string
  date: string
  roles: { label: string; secondary?: boolean }[]
  tags: string[]
}

const entries: ExperienceEntry[] = [
  {
    company: 'Koul',
    link: 'https://koul.io/',
    date: 'Juin 2023 - Présent',
    roles: [
      { label: 'Lead Developer' },
      { label: 'Développeur Fullstack', secondary: true },
    ],
    tags: ['Next.JS', 'Symfony', 'TypeScript', 'Docker'],
  },
  {
    company: 'Globalis media system',
    link: 'https://globalis-ms.com/',
    date: 'Nov 2018 - Mai 2023',
    roles: [{ label: 'Développeur Fullstack' }],
    tags: ['WordPress', 'React', 'TypeScript', 'Slim', 'Symfony', 'Laravel'],
  },
  {
    company: 'Appartoo',
    link: 'https://appartoo.com/',
    date: 'Avr - Août 2018',
    roles: [{ label: 'Stage développeur' }],
    tags: ['AngularJS', 'Symfony'],
  },
  {
    company: 'DTI Soft',
    date: 'Mai - Juin 2016',
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

export default function Experience() {
  const now = dayjs()
  const currentJobYear = Math.floor(now.diff('2023-06-01', 'years', true))
  const currentJobMonth = Math.floor(
    now.diff('2023-06-01', 'months', true) - currentJobYear * 12,
  )

  return (
    <section id="experience" className="w-full scroll-mt-16 bg-brand-50">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-[60px] md:px-[120px] md:py-[100px]">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div className="h-[3px] w-10 rounded-sm bg-brand-600" />
          <h2 className="text-2xl font-semibold tracking-[4px] text-brand-950">Expérience</h2>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {entries.map((entry, index) => {
            const isLast = index === entries.length - 1
            const durationSuffix = index === 0 ? formatDuration(currentJobYear, currentJobMonth) : ''

            return (
              <div key={entry.company} className="flex flex-row">
                {/* Dot Column */}
                <div className="flex w-10 shrink-0 flex-col items-center">
                  <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-brand-600" />
                  {!isLast && <div className="w-0.5 flex-1 bg-brand-600" />}
                </div>

                {/* Content Column */}
                <div className={`flex flex-1 flex-col gap-1.5 pl-4${!isLast ? ' pb-10' : ''}`}>
                  <span className="text-xs font-medium text-brand-600">
                    {entry.date}
                    {durationSuffix}
                  </span>

                  {entry.link ? (
                    <Link href={entry.link} target="_blank">
                      <span className="text-xl font-semibold text-brand-950">{entry.company}</span>
                    </Link>
                  ) : (
                    <span className="text-xl font-semibold text-brand-950">{entry.company}</span>
                  )}

                  {entry.roles.map((role) => (
                    <span
                      key={role.label}
                      className={
                        role.secondary
                          ? 'text-[13px] font-normal text-brand-text-secondary'
                          : 'text-[15px] font-medium text-brand-text-secondary'
                      }
                    >
                      {role.label}
                    </span>
                  ))}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-300 px-3 py-1 text-xs font-medium text-brand-950"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
