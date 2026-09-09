import { Link } from "react-router-dom";
import { ArrowRight, Mic, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-studio.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>

      <div className="container grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Narration-to-video studio
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Speak your idea.
            <br />
            <span className="bg-gradient-to-r from-research via-primary to-accent bg-clip-text text-transparent">
              Watch it become a video.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            VeriReel turns your verbal explanations into captioned videos with real-time
            matched visuals — built for scientific research, medication-free healthy living,
            and social awareness.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Mic className="h-5 w-5" />
              Start creating
            </Link>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold text-foreground transition hover:bg-muted"
            >
              View library
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* floating preview card */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 -z-10 animate-glow rounded-[2rem] bg-primary/20 blur-3xl" />
          <div className="animate-float rounded-3xl border border-border bg-card/80 p-4 backdrop-blur">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=900&q=80&auto=format&fit=crop"
                alt="Science visual preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 font-display text-sm font-semibold text-white">
                "Deep sleep strengthens memory consolidation…"
              </p>
            </div>
            <div className="mt-3 flex items-end gap-1 px-2">
              {[6, 12, 20, 10, 16, 24, 14, 8, 18, 22, 10, 6].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 animate-wave rounded-full bg-primary"
                  style={{ height: h + 8, animationDelay: `${i * 90}ms` }}
                />
              ))}
              <span className="ml-auto text-xs text-muted-foreground">Rendering…</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
