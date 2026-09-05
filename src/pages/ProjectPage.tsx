import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { PlayerDock } from "../components/MusicPlayer";
import { OtherProjects } from "../components/ProjectCard";
import { SiteHeader } from "../components/SiteHeader";
import { getProject } from "../data/projects";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { ROUTES } from "../router/paths";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  const player = useMusicPlayer();
  if (!project) return <ProjectMissing />;

  return (
    <div className="min-h-screen bg-background font-grotesk text-foreground">
      <SiteHeader detail />
      <main className="mx-auto max-w-5xl px-6 pb-24">
        <section className="animate-rise pt-12">
          <p className="font-mono text-xs text-muted-foreground">(case study) {project.timeline}</p>
          <h1 className="chrometxt mt-3 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-4 max-w-[56ch] text-pretty text-muted-foreground">{project.overview}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="pill rounded-full px-3 py-1 text-sm">
                {item}
              </span>
            ))}
          </div>
        </section>
        <img
          src={project.img}
          alt={project.alt}
          width={1024}
          height={640}
          className="chrome animate-rise mt-8 aspect-[16/9] w-full rounded-2xl object-cover p-1"
        />
        <section className="animate-rise mt-8 grid gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="chrome rounded-xl p-4">
              <p className="chrometxt text-3xl tracking-tight">{metric.value}</p>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </section>
        <section className="mt-12 grid gap-10 border-t border-foreground/10 pt-10 md:grid-cols-2">
          <div className="animate-rise">
            <span className="font-mono text-xs text-muted-foreground">(a) role</span>
            <h2 className="mt-1 mb-3 text-2xl tracking-tight">What I did</h2>
            <p className="text-sm text-muted-foreground">{project.role}</p>
            <p className="mt-2 font-mono text-xs text-primary">{project.tags}</p>
          </div>
          <div className="animate-rise [animation-delay:100ms]">
            <span className="font-mono text-xs text-muted-foreground">(b) highlights</span>
            <h2 className="mt-1 mb-3 text-2xl tracking-tight">Engineering notes</h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="pt-0.5 font-mono text-xs text-primary">—</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mt-12 border-t border-foreground/10 pt-10">
          <h2 className="mb-5 text-2xl tracking-tight">Other work</h2>
          <OtherProjects currentSlug={project.slug} />
        </section>
      </main>
      <PlayerDock player={player} />
    </div>
  );
}

function ProjectMissing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="chrometxt text-7xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">Project not found.</p>
        <Link
          to={ROUTES.home}
          className="chromebtn mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back home
        </Link>
      </div>
    </div>
  );
}
