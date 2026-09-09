import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Plus } from "lucide-react";
import { VideoCard } from "@/components/features/VideoCard";
import { useVideos } from "@/hooks/useVideos";
import { CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types";

export default function Library() {
  const { videos } = useVideos();
  const [filter, setFilter] = useState<CategoryId | "all">("all");

  const filtered = filter === "all" ? videos : videos.filter((v) => v.category === filter);

  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Your Library</h1>
          <p className="mt-2 text-muted-foreground">
            {videos.length} {videos.length === 1 ? "video" : "videos"} created
          </p>
        </div>
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" /> New video
        </Link>
      </div>

      {videos.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", ...CATEGORIES.map((c) => c.id)] as (CategoryId | "all")[]).map((id) => {
            const label = id === "all" ? "All" : CATEGORIES.find((c) => c.id === id)!.name;
            return (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                  filter === id
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Film className="h-7 w-7 text-muted-foreground" />
          </span>
          <h2 className="mt-5 font-display text-lg font-semibold">No videos yet</h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Head to the studio and turn your first explanation into a video.
          </p>
          <Link
            to="/studio"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> Create video
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
