import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-night.jpg";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { ComingSoonModal, Modal } from "@/components/site/ComingSoonModal";
import { storyList, type Story } from "@/lib/stories";

export const Route = createFileRoute("/")({
  component: Index,
});

const platforms = [
  "Amazon Kindle",
  "Apple Books",
  "Google Play Books",
  "Kobo",
  "Barnes & Noble",
  "Audible",
  "Spotify Audiobooks",
  "Everand",
];

const comingSoon = [
  { n: "06", mood: "from-[oklch(0.24_0.05_60)] to-[oklch(0.12_0.02_260)]" },
  { n: "07", mood: "from-[oklch(0.22_0.03_280)] to-[oklch(0.13_0.02_260)]" },
  { n: "08", mood: "from-[oklch(0.24_0.04_20)] to-[oklch(0.12_0.02_260)]" },
  { n: "09", mood: "from-[oklch(0.22_0.03_240)] to-[oklch(0.13_0.02_260)]" },
  { n: "10", mood: "from-[oklch(0.24_0.04_80)] to-[oklch(0.12_0.02_260)]" },
];

const footerCols: { title: string; links: string[] }[] = [
  { title: "The World", links: ["About", "The Stories", "The Author", "Coming Soon"] },
  { title: "Discover", links: ["Media", "Press Kit", "Contact", "Newsletter"] },
  { title: "Legal", links: ["Privacy Policy", "Terms", "Cookies", "Accessibility"] },
];

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-gold/70">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--gold)]/60" />
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gold">
        <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" fill="currentColor" opacity="0.85" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--gold)]/60" />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/40 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl tracking-wide text-foreground">
          Flotjie<span className="text-gold">’</span>s
          <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground align-middle">World</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.22em] text-muted-foreground">
          <a href="#collection" className="hover:text-gold transition-colors">The Stories</a>
          <a href="#coming-soon" className="hover:text-gold transition-colors">Coming Soon</a>
          <a href="#universe" className="hover:text-gold transition-colors">The World</a>
          <a href="#screen" className="hover:text-gold transition-colors">The Series</a>
        </nav>
        <a
          href="#collection"
          className="text-[12px] uppercase tracking-[0.25em] text-foreground/90 border border-border/60 px-4 py-2 rounded-sm hover:border-gold hover:text-gold transition-colors"
        >
          Begin Reading
        </a>
      </div>
    </header>
  );
}

