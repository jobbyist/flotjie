import { useEffect } from "react";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[oklch(0.16_0.02_260)] border border-gold/30 rounded-sm shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)] animate-fade-up">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-gold border border-border/50 rounded-sm bg-background/60"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function ComingSoonModal({
  open,
  onClose,
  eyebrow,
  title,
  body,
  source,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  body: string;
  source: string;
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="coming-soon-title">
      <div className="p-8 md:p-12 text-center">
        <div className="flex items-center justify-center gap-3 text-gold mb-6">
          <span className="h-px w-8 bg-gold/60" />
          <span className="text-[11px] uppercase tracking-[0.35em]">{eyebrow}</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <h2
          id="coming-soon-title"
          className="font-serif text-3xl md:text-4xl leading-tight text-foreground"
        >
          {title}
        </h2>
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-md mx-auto">{body}</p>
        <div className="mt-8 text-left">
          <NewsletterForm source={source} />
        </div>
        <p className="mt-5 text-xs text-muted-foreground/70">
          We’ll write only when there is something worth reading.
        </p>
      </div>
    </Modal>
  );
}