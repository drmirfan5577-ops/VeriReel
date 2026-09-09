import { Clapperboard } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-10">
      <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="h-4 w-4" />
          </span>
          <span className="font-display font-semibold text-foreground">VeriReel</span>
        </div>
        <p>Voice-first videos for research, health & awareness.</p>
        <p>© {new Date().getFullYear()} VeriReel</p>
      </div>
    </footer>
  );
}
