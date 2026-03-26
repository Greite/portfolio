const formations = [
  {
    school: 'IUT Nancy Charlemagne',
    date: '2017 - 2018',
    degree: "L.P. Concepteur intégrateur en système internet et intranet pour l'entreprise",
  },
  {
    school: 'Lycée Raymond Poincaré',
    date: '2015 - 2017',
    degree: 'BTS SNIR - Systèmes numériques opt. A : Informatique et réseaux',
  },
  {
    school: 'IUT Metz',
    date: '2014 - 2015',
    degree: 'DUT Informatique',
  },
]

export default function Formations() {
  return (
    <section id="formations" className="w-full scroll-mt-16 border-y-4 border-brand-600 bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-[60px] md:px-[120px] md:py-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-[3px] bg-brand-600 rounded-sm" />
          <h3 className="text-brand-950 text-2xl font-semibold tracking-[4px]">Formations</h3>
        </div>

        <div className="flex flex-col">
          {formations.map((formation, index) => {
            const isLast = index === formations.length - 1

            return (
              <div key={formation.school} className="flex flex-row">
                <div className="flex w-10 flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-600 shrink-0" />
                  {!isLast && <div className="w-0.5 flex-1 bg-brand-600" />}
                </div>

                <div className={`flex flex-1 flex-col gap-1.5 pl-4${isLast ? '' : ' pb-10'}`}>
                  <span className="text-brand-600 text-xs font-semibold">{formation.date}</span>
                  <span className="text-brand-950 text-xl font-semibold">{formation.school}</span>
                  <span className="text-brand-950 text-[15px] font-normal opacity-70 leading-[1.4]">
                    {formation.degree}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