function Hero({ onPurchaseCollection }: { onPurchaseCollection: () => void }) {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden grain">
      <img
        src={heroImg}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover animate-drift"
      />
      {/* atmospheric gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,oklch(0.78_0.16_65/0.18),transparent_45%)]" />

      {/* floating dust */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-[var(--gold-soft)]/40"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 53) % 100}%`,
              bottom: `-${(i * 7) % 40}px`,
              animation: `float-dust ${18 + (i % 8) * 2}s linear ${i * 0.7}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 pt-40 md:pt-56 pb-32 text-center">
        <p className="animate-fade-up text-[11px] md:text-xs uppercase tracking-[0.5em] text-gold/90 mb-8">
          by Flotjie — flotjie.world
        </p>
        <h1 className="animate-fade-up font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[1.02] text-foreground">
          Enter Flotjie’s <em className="text-gold not-italic font-serif italic">World</em>.
        </h1>
        <p className="animate-fade-up mt-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
          A true story told through five intertwined lives — one narrative universe of
          memoir, memory and reinvention, exploring identity, family, survival, loss,
          resilience and redemption.
        </p>
        <div className="animate-fade-up mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/story/$slug"
            params={{ slug: "before-i-knew-my-name" }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold text-primary-foreground text-[12px] uppercase tracking-[0.28em] rounded-sm hover:bg-[var(--gold-soft)] transition-colors glow-amber"
          >
            Enter the World
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/read/$slug/$chapter"
            params={{ slug: "before-i-knew-my-name", chapter: "1" }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-border/70 text-foreground text-[12px] uppercase tracking-[0.28em] rounded-sm hover:border-gold hover:text-gold transition-colors"
          >
            Begin Reading
          </Link>
          <button
            type="button"
            onClick={onPurchaseCollection}
            className="inline-flex items-center gap-3 px-8 py-4 border border-gold/50 text-gold bg-gold/5 text-[12px] uppercase tracking-[0.28em] rounded-sm hover:bg-gold/10 transition-colors"
          >
            Own the Complete World — $20
          </button>
        </div>


        <div className="animate-fade-up mt-24 flex justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground/60">
            <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <span className="h-12 w-px bg-gradient-to-b from-[var(--gold)]/60 to-transparent animate-soft-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

function VolumeCard({
  story,
  reverse = false,
  onComingSoon,
}: {
  story: Story;
  reverse?: boolean;
  onComingSoon: (kind: "purchase" | "preview") => void;
}) {
  const [details, setDetails] = useState(false);
  const { cover, title, genre, readTime: time, slug } = story;
  const eyebrow = `${story.volume} — ${genre}`;
  const description = story.synopsis;
  return (
    <article
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative group">
        <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_65/0.25),transparent_70%)] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative overflow-hidden rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
          <img
            src={cover}
            alt={title}
            loading="lazy"
            className="w-full h-auto transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-gold">
          <span className="h-px w-8 bg-gold/60" />
          {eyebrow}
        </div>
        <h3 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
          {title}
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className="text-[11px] uppercase tracking-[0.25em] px-3 py-1.5 border border-border/60 rounded-sm text-muted-foreground">
            {genre}
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] px-3 py-1.5 border border-border/60 rounded-sm text-muted-foreground">
            {time}
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] px-3 py-1.5 border border-gold/40 rounded-sm text-gold bg-gold/5">
            Inspired by true events
          </span>
        </div>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => setDetails(true)}
            className="text-[11px] uppercase tracking-[0.28em] px-5 py-3 border border-border/70 rounded-sm text-foreground hover:border-gold hover:text-gold transition-colors"
          >
            Book Details
          </button>
          <button
            type="button"
            onClick={() => onComingSoon("purchase")}
            className="text-[11px] uppercase tracking-[0.28em] px-5 py-3 bg-gold text-primary-foreground rounded-sm hover:bg-[var(--gold-soft)] transition-colors"
          >
            Purchase Full Version — $4.99
          </button>
          <button
            type="button"
            onClick={() => onComingSoon("preview")}
            className="text-[11px] uppercase tracking-[0.28em] px-5 py-3 border border-gold/40 rounded-sm text-gold bg-gold/5 hover:bg-gold/10 transition-colors"
          >
            Sign Up Free for Extended Preview
          </button>
        </div>

        <div className="pt-2 flex flex-wrap gap-6">
          <Link
            to="/story/$slug"
            params={{ slug }}
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.3em] text-foreground border-b border-gold/50 pb-2 hover:text-gold hover:border-gold transition-colors"
          >
            Read the Volume
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/read/$slug/$chapter"
            params={{ slug, chapter: "1" }}
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors"
          >
            Start Reading
          </Link>
        </div>
      </div>

      <Modal open={details} onClose={() => setDetails(false)} labelledBy={`details-${slug}`}>
        <div className="grid sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 p-8 md:p-10">
          <img
            src={cover}
            alt={`${title} cover`}
            loading="lazy"
            className="w-full rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-4">
              {story.volume}
            </p>
            <h2 id={`details-${slug}`} className="font-serif text-3xl md:text-4xl leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {genre} · {time}
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {story.longDescription}
            </p>
            <Link
              to="/read/$slug/$chapter"
              params={{ slug, chapter: "1" }}
              className="mt-8 inline-flex items-center gap-3 px-7 py-4 bg-gold text-primary-foreground text-[12px] uppercase tracking-[0.28em] rounded-sm hover:bg-[var(--gold-soft)] transition-colors"
            >
              Read Now
              <span>→</span>
            </Link>
          </div>
        </div>
      </Modal>
    </article>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-28 md:py-40 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {(eyebrow || title) && (
          <div className="text-center mb-16 md:mb-24">
            {eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.45em] text-gold mb-6">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-4xl md:text-6xl leading-tight text-foreground max-w-3xl mx-auto">
                {title}
              </h2>
            )}
            <div className="mt-8"><Ornament /></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function ComingSoonCard({ n, mood }: { n: string; mood: string }) {
  return (
    <div className="group snap-start shrink-0 w-[260px] md:w-[300px]">
      <div className={`relative aspect-[2/3] overflow-hidden rounded-sm bg-gradient-to-b ${mood} border border-border/50`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,oklch(0.78_0.16_65/0.25),transparent_60%)]" />
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold/80">Untitled</span>
          <span className="font-serif text-3xl text-foreground/90">Volume {n}</span>

          <span className="h-px w-8 bg-gold/50" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Coming Soon</span>
        </div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
      </div>
    </div>
  );
}

function Index() {
  const [comingSoonKind, setComingSoonKind] = useState<
    "purchase" | "preview" | "collection" | null
  >(null);

  const copy = {
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
    collection: {
      eyebrow: "Coming Soon",
      title: "The Complete World — $20",
      body: "The complete Flotjie’s World bundle, all five volumes, is coming soon. Leave your email to be first in line.",
      source: "purchase-collection",
    },
  } as const;

  const active = comingSoonKind ? copy[comingSoonKind] : null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero onPurchaseCollection={() => setComingSoonKind("collection")} />

      {/* The Stories */}
      <Section
        id="collection"
        eyebrow="The Stories"
        title="Five lives. Five stories. One world."
      >
        <div className="space-y-32 md:space-y-48">
          {storyList.map((story: Story, i: number) => (
            <VolumeCard
              key={story.slug}
              story={story}
              reverse={i % 2 === 1}
              onComingSoon={(kind) => setComingSoonKind(kind)}
            />
          ))}
        </div>
      </Section>

      {/* Coming Soon */}
      <Section id="coming-soon" eyebrow="The Road Ahead" title="Coming Soon">
        <div className="relative">
          <div className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 md:-mx-10 md:px-10 scrollbar-none">
            {comingSoon.map((c) => (
              <ComingSoonCard key={c.n} n={c.n} mood={c.mood} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>
      </Section>

      <ComingSoonModal
        open={active !== null}
        onClose={() => setComingSoonKind(null)}
        eyebrow={active?.eyebrow ?? ""}
        title={active?.title ?? ""}
        body={active?.body ?? ""}
        source={active?.source ?? "coming-soon"}
      />

      {/* Volume Universe */}
      <Section id="universe" eyebrow="The World" title="One World. Five Unforgettable Lives.">

        <div className="max-w-3xl mx-auto text-center space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground">
          <p>Some stories entertain. Others transform.</p>
          <p>
            Each story in Flotjie’s World explores love, survival, family,
            identity, resilience and redemption through deeply human characters
            inspired by real experiences.
          </p>
          <p className="font-serif italic text-foreground/90 text-2xl md:text-3xl leading-snug pt-4">
            Designed to be read today.
            <br />
            Remembered tomorrow.
            <br />
            <span className="text-gold">Adapted for generations.</span>
          </p>
        </div>
      </Section>

      {/* Reading Platforms */}
      <Section eyebrow="Where To Read" title="Available Everywhere You Read">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border/40 border border-border/40 rounded-sm overflow-hidden max-w-5xl mx-auto">
          {platforms.map((p) => (
            <div
              key={p}
              className="bg-background hover:bg-card transition-colors duration-500 px-6 py-10 flex items-center justify-center text-center"
            >
              <span className="font-serif text-lg md:text-xl text-foreground/85 tracking-wide">
                {p}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* From Page to Screen */}
      <section id="screen" className="relative py-32 md:py-48 overflow-hidden grain">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-30 animate-drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-gold mb-6">
            The Series
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight text-foreground">
            From Page to Screen
          </h2>
          <div className="mt-8 mb-10"><Ornament /></div>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Every story in Flotjie’s World is written with cinematic depth,
            visual storytelling and emotionally authentic characters — laying the
            foundation for The Series, a future limited-series adaptation for the screen.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <Section eyebrow="Stay Close" title="Join the Circle of Readers">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-muted-foreground leading-relaxed mb-10">
            Receive new releases, exclusive chapters, author reflections and
            behind-the-scenes updates before anyone else.
          </p>
          <NewsletterForm source="homepage" />
          <p className="mt-5 text-xs text-muted-foreground/70">
            No noise. Only the quiet updates that matter.
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-[oklch(0.13_0.02_260)] pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <div className="font-serif text-2xl text-foreground">
                Flotjie<span className="text-gold">’</span>s World
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-gold/80">
                flotjie.world
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
                A true story told through five intertwined lives — written to be
                read, remembered, and one day, seen.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] uppercase tracking-[0.35em] text-gold mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/70 tracking-wider">
              © {new Date().getFullYear()} Flotjie’s World — flotjie.world. All stories, all rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <a href="#" className="hover:text-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-gold transition-colors">Substack</a>
              <a href="#" className="hover:text-gold transition-colors">Goodreads</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
