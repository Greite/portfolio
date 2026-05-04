const skills = ['Next.JS', 'React', 'TypeScript', 'Symfony', 'Docker', 'WordPress', 'Slim', 'Laravel']

export default function AboutSkills() {
  return (
    <section
      id="a-propos"
      aria-labelledby="about-heading"
      className="w-full scroll-mt-20 border-y-4 border-brand-700 bg-white"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 md:px-[120px] md:py-[100px]">
        <div className="flex flex-col gap-3">
          <h2 id="about-heading" className="text-brand-950 text-2xl font-bold tracking-[var(--tracking-brand)]">
            À PROPOS
          </h2>
          <div aria-hidden="true" className="w-[60px] h-[3px] bg-brand-700 rounded-sm" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <p className="text-brand-text-primary text-base font-normal leading-[1.6]">
              Actuellement Lead Developer chez Koul, et développeur fullstack passionné avec plus de 7 ans
              d&apos;expérience, je me spécialise dans la création d&apos;applications web modernes avec React, Next.js
              et TypeScript.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-brand-700 text-xs font-semibold tracking-[var(--tracking-brand)]">COMPÉTENCES</h3>

            <ul className="grid grid-cols-2 gap-3" aria-label="Liste des compétences techniques">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-xl bg-brand-50 border-[1.5px] border-brand-700 min-h-12 flex items-center justify-center px-4"
                >
                  <span className="text-brand-950 text-sm font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
