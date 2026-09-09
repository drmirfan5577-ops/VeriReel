import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/features/Hero";
import { CategoryShowcase } from "@/components/features/CategoryShowcase";
import { HowItWorks } from "@/components/features/HowItWorks";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryShowcase />
      <HowItWorks />

      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-10 text-center lg:p-16">
          <div className="grid-noise absolute inset-0 opacity-30" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Your message deserves to be seen
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Record an explanation and get a ready-to-share video in seconds.
            </p>
            <Link
              to="/studio"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Open the studio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
