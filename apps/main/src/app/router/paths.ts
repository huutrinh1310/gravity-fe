export const ROUTES = {
  home: '/',
  portfolios: {
    root: '/portfolios',
    me: '/portfolios/me',
  },
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
