import { useEffect, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategory } from "@/constants/categories";
import type { GeneratedVideo } from "@/types";
import { SceneImage } from "./SceneImage";

const SCENE_MS = 3600;

export function VideoPlayer({ video }: { video: GeneratedVideo }) {
  const meta = getCategory(video.category);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    setProgress(0);
    const start = Date.now();
    const timer = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / SCENE_MS);
      setProgress(p);
      if (p >= 1) setIndex((i) => (i + 1) % video.scenes.length);
    }, 40);
    return () => clearInterval(timer);
  }, [playing, index, video.scenes.length]);

  const go = (dir: number) => {
    setIndex((i) => (i + dir + video.scenes.length) % video.scenes.length);
    setProgress(0);
  };

  const isVertical = video.format === "9:16";

  return (
    <div className={cn(isVertical ? "mx-auto max-w-[340px]" : "w-full")}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-black",
          isVertical ? "aspect-[9/16]" : "aspect-video"
        )}
      >
        {video.scenes.map((scene, i) => (
          <div
            key={scene.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            <SceneImage scene={scene} className="scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
          </div>
        ))}

        {/* top meta */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span
            className={cn(
              "rounded-full bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur",
              meta.text
            )}
          >
            {meta.name}
          </span>
          <span className="rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur">
            {index + 1}/{video.scenes.length}
          </span>
        </div>

        {/* caption */}
        <div className="absolute inset-x-0 bottom-0 p-5 pb-7">
          <div className="mb-3 flex gap-1">
            {video.scenes.map((s, i) => (
              <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                <div
                  className={cn("h-full rounded-full", meta.bg)}
                  style={{
                    width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>
          <p
            key={index}
            className="animate-scene-in text-balance font-display text-lg font-semibold leading-snug text-white drop-shadow md:text-xl"
          >
            {video.scenes[index]?.caption}
          </p>
        </div>
      </div>

      {/* controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          aria-label="Previous scene"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground transition hover:brightness-110",
            meta.bg
          )}
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next scene"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
