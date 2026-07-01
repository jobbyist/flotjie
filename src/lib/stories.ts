import beforeCover from "@/assets/before-i-knew-my-name.jpeg.asset.json";
import shadowsCover from "@/assets/where-the-shadows-break.png.asset.json";
import beforeChaptersData from "@/data/before-chapters.json";
import shadowsChaptersData from "@/data/shadows-chapters.json";

export type Chapter = { title: string; body: string };

export type Story = {
  slug: string;
  volume: string;
  title: string;
  tagline: string;
  synopsis: string;
  longDescription: string;
  genre: string;
  readTime: string;
  themes: string[];
  quote: string;
  cover: string;
  authorSlug: string;
  chapters: Chapter[];
  accent: string;
};

export const stories: Record<string, Story> = {
  "before-i-knew-my-name": {
    slug: "before-i-knew-my-name",
    volume: "Volume 01",
    title: "Before I Knew My Name",
    tagline: "A girl. A secret. A life she had to rewrite herself.",
    genre: "Memoir",
    readTime: "6 hr read",
    synopsis:
      "A deeply personal memoir about identity, hidden truths, family secrets and the lifelong search for belonging. The story follows a woman whose life is shaped by silence — before she discovers the truth of who she really is.",
    longDescription:
      "Set against the quiet weight of family silence, Before I Knew My Name traces a life shaped by what was never said. From the house of many children to the slow unravelling of the truths behind it, this memoir asks the questions we most fear to ask: who am I when the story I was told is not the whole story — and what does it take to write my own?",
    themes: ["Identity", "Family Secrets", "Belonging", "Reinvention"],
    quote: "Some names take a lifetime to earn. Others take a lifetime to uncover.",
    cover: beforeCover.url,
    authorSlug: "florence-k",
    chapters: beforeChaptersData as Chapter[],
    accent: "from-[oklch(0.22_0.04_40)] to-[oklch(0.14_0.02_260)]",
  },
  "where-the-shadows-break": {
    slug: "where-the-shadows-break",
    volume: "Volume 02",
    title: "Where The Shadows Break",
    tagline: "A mother's love against the long night of addiction.",
    genre: "Literary Fiction",
    readTime: "7 hr read",
    synopsis:
      "An emotionally powerful story of a mother's unwavering love as she struggles to save her son from addiction while protecting the family she refuses to let fall apart. Inspired by true events.",
    longDescription:
      "Where The Shadows Break moves through the small hours of a family fighting to stay whole. It is a story of prayer at midnight, hard mornings, and the slow, unglamorous work of hope. In Miriam, we meet a mother whose love does not waver — even when the ground beneath her does.",
    themes: ["Family", "Addiction", "Faith", "Resilience", "Redemption"],
    quote: "The storm raged on. But something in her spirit stirred: the story was not yet over.",
    cover: shadowsCover.url,
    authorSlug: "florence-k",
    chapters: shadowsChaptersData as Chapter[],
    accent: "from-[oklch(0.22_0.03_260)] to-[oklch(0.12_0.02_260)]",
  },
};

export const storyList: Story[] = Object.values(stories);

export function getStory(slug: string): Story | undefined {
  return stories[slug];
}

export type Author = {
  slug: string;
  name: string;
  penName: string;
  role: string;
  short: string;
  bio: string[];
  pillars: { title: string; body: string }[];
  storySlugs: string[];
};

export const authors: Record<string, Author> = {
  "florence-k": {
    slug: "florence-k",
    name: "Florence K.",
    penName: "Florence K.",
    role: "Author — The Flotjie's Collection",
    short:
      "Florence K. writes emotionally powerful memoirs and literary fiction inspired by real lives.",
    bio: [
      "Florence K. writes at the seam between memory and myth — stories drawn from real lives, shaped for the intimacy of the page and the scale of the screen.",
      "Her work explores identity, family, survival and quiet redemption. She is drawn to characters who carry silences, and to the moment those silences finally break.",
      "Before I Knew My Name and Where The Shadows Break form the opening chapters of The Flotjie's Collection — a body of work she is building volume by volume.",
    ],
    pillars: [
      {
        title: "Atmospheric Realism",
        body: "Prose that feels lived-in, cinematic in scale but human in every sentence.",
      },
      {
        title: "Inspired by True Events",
        body: "Every story begins in the real — then walks quietly into the space where fiction and memory meet.",
      },
      {
        title: "Written for the Screen",
        body: "Each volume is composed with the visual grammar of a limited series — designed to be read today, remembered tomorrow, adapted for generations.",
      },
    ],
    storySlugs: ["before-i-knew-my-name", "where-the-shadows-break"],
  },
};

export function getAuthor(slug: string): Author | undefined {
  return authors[slug];
}

export function paragraphsFromBody(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}