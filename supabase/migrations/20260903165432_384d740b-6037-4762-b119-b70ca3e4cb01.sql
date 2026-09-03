CREATE TABLE public.journal_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug text NOT NULL,
  visitor_id text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('like','save')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (article_slug, visitor_id, kind)
);
GRANT SELECT, INSERT, DELETE ON public.journal_reactions TO anon, authenticated;
GRANT ALL ON public.journal_reactions TO service_role;
ALTER TABLE public.journal_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reactions are public" ON public.journal_reactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can react" ON public.journal_reactions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can remove a reaction" ON public.journal_reactions FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE public.journal_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug text NOT NULL,
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 60),
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 4000),
  parent_id uuid REFERENCES public.journal_comments(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.journal_comments TO anon, authenticated;
GRANT ALL ON public.journal_comments TO service_role;
ALTER TABLE public.journal_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments are public" ON public.journal_comments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can comment" ON public.journal_comments FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX journal_comments_slug_idx ON public.journal_comments (article_slug, created_at);
CREATE INDEX journal_reactions_slug_idx ON public.journal_reactions (article_slug, kind);