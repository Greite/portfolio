/** Élision : « d’Unraid btop », « de Speedtest Monitor ». */
const elide = (name: string) => (/^[aeiouyh]/i.test(name) ? `d’${name}` : `de ${name}`);

export const fr = {
  meta: {
    title: 'Gauthier Painteaux · Lead Développeur Web Fullstack',
    description:
      "Gauthier Painteaux, Lead Développeur Web Fullstack basé à Reims. Plus de 7 ans d'expérience sur des applications modernes en Next.js, React, TypeScript, Symfony et Docker.",
    keywords: [
      'Gauthier Painteaux',
      'Painteaux',
      'Développeur Web',
      'Lead Developer',
      'Next.js',
      'React',
      'TypeScript',
      'Symfony',
      'Reims',
    ],
    photoAlt: 'Photo de profil de Gauthier Painteaux',
  },
  person: {
    jobTitle: 'Lead Développeur Web Fullstack',
    description: 'Développeur Web Fullstack basé à Reims, France',
  },
  notFound: {
    metaTitle: 'Page introuvable · Gauthier Painteaux',
    title: 'Page introuvable',
    body: "La page que vous recherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
  nav: {
    main: 'Navigation principale',
    home: 'Accueil — Gauthier Painteaux',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menu: 'Menu de navigation',
    contact: 'Me contacter',
    /** Libellés des sections de l'accueil ; leurs ancres traduites sont dans `sectionIds` (lib/locales.ts). */
    sections: { about: 'À propos', experience: 'Expérience', projects: 'Projets', education: 'Formations' },
    /** Lien vers l'autre langue : code affiché, et nom complet écrit dans cette langue. */
    otherLang: { code: 'EN', name: 'English' },
  },
  common: {
    skip: 'Aller au contenu principal',
    backToTop: 'Retour en haut de la page',
    copy: 'Copier',
    copied: 'Copié !',
    copiedSubject: 'Copié :',
    copyEmail: "Copier l'adresse",
    emailCopied: 'Adresse email copiée',
    newTab: '(ouvre dans un nouvel onglet)',
    theme: { group: 'Choix du thème', light: 'Thème clair', system: 'Thème système', dark: 'Thème sombre' },
  },
  footer: {
    role: 'Lead Développeur chez Koul',
    nav: 'Navigation pied de page',
    rights: 'Tous droits réservés.',
  },
  hero: {
    role: 'Lead Développeur Web Fullstack',
    intro: 'Je conçois et développe des applications web modernes et performantes.',
    seeProjects: 'Voir mes projets',
    photoAlt: 'Photo de profil de Gauthier Painteaux, développeur fullstack',
  },
  about: {
    heading: 'À propos',
    /** Texte d'intro découpé autour des deux passages en gras. */
    intro: [
      'Actuellement ',
      'Lead Developer chez Koul',
      ', et ',
      'développeur fullstack passionné',
      " avec plus de 7 ans d'expérience, basé à Reims, je me spécialise dans la création d'applications web modernes avec React, Next.js et TypeScript.",
    ],
    skills: 'COMPÉTENCES',
    groups: { frontend: 'Frontend', backend: 'Backend', tools: 'Outils' },
    skillsOf: (group: string) => `Compétences ${group.toLowerCase()}`,
  },
  experience: {
    heading: 'Expérience',
    techAt: (company: string) => `Technologies utilisées chez ${company}`,
    duration: (years: number, months: number) =>
      [years > 0 && `${years} ${years > 1 ? 'ans' : 'an'}`, months > 0 && `${months} mois`]
        .filter(Boolean)
        .join(' et '),
    /** Par entreprise : période affichée et intitulés (le premier est le poste principal). */
    entries: {
      Koul: { date: 'Juin 2023 - Présent', roles: ['Lead Developer', 'Développeur Fullstack'] },
      'Globalis media system': { date: 'Nov 2018 - Mai 2023', roles: ['Développeur Fullstack'] },
      Appartoo: { date: 'Avr - Août 2018', roles: ['Stage développeur'] },
      'DTI Soft': { date: 'Mai - Juin 2016', roles: ['Stage développeur'] },
    },
  },
  projects: {
    heading: 'Projets',
    techOf: (name: string) => `Technologies de ${name}`,
    codeOn: (name: string) => ` — code de ${name} sur GitHub (ouvre dans un nouvel onglet)`,
    all: 'Tous mes projets',
  },
  formations: {
    heading: 'Formations',
    degrees: {
      'IUT Nancy Charlemagne': "L.P. Concepteur intégrateur en système internet et intranet pour l'entreprise",
      'Lycée Raymond Poincaré': 'BTS SNIR - Systèmes numériques opt. A : Informatique et réseaux',
      'IUT Metz': 'DUT Informatique',
    },
  },
  projectPage: {
    byline: 'Projet open source de Gauthier Painteaux',
    dateLocale: 'fr-FR',
    breadcrumb: "Fil d'Ariane",
    home: 'Accueil',
    viewOnGitHub: 'Voir sur GitHub',
    version: 'Version',
    stars: 'Étoiles',
    license: 'Licence',
    updated: 'Mis à jour le',
    keyFigures: 'Chiffres clés',
    howItWorks: (name: string) => `Comment fonctionne ${name}`,
    highlights: (name: string) => `Points forts ${elide(name)}`,
    gallery: 'En images',
    techChoices: (name: string) => `Choix techniques ${elide(name)}`,
    install: (name: string) => `Installer ${name}`,
    docs: (repo: string) => `Documentation complète de ${repo}`,
    otherProjects: 'Autres projets',
    previous: 'Projet précédent',
    next: 'Projet suivant',
  },
};

export type Dictionary = typeof fr;
