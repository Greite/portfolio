import { getDictionary, getLang } from '@root/lib/i18n';
import { sectionIds } from '@root/lib/locales';

import Reveal from './Reveal';

const skillGroups = [
  { id: 'frontend', skills: ['Next.js', 'React', 'TypeScript'] },
  { id: 'backend', skills: ['Symfony', 'Laravel', 'Slim', 'WordPress'] },
  { id: 'tools', skills: ['Docker'] },
] as const;

export default async function AboutSkills() {
  const { about } = await getDictionary();
  const [before, role, middle, passion, after] = about.intro;

  return (
    <section
      id={sectionIds[await getLang()].about}
      aria-labelledby="about-heading"
      className="w-full scroll-mt-20 border-y border-border bg-surface-raised"
    >
      <Reveal className="mx-auto flex max-w-[90rem] flex-col gap-12 px-6 py-16 md:px-[7.5rem] md:py-[6.25rem]">
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
          <h2 id="about-heading" className="text-fg text-2xl font-semibold">
            {about.heading}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16 gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <p className="text-fg text-base font-normal leading-[1.7]">
              {before}
              <strong className="font-semibold text-accent">{role}</strong>
              {middle}
              <strong className="font-semibold text-accent">{passion}</strong>
              {after}
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <h3 className="text-accent text-xs font-semibold tracking-[var(--tracking-brand-wide)]">{about.skills}</h3>

            <div className="flex flex-col gap-5">
              {skillGroups.map((group) => {
                const title = about.groups[group.id];

                return (
                  <div key={group.id} className="flex flex-col gap-3">
                    <span className="text-[0.8125rem] font-semibold text-fg">{title}</span>
                    <ul className="flex flex-wrap gap-2" aria-label={about.skillsOf(title)}>
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full bg-surface border border-border-accent px-4 py-2 text-sm font-medium text-fg"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
