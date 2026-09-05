import { Link } from "react-router";
import { PROJECTS, type Project } from "../data/projects";
import { ROUTES } from "../router/paths";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={ROUTES.projectDetail(project.slug)}
      className="chrome animate-rise block overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1"
    >
      <img
        src={project.img}
        alt={project.alt}
        loading="lazy"
        width={1024}
        height={640}
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{project.title}</h3>
          <span className="font-mono text-[10px] text-primary">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{project.desc}</p>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground">{project.tags}</p>
      </div>
    </Link>
  );
}

export function OtherProjects({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PROJECTS.filter((project) => project.slug !== currentSlug).map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
