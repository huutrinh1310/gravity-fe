export const ROUTES = {
  home: '/',
  auth: {
    login: '/login',
    register: '/register',
    oauthCallback: '/oauth/callback',
  },
  portfolios: {
    root: '/portfolios',
    me: '/portfolios/me',
    detail: '/portfolios/:id',
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
