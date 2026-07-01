import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email.").max(255),
});

export function NewsletterForm({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setState("loading");
    setMessage("");
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email, source });
    if (error) {
      // Unique violation → treat as already subscribed
      if (error.code === "23505") {
        setState("success");
        setMessage("You’re already on the list. Welcome back.");
        return;
      }
      setState("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }
    setState("success");
    setMessage("Welcome to the Circle. Look for our next letter soon.");
    setEmail("");
  }

  if (state === "success") {
    return (
      <div className="text-center animate-fade-up">
        <div className="inline-flex items-center gap-3 text-gold mb-4">
          <span className="h-px w-8 bg-gold/60" />
          <span className="text-[11px] uppercase tracking-[0.35em]">Subscribed</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        disabled={state === "loading"}
        className="flex-1 bg-card/60 border border-border/60 rounded-sm px-5 py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-6 py-4 bg-gold text-primary-foreground text-[12px] uppercase tracking-[0.28em] rounded-sm hover:bg-[var(--gold-soft)] transition-colors disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Subscribe"}
      </button>
      {state === "error" && (
        <p className="sm:absolute sm:mt-20 text-xs text-destructive/90 tracking-wide">
          {message}
        </p>
      )}
    </form>
  );
}