export const ROUTES = {
  home: "/",
  projectDetailPattern: "/projects/:slug",
  projectDetail: (slug: string) => `/projects/${encodeURIComponent(slug)}`,
  sections: {
    top: "#top",
    work: "#work",
    stack: "#stack",
    log: "#log",
    contact: "#contact",
  },
} as const;
