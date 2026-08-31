import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getStory, paragraphsFromBody } from "@/lib/stories";
import { Nav } from "@/components/site/Nav";
import { ComingSoonModal } from "@/components/site/ComingSoonModal";

type CtaKind = "purchase" | "preview" | "audio";

const ctaCopy: Record<CtaKind, { eyebrow: string; title: string; body: string; source: string }> = {
  purchase: {
    eyebrow: "Coming Soon",
    title: "Purchasing opens shortly",
    body: "Full volumes will be available to buy very soon. Leave your email and we’ll tell you the moment the doors open.",
    source: "purchase-volume",
  },
  preview: {
    eyebrow: "Coming Soon",
    title: "Extended previews are on their way",
    body: "Free extended previews are being prepared. Join the list and we’ll send yours first.",
    source: "extended-preview",
  },
  audio: {
    eyebrow: "Audio Narration",
    title: "Audio narration is coming soon — join the waitlist",
    body: "We’re recording narrated editions of the collection. Leave your email and we’ll tell you the moment you can listen.",
    source: "audio-waitlist",
  },
};


export const Route = createFileRoute("/read/$slug/$chapter")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    const idx = parseInt(params.chapter, 10) - 1;
    if (!Number.isInteger(idx) || idx < 0 || idx >= story.chapters.length) throw notFound();
    return { story, idx };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.story;
    const c = s?.chapters[loaderData!.idx];
    const title = s && c ? `${c.title} — ${s.title}` : "Reader — Flotjie's Collection";
    return {
      meta: [
        { title },
        { name: "description", content: s?.synopsis ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: s?.synopsis ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      Chapter not found.{" "}
      <Link to="/" className="ml-2 text-gold underline">Back home</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-destructive">{error.message}</p>
      <button onClick={reset} className="text-gold underline">Try again</button>
    </div>
  ),
  component: ReaderPage,
});

