import type { Dictionary } from './fr';

export const en: Dictionary = {
  meta: {
    title: 'Gauthier Painteaux · Lead Full-Stack Web Developer',
    description:
      'Gauthier Painteaux, Lead Full-Stack Web Developer in Reims, France. 7+ years building web apps with Next.js, React, TypeScript, Symfony and Docker.',
    keywords: [
      'Gauthier Painteaux',
      'Painteaux',
      'Web Developer',
      'Lead Developer',
      'Full-Stack Developer',
      'Next.js',
      'React',
      'TypeScript',
      'Symfony',
      'Reims',
    ],
    photoAlt: 'Profile photo of Gauthier Painteaux',
  },
  person: {
    jobTitle: 'Lead Full-Stack Web Developer',
    description: 'Full-stack web developer based in Reims, France',
  },
  notFound: {
    metaTitle: 'Page not found · Gauthier Painteaux',
    title: 'Page not found',
    body: 'The page you’re looking for doesn’t exist or has moved.',
    back: 'Back to home',
  },
  nav: {
    main: 'Main navigation',
    home: 'Home — Gauthier Painteaux',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Navigation menu',
    contact: 'Get in touch',
    sections: { about: 'About', experience: 'Experience', projects: 'Projects', education: 'Education' },
    otherLang: { code: 'FR', name: 'Français' },
  },
  common: {
    skip: 'Skip to main content',
    backToTop: 'Back to top',
    copy: 'Copy',
    copied: 'Copied!',
    copiedSubject: 'Copied:',
    copyEmail: 'Copy email address',
    emailCopied: 'Email address copied',
    newTab: '(opens in a new tab)',
    theme: { group: 'Theme', light: 'Light theme', system: 'System theme', dark: 'Dark theme' },
  },
  footer: {
    role: 'Lead Developer at Koul',
    nav: 'Footer navigation',
    rights: 'All rights reserved.',
  },
  hero: {
    role: 'Lead Full-Stack Web Developer',
    intro: 'I design and build modern, fast web applications.',
    seeProjects: 'See my projects',
    photoAlt: 'Profile photo of Gauthier Painteaux, full-stack developer',
  },
  about: {
    heading: 'About',
    intro: [
      'I’m currently ',
      'Lead Developer at Koul',
      ' and a ',
      'passionate full-stack developer',
      ' with 7+ years of experience, based in Reims, France, specializing in modern web applications built with React, Next.js and TypeScript.',
    ],
    skills: 'SKILLS',
    groups: { frontend: 'Frontend', backend: 'Backend', tools: 'Tools' },
    skillsOf: (group: string) => `${group} skills`,
  },
  experience: {
    heading: 'Experience',
    techAt: (company: string) => `Technologies used at ${company}`,
    duration: (years: number, months: number) =>
      [
        years > 0 && `${years} ${years > 1 ? 'years' : 'year'}`,
        months > 0 && `${months} ${months > 1 ? 'months' : 'month'}`,
      ]
        .filter(Boolean)
        .join(' and '),
    entries: {
      Koul: { date: 'Jun 2023 – Present', roles: ['Lead Developer', 'Full-Stack Developer'] },
      'Globalis media system': { date: 'Nov 2018 – May 2023', roles: ['Full-Stack Developer'] },
      Appartoo: { date: 'Apr – Aug 2018', roles: ['Developer Intern'] },
      'DTI Soft': { date: 'May – Jun 2016', roles: ['Developer Intern'] },
    },
  },
  projects: {
    heading: 'Projects',
    techOf: (name: string) => `${name} technologies`,
    codeOn: (name: string) => ` — ${name} source code on GitHub (opens in a new tab)`,
    all: 'All my projects',
  },
  formations: {
    heading: 'Education',
    degrees: {
      'IUT Nancy Charlemagne': 'Professional Bachelor’s Degree in Internet and Intranet Systems Design and Integration',
      'Lycée Raymond Poincaré': 'BTS SNIR, two-year higher technical diploma in digital systems (IT and networking)',
      'IUT Metz': 'DUT in Computer Science (two-year university technical degree)',
    },
  },
  projectPage: {
    byline: 'Open-source project by Gauthier Painteaux',
    dateLocale: 'en-US',
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    viewOnGitHub: 'View on GitHub',
    version: 'Version',
    stars: 'Stars',
    license: 'License',
    updated: 'Updated',
    keyFigures: 'Key figures',
    howItWorks: (name: string) => `How ${name} works`,
    highlights: (name: string) => `${name} highlights`,
    gallery: 'Screenshots',
    techChoices: (name: string) => `${name} tech stack`,
    install: (name: string) => `Install ${name}`,
    docs: (repo: string) => `Full documentation for ${repo}`,
    otherProjects: 'More projects',
    previous: 'Previous project',
    next: 'Next project',
  },
};
