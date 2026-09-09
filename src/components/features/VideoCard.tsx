import { Link } from "react-router-dom";
import { Clock, Film, Play } from "lucide-react";
import { cn, formatDate, formatDuration } from "@/lib/utils";
import { getCategory } from "@/constants/categories";
import type { GeneratedVideo } from "@/types";
import { SceneImage } from "./SceneImage";

export function VideoCard({ video }: { video: GeneratedVideo }) {
  const meta = getCategory(video.category);
  return (
    <Link
      to={`/video/${video.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-foreground/20"
    >
      <div className="relative aspect-video overflow-hidden">
        {video.scenes[0] && (
          <SceneImage
            scene={video.scenes[0]}
            className="transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full border bg-black/50 px-2.5 py-1 text-xs font-semibold backdrop-blur",
            meta.border,
            meta.text
          )}
        >
          {meta.name}
        </span>
        <div
          className={cn(
            "absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground opacity-0 transition group-hover:opacity-100",
            meta.bg
          )}
        >
          <Play className="h-4 w-4 translate-x-0.5" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug">
          {video.title}
        </h3>
        <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Film className="h-3.5 w-3.5" /> {video.scenes.length} scenes
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {formatDuration(video.duration)}
          </span>
          <span className="ml-auto">{formatDate(video.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
