import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getStory, stories, type Story } from "@/lib/stories";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/story/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.story;
    const title = s ? `${s.title} — Flotjie's Collection` : "Story — Flotjie's Collection";
    const description = s?.synopsis ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(s ? [{ property: "og:image", content: s.cover }] : []),
        ...(s ? [{ name: "twitter:image", content: s.cover }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      Story not found. <Link to="/" className="ml-2 text-gold underline">Back home</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-destructive">{error.message}</p>
      <button onClick={reset} className="text-gold underline">Try again</button>
    </div>
  ),
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();
  const otherStories: Story[] = Object.values(stories).filter(
    (s: Story) => s.slug !== story.slug,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Cinematic hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden grain">
        <div className="absolute inset-0">
          <img
            src={story.cover}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-30 blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.78_0.16_65/0.15),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-12 md:gap-16 items-center">
          <div className="relative group animate-fade-up">
            <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_65/0.25),transparent_70%)] blur-2xl" />
            <img
              src={story.cover}
              alt={`${story.title} cover`}
              className="relative w-full max-w-sm mx-auto md:max-w-none rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="animate-fade-up">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold mb-6">
              <span className="h-px w-10 bg-gold/60" />
              {story.volume} · {story.genre}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-foreground">
              {story.title}
            </h1>
            <p className="mt-6 font-serif italic text-xl md:text-2xl text-foreground/85 leading-snug max-w-xl">
              {story.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-[11px] uppercase tracking-[0.25em] px-3 py-1.5 border border-border/60 rounded-sm text-muted-foreground">
                {story.genre}
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] px-3 py-1.5 border border-border/60 rounded-sm text-muted-foreground">
                {story.readTime}
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] px-3 py-1.5 border border-gold/40 rounded-sm text-gold bg-gold/5">
                Inspired by true events
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] px-3 py-1.5 border border-border/60 rounded-sm text-muted-foreground">
                {story.chapters.length} chapter{story.chapters.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/read/$slug/$chapter"
                params={{ slug: story.slug, chapter: "1" }}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-primary-foreground text-[12px] uppercase tracking-[0.28em] rounded-sm hover:bg-[var(--gold-soft)] transition-colors glow-amber"
              >
                Start Reading
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#chapters"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border/70 text-foreground text-[12px] uppercase tracking-[0.28em] rounded-sm hover:border-gold hover:text-gold transition-colors"
              >
                View Chapters
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis + themes */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-8 text-center">
          Synopsis
        </p>
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground/90 text-center">
          {story.longDescription}
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {story.themes.map((t: string) => (
            <span
              key={t}
              className="text-[11px] uppercase tracking-[0.3em] px-4 py-2 border border-border/60 rounded-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <figure className="mt-20 border-l-2 border-gold/50 pl-8">
          <blockquote className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/85">
            “{story.quote}”
          </blockquote>
          <figcaption className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            From {story.title}
          </figcaption>
        </figure>
      </section>

      {/* Chapters */}
      <section id="chapters" className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4">Table of Contents</p>
          <h2 className="font-serif text-3xl md:text-5xl">Chapters</h2>
        </div>
        <ol className="divide-y divide-border/40 border-y border-border/40">
          {story.chapters.map((c: { title: string; body: string }, i: number) => (
            <li key={i}>
              <Link
                to="/read/$slug/$chapter"
                params={{ slug: story.slug, chapter: String(i + 1) }}
                className="group flex items-center gap-6 py-5 hover:bg-card/40 transition-colors px-2"
              >
                <span className="font-serif text-gold text-lg w-10 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-lg md:text-xl text-foreground/90 group-hover:text-gold transition-colors">
                  {c.title}
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-gold transition-colors">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      {otherStories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 md:px-10 py-24">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4 text-center">
            Also in the Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">Continue the universe</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {otherStories.map((s: Story) => (
              <Link
                key={s.slug}
                to="/story/$slug"
                params={{ slug: s.slug }}
                className="group flex gap-5 p-5 border border-border/50 rounded-sm hover:border-gold/60 transition-colors bg-card/30"
              >
                <img
                  src={s.cover}
                  alt=""
                  className="w-24 md:w-28 aspect-[2/3] object-cover rounded-sm shadow-lg transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold mb-2">
                    {s.volume}
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-foreground group-hover:text-gold transition-colors">
                    {s.title}
                  </span>
                  <span className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {s.tagline}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="pb-20" />
    </div>
  );
}