export const ROUTES = {
  home: '/',
  projectDetail: (slug: string) => `/projects/${encodeURIComponent(slug)}`,
  projectDetailPattern: '/projects/:slug',
  sections: {
    contact: '#contact',
    log: '#log',
    stack: '#stack',
    top: '#top',
    work: '#work',
  },
} as const;
