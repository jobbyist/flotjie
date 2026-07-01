import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAuthor, stories } from "@/lib/stories";
import { Nav } from "@/components/site/Nav";
import heroImg from "@/assets/hero-night.jpg";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.author;
    const title = a ? `${a.name} — Author, Flotjie's Collection` : "Author";
    return {
      meta: [
        { title },
        { name: "description", content: a?.short ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: a?.short ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      Author not found.
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-destructive">{error.message}</p>
      <button onClick={reset} className="text-gold underline">Try again</button>
    </div>
  ),
  component: AuthorPage,
});

function AuthorPage() {
  const { author } = Route.useLoaderData();
  const related = author.storySlugs.map((s) => stories[s]).filter(Boolean);

  const initials = author.name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden grain">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-25 animate-drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,oklch(0.78_0.16_65/0.18),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center animate-fade-up">
          <div className="relative inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full border border-gold/40 mb-8 bg-card/60 backdrop-blur">
            <span className="font-serif text-4xl md:text-5xl text-gold">{initials}</span>
            <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/5" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.45em] text-gold mb-6">{author.role}</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-foreground">
            {author.name}
          </h1>
          <p className="mt-8 font-serif italic text-xl md:text-2xl text-foreground/85 max-w-2xl mx-auto leading-snug">
            {author.short}
          </p>
        </div>
      </section>

      {/* Biography */}
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold text-center mb-6">
          Biography
        </p>
        <div className="space-y-6 font-serif text-lg md:text-xl leading-relaxed text-foreground/85">
          {author.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4">Craft</p>
          <h2 className="font-serif text-3xl md:text-5xl">The three pillars of the work</h2>
        </div>
        <div className="grid gap-px bg-border/40 border border-border/40 rounded-sm overflow-hidden md:grid-cols-3">
          {author.pillars.map((p) => (
            <div key={p.title} className="bg-background p-8 md:p-10">
              <div className="flex items-center gap-3 text-gold mb-5">
                <span className="h-px w-8 bg-gold/60" />
                <span className="text-[10px] uppercase tracking-[0.35em]">Principle</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related stories */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4">Selected Works</p>
          <h2 className="font-serif text-3xl md:text-5xl">Stories by {author.name}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {related.map((s) => (
            <Link
              key={s.slug}
              to="/story/$slug"
              params={{ slug: s.slug }}
              className="group flex gap-6 p-5 border border-border/50 rounded-sm hover:border-gold/60 transition-colors bg-card/30"
            >
              <img
                src={s.cover}
                alt=""
                className="w-28 md:w-32 aspect-[2/3] object-cover rounded-sm shadow-xl transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.35em] text-gold mb-2">
                  {s.volume} · {s.genre}
                </span>
                <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-gold transition-colors leading-tight">
                  {s.title}
                </span>
                <span className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {s.tagline}
                </span>
                <span className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-gold transition-colors">
                  Read the story →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="pb-24" />
    </div>
  );
}