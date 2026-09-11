import { Link } from "react-router";
import { ROUTES } from "../app/router/paths";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="chrometxt text-7xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">Page not found.</p>
        <Link to={ROUTES.home} className="chromebtn mt-6 inline-flex rounded-lg px-4 py-2 font-mono text-xs">
          Back home
        </Link>
      </div>
    </div>
  );
}
