import { Link } from "@tanstack/react-router";

export function Nav({ transparent = true }: { transparent?: boolean }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
        transparent ? "bg-background/40" : "bg-background/80"
      } border-b border-border/40`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-wide text-foreground">
          Flotjie<span className="text-gold">’</span>s
          <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground align-middle">
            World
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/" className="hover:text-gold transition-colors">
            The World
          </Link>
          <Link
            to="/story/$slug"
            params={{ slug: "before-i-knew-my-name" }}
            className="hover:text-gold transition-colors"
          >
            Volume 01
          </Link>
          <Link
            to="/story/$slug"
            params={{ slug: "where-the-shadows-break" }}
            className="hover:text-gold transition-colors"
          >
            Volume 02
          </Link>
          <Link
            to="/authors/$slug"
            params={{ slug: "florence-k" }}
            className="hover:text-gold transition-colors"
          >
            The Author
          </Link>
        </nav>
        <Link
          to="/story/$slug"
          params={{ slug: "before-i-knew-my-name" }}
          className="text-[12px] uppercase tracking-[0.25em] text-foreground/90 border border-border/60 px-4 py-2 rounded-sm hover:border-gold hover:text-gold transition-colors"
        >
          Begin Reading
        </Link>
      </div>
    </header>
  );
}