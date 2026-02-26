const skills = ['Next.JS', 'React', 'TypeScript', 'Symfony', 'Docker', 'WordPress', 'Slim', 'Laravel']

export default function AboutSkills() {
  return (
    <section id="a-propos" className="w-full scroll-mt-16 border-y-4 border-brand-600 bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 md:px-[120px] md:py-[100px]">
        <div className="flex flex-col gap-3">
          <h3 className="text-brand-950 text-2xl font-bold tracking-[4px]">À PROPOS</h3>
          <div className="w-[60px] h-[3px] bg-brand-600 rounded-sm" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <p className="text-brand-950 text-[15px] font-normal leading-[1.6]">
              Actuellement Lead Developer chez Koul, et développeur fullstack passionné avec plus de 7 ans d&apos;expérience, je me spécialise dans la
              création d&apos;applications web modernes avec React, Next.js et TypeScript.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <span className="text-brand-600 text-[11px] font-semibold tracking-[4px]">COMPÉTENCES</span>

            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl bg-brand-50 border-[1.5px] border-brand-600 h-12 flex items-center justify-center px-4"
                >
                  <span className="text-brand-950 text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
