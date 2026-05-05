interface Formation {
  school: string
  date: string
  startDate: string
  endDate: string
  degree: string
}

const formations: Formation[] = [
  {
    school: 'IUT Nancy Charlemagne',
    date: '2017 - 2018',
    startDate: '2017',
    endDate: '2018',
    degree: "L.P. Concepteur intégrateur en système internet et intranet pour l'entreprise",
  },
  {
    school: 'Lycée Raymond Poincaré',
    date: '2015 - 2017',
    startDate: '2015',
    endDate: '2017',
    degree: 'BTS SNIR - Systèmes numériques opt. A : Informatique et réseaux',
  },
  {
    school: 'IUT Metz',
    date: '2014 - 2015',
    startDate: '2014',
    endDate: '2015',
    degree: 'DUT Informatique',
  },
]

export default function Formations() {
  return (
    <section id="formations" aria-labelledby="formations-heading" className="w-full scroll-mt-20 bg-surface">
      <div className="reveal mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 md:px-[120px] md:py-[100px]">
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="w-10 h-[3px] bg-accent rounded-sm" />
          <h2 id="formations-heading" className="text-fg text-2xl font-semibold tracking-[var(--tracking-brand)]">
            Formations
          </h2>
        </div>

        <ol className="flex flex-col">
          {formations.map((formation, index) => {
            const isLast = index === formations.length - 1

            return (
              <li key={formation.school} className="flex flex-row">
                <div aria-hidden="true" className="flex w-10 flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-accent shrink-0" />
                  {!isLast && <div className="w-0.5 flex-1 bg-accent" />}
                </div>

                <div className={`flex flex-1 flex-col gap-1.5 pl-4${isLast ? '' : ' pb-10'}`}>
                  <time dateTime={formation.startDate} className="text-accent text-xs font-semibold">
                    {formation.date}
                  </time>
                  <span className="text-fg text-xl font-semibold">{formation.school}</span>
                  <span className="text-fg-secondary text-base font-normal leading-[1.4]">{formation.degree}</span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
