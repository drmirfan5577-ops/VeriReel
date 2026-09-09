import { Mic, Wand2, Video } from "lucide-react";

const steps = [
  {
    icon: Mic,
    title: "Explain it verbally",
    body: "Speak or type your explanation naturally — no script formatting required.",
  },
  {
    icon: Wand2,
    title: "Auto-matched visuals",
    body: "Each sentence becomes a scene with a relevant visual, in real time.",
  },
  {
    icon: Video,
    title: "Preview & publish",
    body: "Play the captioned video, pick landscape or vertical, and save to your library.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border/70 bg-card/30">
      <div className="container py-16 lg:py-24">
        <h2 className="mb-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          From voice to video in three steps
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative rounded-3xl border border-border bg-card p-7">
                <span className="font-display text-5xl font-extrabold text-muted/60">
                  0{i + 1}
                </span>
                <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
