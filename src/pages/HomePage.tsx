import { NowPlayingCard, PlayerDock } from "../components/MusicPlayer";
import { ProjectCard } from "../components/ProjectCard";
import { SiteHeader } from "../components/SiteHeader";
import { PROJECTS } from "../data/projects";
import { useMusicPlayer } from "../hooks/useMusicPlayer";

const STACK = ["TypeScript", "Go", "Rust", "React", "Node", "Postgres", "K8s", "GraphQL"];
const LOG = [
  {
    years: "2022—",
    role: "Staff Engineer · Northgrid",
    note: "Leading platform & realtime infra.",
  },
  { years: "2019—22", role: "Fullstack · Lumen Labs", note: "Shipped 0→1 products end to end." },
  { years: "2016—19", role: "Dev · Freelance", note: "Web apps for early-stage teams." },
];

export function HomePage() {
  const player = useMusicPlayer();

  return (
    <div className="min-h-screen bg-background font-grotesk text-foreground">
      <SiteHeader />
      <main id="top" className="mx-auto max-w-6xl px-6 pb-28">
        <section className="grid items-end gap-8 pt-14 pb-10 md:grid-cols-12">
          <div className="animate-rise md:col-span-8">
            <p className="mb-4 font-mono text-xs text-muted-foreground">— welcome to the machine</p>
            <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.92] tracking-tight text-balance">
              <span className="block">I build</span>
              <span className="chrometxt block">full-stack</span>
              <span className="block">systems.</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-muted-foreground">
              Fullstack developer crafting resilient products across the stack — from the database
              to the pixel, with an equalizer always loaded.
            </p>
          </div>
          <div className="animate-rise [animation-delay:120ms] md:col-span-4">
            <NowPlayingCard player={player} />
          </div>
        </section>
        <section id="work" className="scroll-mt-20 border-t border-foreground/10 py-14">
          <div className="animate-rise mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl tracking-tight">Selected work</h2>
            <span className="font-mono text-xs text-muted-foreground">(b) 03 projects</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
        <section className="grid gap-10 border-t border-foreground/10 py-14 md:grid-cols-2">
          <div id="stack" className="animate-rise scroll-mt-20">
            <span className="font-mono text-xs text-muted-foreground">(c) stack</span>
            <h2 className="mt-1 mb-5 text-2xl tracking-tight">Tech</h2>
            <div className="flex flex-wrap gap-2">
              {STACK.map((item) => (
                <span key={item} className="pill rounded-full px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div id="log" className="animate-rise scroll-mt-20 [animation-delay:100ms]">
            <span className="font-mono text-xs text-muted-foreground">(d) log</span>
            <h2 className="mt-1 mb-5 text-2xl tracking-tight">Experience</h2>
            <ul className="space-y-4">
              {LOG.map((entry) => (
                <li key={entry.years} className="flex gap-4">
                  <span className="pt-0.5 font-mono text-xs text-primary">{entry.years}</span>
                  <div>
                    <p className="text-sm font-medium">{entry.role}</p>
                    <p className="text-sm text-muted-foreground">{entry.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer id="contact" className="scroll-mt-20 border-t border-foreground/10 pb-28">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 py-10 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs text-muted-foreground">(e) contact</span>
            <a
              href="mailto:hello@kai.studio"
              className="chrometxt mt-2 inline-block text-3xl tracking-tight md:text-5xl"
            >
              hello@kai.studio
            </a>
          </div>
          <p className="font-mono text-xs text-muted-foreground">© 2025 kai verm — built by hand</p>
        </div>
      </footer>
      <PlayerDock player={player} />
    </div>
  );
}
