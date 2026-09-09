import type { GeneratedVideo } from "@/types";

const KEY = "verireel.videos";

export function loadVideos(): GeneratedVideo[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GeneratedVideo[]) : [];
  } catch {
    return [];
  }
}

export function saveVideos(videos: GeneratedVideo[]) {
  localStorage.setItem(KEY, JSON.stringify(videos));
}

export function getVideoById(id: string): GeneratedVideo | undefined {
  return loadVideos().find((v) => v.id === id);
}
