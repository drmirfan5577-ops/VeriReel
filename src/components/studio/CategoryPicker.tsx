import { CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types";

interface CategoryPickerProps {
  value: CategoryId | null;
  onChange: (id: CategoryId) => void;
}

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {CATEGORIES.map((c) => {
        const Icon = c.icon;
        const active = value === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            className={cn(
              "relative overflow-hidden rounded-2xl border p-5 text-left transition",
              active
                ? cn("border-transparent ring-2", c.ring, c.glow)
                : "border-border hover:border-foreground/20"
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br transition",
                c.gradient,
                active ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="relative">
              <span
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground",
                  c.bg
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.tagline}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
