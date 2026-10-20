import { getDictionary } from '@root/lib/i18n';

import Reveal from './Reveal';

const formations = [
  { school: 'IUT Nancy Charlemagne', startDate: '2017', endDate: '2018' },
  { school: 'Lycée Raymond Poincaré', startDate: '2015', endDate: '2017' },
  { school: 'IUT Metz', startDate: '2014', endDate: '2015' },
] as const;

export default async function Formations() {
  const { formations: labels } = await getDictionary();

  return (
    <section id="formations" aria-labelledby="formations-heading" className="w-full scroll-mt-20 bg-surface">
      <Reveal className="mx-auto flex max-w-[90rem] flex-col gap-12 px-6 py-16 md:px-[7.5rem] md:py-[6.25rem]">
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="w-10 h-[3px] bg-accent rounded-sm" />
          <h2 id="formations-heading" className="text-fg text-2xl font-semibold">
            {labels.heading}
          </h2>
        </div>

        <ol className="flex flex-col">
          {formations.map((formation, index) => {
            const isLast = index === formations.length - 1;

            return (
              <li
                key={formation.school}
                className="stagger-item flex flex-row"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div aria-hidden="true" className="flex w-10 flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-accent shrink-0" />
                  {!isLast && <div className="w-0.5 flex-1 bg-accent" />}
                </div>

                <div className={`flex flex-1 flex-col gap-1.5 pl-4${isLast ? '' : ' pb-10'}`}>
                  <time dateTime={formation.startDate} className="text-accent text-xs font-semibold">
                    {formation.startDate} - {formation.endDate}
                  </time>
                  <span className="text-fg text-xl font-semibold">{formation.school}</span>
                  <span className="text-fg-secondary text-base font-normal leading-[1.4]">
                    {labels.degrees[formation.school]}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
