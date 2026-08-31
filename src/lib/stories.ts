import beforeCover from "@/assets/before-i-knew-my-name.jpg";
import shadowsCover from "@/assets/where-the-shadows-break-cover.png";
import gotAwayCover from "@/assets/the-one-that-got-away-cover.png";
import myselfCover from "@/assets/if-i-do-say-so-myself-cover.png";
import betweenCover from "@/assets/between-what-was-and-what-became-cover.png";
import beforeChaptersData from "@/data/before-chapters.json";
import shadowsChaptersData from "@/data/shadows-chapters.json";
import gotAwayChaptersData from "@/data/book3-chapters.json";
import myselfChaptersData from "@/data/book4-chapters.json";
import betweenChaptersData from "@/data/book5-chapters.json";

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
    cover: beforeCover,
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
    cover: shadowsCover,
    authorSlug: "florence-k",
    chapters: shadowsChaptersData as Chapter[],
    accent: "from-[oklch(0.22_0.03_260)] to-[oklch(0.12_0.02_260)]",
  },
  "the-one-that-got-away": {
    slug: "the-one-that-got-away",
    volume: "Volume 03",
    title: "The One That Got Away",
    tagline: "The childhood she never got the chance to keep.",
    genre: "Memoir",
    readTime: "3 hr read",
    synopsis:
      "The eldest of seven, she became her family's protector before she understood what protection would cost her — until a marriage she never chose brought her childhood to an abrupt end.",
    longDescription:
      "The eldest of seven, she became her family's protector before she understood what protection would cost her — until a marriage she never chose brought her childhood to an abrupt end. Set in a crowded house on the corner, this memoir follows a girl who learned to read a stepfather's moods the way other children learned bedtime stories, and who carried her siblings through every storm until there was no one left to carry her.",
    themes: ["Childhood", "Family", "Protection", "Survival", "Lost Innocence"],
    quote: "I was the commander by default — not because I wanted to be, but because life made me that way.",
    cover: gotAwayCover,
    authorSlug: "florence-k",
    chapters: gotAwayChaptersData as Chapter[],
    accent: "from-[oklch(0.22_0.04_40)] to-[oklch(0.13_0.02_260)]",
  },
  "if-i-do-say-so-myself": {
    slug: "if-i-do-say-so-myself",
    volume: "Volume 04",
    title: "If I Do Say So Myself…",
    tagline: "Reclaiming a voice the world tried to decide for her.",
    genre: "Memoir",
    readTime: "2 hr read",
    synopsis:
      "Years after other people decided who she was allowed to be, she takes the pen back — telling her own story, on her own terms, for the first time.",
    longDescription:
      "Years after other people decided who she was allowed to be, she takes the pen back — telling her own story, on her own terms, for the first time. Married at fifteen, betrayed, widowed, and left to raise six children alone, she studies by lamplight, prays through the loneliness, and refuses to let survival be mistaken for defeat.",
    themes: ["Faith", "Motherhood", "Resilience", "Independence", "Testimony"],
    quote: "Even if I say so myself, I have lived. I have endured. And I am still here.",
    cover: myselfCover,
    authorSlug: "florence-k",
    chapters: myselfChaptersData as Chapter[],
    accent: "from-[oklch(0.22_0.05_60)] to-[oklch(0.12_0.02_260)]",
  },
  "between-what-was-and-what-became": {
    slug: "between-what-was-and-what-became",
    volume: "Volume 05",
    title: "Between What Was & What Became…",
    tagline: "A family, a legacy, and the woman who built both.",
    genre: "Memoir",
    readTime: "2 hr read",
    synopsis:
      "Surrounded by the family she built from the wreckage of the one she survived, she measures the distance between the girl she was and the woman she became.",
    longDescription:
      "Surrounded by the family she built from the wreckage of the one she survived, she measures the distance between the girl she was and the woman she became. A meditation on devotion, deferred dreams and the quiet cost of loyalty — told through the life of a woman whose greatest journey was never across an ocean, but within the walls of her own home.",
    themes: ["Legacy", "Devotion", "Dreams Deferred", "Betrayal", "Family"],
    quote: "She lived faithfully, even when fate was cruel. She dreamed fiercely, even when the world denied her.",
    cover: betweenCover,
    authorSlug: "florence-k",
    chapters: betweenChaptersData as Chapter[],
    accent: "from-[oklch(0.22_0.03_200)] to-[oklch(0.13_0.02_260)]",
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
    storySlugs: [
      "before-i-knew-my-name",
      "where-the-shadows-break",
      "the-one-that-got-away",
      "if-i-do-say-so-myself",
      "between-what-was-and-what-became",
    ],
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