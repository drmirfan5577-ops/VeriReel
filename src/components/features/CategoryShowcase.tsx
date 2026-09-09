import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";

export function CategoryShowcase() {
  return (
    <section className="container py-16 lg:py-24">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Three missions, one studio
        </h2>
        <p className="mt-3 text-muted-foreground">
          Pick a focus and VeriReel tailors visuals and pacing to fit the message.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon;
          const featured = i === 0;
          return (
            <Link
              key={c.id}
              to="/studio"
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1",
                featured ? "lg:col-span-2 lg:row-span-1" : ""
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition group-hover:opacity-100",
                  c.gradient
                )}
              />
              <div className="relative">
                <span
                  className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground",
                    c.bg
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <p className={cn("mt-5 text-sm font-semibold", c.text)}>{c.tagline}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{c.name}</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                  Create in this category
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