function ReaderPage() {
  const { story, idx } = Route.useLoaderData();
  const router = useRouter();
  const chapter = story.chapters[idx];
  const paragraphs = useMemo(() => paragraphsFromBody(chapter.body), [chapter.body]);
  const isFirst = idx === 0;
  const isLast = idx === story.chapters.length - 1;

  const [progress, setProgress] = useState(0);
  const [fontScale, setFontScale] = useState<number>(1);
  const [enter, setEnter] = useState(false);
  const [cta, setCta] = useState<CtaKind | null>(null);
  const active = cta ? ctaCopy[cta] : null;


  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, h.scrollTop / total)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [idx]);

  // Persist + restore progress + font scale
  useEffect(() => {
    try {
      const key = `read:${story.slug}`;
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      if (typeof saved.fontScale === "number") setFontScale(saved.fontScale);
      localStorage.setItem(
        key,
        JSON.stringify({ ...saved, lastChapter: idx + 1, fontScale: saved.fontScale ?? 1 }),
      );
    } catch {}
  }, [story.slug, idx]);

  useEffect(() => {
    try {
      const key = `read:${story.slug}`;
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      localStorage.setItem(key, JSON.stringify({ ...saved, fontScale }));
    } catch {}
  }, [fontScale, story.slug]);

  // Smooth page transition on chapter change
  useEffect(() => {
    setEnter(false);
    const id = requestAnimationFrame(() => setEnter(true));
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => cancelAnimationFrame(id);
  }, [idx]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !isLast)
        router.navigate({ to: "/read/$slug/$chapter", params: { slug: story.slug, chapter: String(idx + 2) } });
      if (e.key === "ArrowLeft" && !isFirst)
        router.navigate({ to: "/read/$slug/$chapter", params: { slug: story.slug, chapter: String(idx) } });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, isFirst, isLast, router, story.slug]);

  return (
    <div className="min-h-screen bg-[oklch(0.14_0.02_260)] text-foreground">
      <Nav transparent={false} />

      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-[2px] bg-border/30">
        <div
          className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--amber-glow)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Reader toolbar */}
      <div className="fixed top-20 right-4 md:right-6 z-40 flex flex-col gap-2 bg-card/70 backdrop-blur border border-border/50 rounded-sm p-2">
        <button
          type="button"
          aria-label="Decrease text size"
          onClick={() => setFontScale((f) => Math.max(0.85, +(f - 0.1).toFixed(2)))}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-gold font-serif text-sm"
        >
          A−
        </button>
        <button
          type="button"
          aria-label="Reset text size"
          onClick={() => setFontScale(1)}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-gold font-serif text-xs"
        >
          A
        </button>
        <button
          type="button"
          aria-label="Increase text size"
          onClick={() => setFontScale((f) => Math.min(1.4, +(f + 0.1).toFixed(2)))}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-gold font-serif text-lg"
        >
          A+
        </button>
      </div>

      <article
        className={`mx-auto max-w-2xl px-6 md:px-8 pt-32 md:pt-40 pb-24 transition-all duration-700 ${
          enter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="text-center mb-14">
          <Link
            to="/story/$slug"
            params={{ slug: story.slug }}
            className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground hover:text-gold transition-colors"
          >
            ← {story.title}
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-gold">
            Chapter {idx + 1} of {story.chapters.length}
          </p>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl leading-tight text-foreground">
            {chapter.title.replace(/^Chapter\s+\S+\s*[-–—]*\s*/i, "") || chapter.title}
          </h1>
          <div className="mt-8 flex items-center justify-center gap-3 text-gold/70">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--gold)]/60" />
            <span className="text-xs">✦</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--gold)]/60" />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setCta("audio")}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] px-5 py-3 border border-border/70 rounded-sm text-foreground hover:border-gold hover:text-gold transition-colors"
            >
              ♪ Listen to this Volume
            </button>
            <button
              type="button"
              onClick={() => setCta("purchase")}
              className="text-[11px] uppercase tracking-[0.28em] px-5 py-3 bg-gold text-primary-foreground rounded-sm hover:bg-[var(--gold-soft)] transition-colors"
            >
              Purchase Full Version — $4.99
            </button>
            <button
              type="button"
              onClick={() => setCta("preview")}
              className="text-[11px] uppercase tracking-[0.28em] px-5 py-3 border border-gold/40 rounded-sm text-gold bg-gold/5 hover:bg-gold/10 transition-colors"
            >
              Sign Up Free for Extended Preview
            </button>
          </div>
        </div>


        <div
          className="prose-reader font-serif leading-[1.85] text-foreground/90"
          style={{ fontSize: `${fontScale * 1.15}rem` }}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`mb-6 ${
                i === 0 ? "first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:pr-2 first-letter:float-left first-letter:text-gold" : ""
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-gold/60">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--gold)]/50" />
          <span>✦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--gold)]/50" />
        </div>

        {/* Chapter nav */}
        <nav className="mt-16 grid grid-cols-2 gap-4">
          {!isFirst ? (
            <Link
              to="/read/$slug/$chapter"
              params={{ slug: story.slug, chapter: String(idx) }}
              className="group flex flex-col gap-1 border border-border/50 rounded-sm p-5 hover:border-gold/50 transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                ← Previous
              </span>
              <span className="font-serif text-lg text-foreground group-hover:text-gold transition-colors line-clamp-1">
                {story.chapters[idx - 1].title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {!isLast ? (
            <Link
              to="/read/$slug/$chapter"
              params={{ slug: story.slug, chapter: String(idx + 2) }}
              className="group flex flex-col gap-1 border border-border/50 rounded-sm p-5 hover:border-gold/50 transition-colors text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Next →
              </span>
              <span className="font-serif text-lg text-foreground group-hover:text-gold transition-colors line-clamp-1">
                {story.chapters[idx + 1].title}
              </span>
            </Link>
          ) : (
            <Link
              to="/story/$slug"
              params={{ slug: story.slug }}
              className="group flex flex-col gap-1 border border-gold/50 rounded-sm p-5 hover:bg-gold/5 transition-colors text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold">
                The End
              </span>
              <span className="font-serif text-lg text-foreground group-hover:text-gold transition-colors">
                Return to the story
              </span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}