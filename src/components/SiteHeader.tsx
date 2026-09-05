import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { ROUTES } from "../router/paths";

const NAV = [
  { label: "work", href: ROUTES.sections.work },
  { label: "stack", href: ROUTES.sections.stack },
  { label: "log", href: ROUTES.sections.log },
  { label: "contact", href: ROUTES.sections.contact },
];

export function SiteHeader({ detail = false }: { detail?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {detail ? (
          <Link to={ROUTES.home} className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            back to portfolio
          </Link>
        ) : (
          <a href={ROUTES.sections.top} className="flex items-center gap-3">
            <div className="chromebtn grid size-8 place-items-center rounded-full font-mono text-xs font-medium">
              KV
            </div>
            <span className="font-mono text-xs tracking-tight text-muted-foreground">
              (a) KAI VERM — fullstack
            </span>
          </a>
        )}
        {!detail && (
          <nav className="hidden items-center gap-3 font-mono text-xs text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="pill rounded-full px-3 py-1 text-foreground transition-transform hover:-translate-y-0.5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
