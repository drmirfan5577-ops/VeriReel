import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  "Analyzing your narration",
  "Splitting into scenes",
  "Matching real-time visuals",
  "Composing & rendering",
];

interface GenerationOverlayProps {
  onDone: () => void;
}

export function GenerationOverlay({ onDone }: GenerationOverlayProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const step = setInterval(() => setStage((s) => s + 1), 900);
    const finish = setTimeout(onDone, STAGES.length * 900 + 400);
    return () => {
      clearInterval(step);
      clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-xl">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
          <div className="flex items-end gap-1">
            {[10, 18, 26, 14, 20].map((h, i) => (
              <span
                key={i}
                className="w-1.5 animate-wave rounded-full bg-primary"
                style={{ height: h, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
        <h3 className="text-center font-display text-lg font-bold">Generating your video</h3>
        <p className="mt-1 text-center text-sm text-muted-foreground">This takes a few seconds.</p>

        <ul className="mt-6 space-y-3">
          {STAGES.map((label, i) => {
            const done = i < stage;
            const active = i === stage;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-3 text-sm transition",
                  done || active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border",
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                      ? "border-primary text-primary"
                      : "border-border"
                  )}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
