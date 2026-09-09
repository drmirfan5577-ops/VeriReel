import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Scene } from "@/types";

interface SceneImageProps {
  scene: Scene;
  className?: string;
}

export function SceneImage({ scene, className }: SceneImageProps) {
  const [src, setSrc] = useState(scene.imageUrl);

  return (
    <img
      src={src}
      alt={scene.caption}
      loading="lazy"
      onError={() => {
        if (src !== scene.fallbackUrl) setSrc(scene.fallbackUrl);
      }}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
