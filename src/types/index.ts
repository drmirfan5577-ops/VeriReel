export type CategoryId = "research" | "health" | "awareness";

export type VideoFormat = "16:9" | "9:16";

export interface Scene {
  id: string;
  caption: string;
  imageUrl: string;
  fallbackUrl: string;
}

export interface GeneratedVideo {
  id: string;
  title: string;
  category: CategoryId;
  script: string;
  format: VideoFormat;
  scenes: Scene[];
  createdAt: number;
  duration: number;
}

export interface GenerationInput {
  title: string;
  category: CategoryId;
  script: string;
  format: VideoFormat;
}
