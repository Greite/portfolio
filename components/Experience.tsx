import type { Dictionary } from '@root/dictionaries/fr';
import { getDictionary } from '@root/lib/i18n';
import Link from 'next/link';

import Reveal from './Reveal';

interface ExperienceEntry {
  company: keyof Dictionary['experience']['entries'];
  link?: string;
  startDate: string;
  tags: string[];
}

const entries: ExperienceEntry[] = [
  {
    company: 'Koul',
    link: 'https://koul.io/',
    startDate: '2023-06',
    tags: ['Next.JS', 'Symfony', 'TypeScript', 'Docker'],
  },
  {
    company: 'Globalis media system',
    link: 'https://globalis-ms.com/',
    startDate: '2018-11',
    tags: ['WordPress', 'React', 'TypeScript', 'Slim', 'Symfony', 'Laravel'],
  },
  { company: 'Appartoo', link: 'https://appartoo.com/', startDate: '2018-04', tags: ['AngularJS', 'Symfony'] },
  { company: 'DTI Soft', startDate: '2016-05', tags: ['Talend'] },
];

function diffYearsMonths(startISO: string): { years: number; months: number } {
  const start = new Date(startISO);
  const now = new Date();

  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

  if (now.getDate() < start.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    months = 0;
  }

  return { years: Math.floor(months / 12), months: months % 12 };
}

export default async function Experience() {
  const { experience, common } = await getDictionary();
  const { years: currentJobYear, months: currentJobMonth } = diffYearsMonths('2023-06-01');
  const currentJobDuration = experience.duration(currentJobYear, currentJobMonth);

  return (
    <section id="experience" aria-labelledby="experience-heading" className="w-full scroll-mt-20 bg-surface">
      <Reveal className="mx-auto flex max-w-[90rem] flex-col gap-12 px-6 py-16 md:px-[7.5rem] md:py-[6.25rem]">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
          <h2 id="experience-heading" className="text-2xl font-semibold text-fg">
            {experience.heading}
          </h2>
        </div>

        {/* Timeline */}
        <ol className="flex flex-col">
          {entries.map((entry, index) => {
            const isLast = index === entries.length - 1;
            const { date, roles } = experience.entries[entry.company];

            return (
              <li
                key={entry.company}
                className="stagger-item flex flex-row"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Dot Column */}
                <div aria-hidden="true" className="flex w-10 shrink-0 flex-col items-center">
                  <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-accent" />
                  {!isLast && <div className="w-0.5 flex-1 bg-accent" />}
                </div>

                {/* Content Column */}
                <div className={`flex flex-1 flex-col gap-1.5 pl-4${!isLast ? ' pb-10' : ''}`}>
                  <time dateTime={entry.startDate} className="text-xs font-semibold text-accent">
                    {date}
                    {index === 0 && currentJobDuration && ` (${currentJobDuration})`}
                  </time>

                  {entry.link ? (
                    <Link
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md text-xl font-semibold text-fg transition-[color,scale] duration-150 ease-out-strong hover:text-accent active:scale-[0.97]"
                    >
                      {entry.company}
                      <span className="sr-only"> {common.newTab}</span>
                    </Link>
                  ) : (
                    <span className="text-xl font-semibold text-fg">{entry.company}</span>
                  )}

                  {roles.map((role, roleIndex) => (
                    <span
                      key={role}
                      className={
                        roleIndex > 0
                          ? 'text-[0.8125rem] font-normal text-fg-secondary'
                          : 'text-[0.9375rem] font-medium text-fg-secondary'
                      }
                    >
                      {role}
                    </span>
                  ))}

                  <ul className="flex flex-wrap gap-2 pt-2" aria-label={experience.techAt(entry.company)}>
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
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
