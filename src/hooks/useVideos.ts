import { useCallback, useEffect, useState } from "react";
import type { GeneratedVideo } from "@/types";
import { loadVideos, saveVideos } from "@/lib/storage";

export function useVideos() {
  const [videos, setVideos] = useState<GeneratedVideo[]>(() => loadVideos());

  useEffect(() => {
    saveVideos(videos);
  }, [videos]);

  const addVideo = useCallback((video: GeneratedVideo) => {
    setVideos((prev) => [video, ...prev]);
  }, []);

  const removeVideo = useCallback((id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }, []);

  return { videos, addVideo, removeVideo };
}
