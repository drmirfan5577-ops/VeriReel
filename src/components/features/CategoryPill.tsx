import { getCategory } from "@/constants/categories";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types";

interface CategoryPillProps {
  category: CategoryId;
  className?: string;
}

export function CategoryPill({ category, className }: CategoryPillProps) {
  const meta = getCategory(category);
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        meta.border,
        meta.text,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {meta.name}
    </span>
  );
}
