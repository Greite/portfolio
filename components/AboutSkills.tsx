import Reveal from './Reveal';

interface SkillGroup {
  title: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  { title: 'Frontend', skills: ['Next.JS', 'React', 'TypeScript'] },
  { title: 'Backend', skills: ['Symfony', 'Laravel', 'Slim', 'WordPress'] },
  { title: 'Outils', skills: ['Docker'] },
];

export default function AboutSkills() {
  return (
    <section
      id="a-propos"
      aria-labelledby="about-heading"
      className="w-full scroll-mt-20 border-y border-border bg-surface-raised"
    >
      <Reveal className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 md:px-[120px] md:py-[100px]">
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="h-[3px] w-10 rounded-sm bg-accent" />
          <h2 id="about-heading" className="text-fg text-2xl font-semibold tracking-[var(--tracking-brand)]">
            À propos
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16 gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <p className="text-fg text-base font-normal leading-[1.7]">
              Actuellement <strong className="font-semibold text-accent">Lead Developer chez Koul</strong>, et {''}
              <strong className="font-semibold text-accent">développeur fullstack passionné</strong> avec plus de 7 ans
              d'expérience, je me spécialise dans la création d'applications web modernes avec React, Next.js et
              TypeScript.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <h3 className="text-accent text-xs font-semibold tracking-[var(--tracking-brand)]">COMPÉTENCES</h3>

            <div className="flex flex-col gap-5">
              {skillGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-3">
                  <span className="text-[13px] font-semibold text-fg">{group.title}</span>
                  <ul className="flex flex-wrap gap-2" aria-label={`Compétences ${group.title.toLowerCase()}`}>
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full bg-surface border border-border-accent px-4 py-2 text-sm font-medium text-fg transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-photo)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
