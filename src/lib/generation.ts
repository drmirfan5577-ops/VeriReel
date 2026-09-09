import type { CategoryId, GenerationInput, GeneratedVideo, Scene } from "@/types";
import { uid } from "@/lib/utils";

const IMAGE_POOLS: Record<CategoryId, string[]> = {
  research: [
    "1532094349884-543bc11b234d",
    "1576086213369-97a306d36557",
    "1518152006812-edab29b069ac",
    "1507413245164-6160d8298b31",
    "1581093588401-fbb62a02f120",
    "1554475900-0a0350e3fc7b",
  ],
  health: [
    "1490645935967-10de6ba17061",
    "1512621776951-a57141f2eefd",
    "1447752875215-b2761acb3c5d",
    "1498837167922-ddd27525d352",
    "1476611317561-60117649dd94",
    "1540206395-68808572332f",
  ],
  awareness: [
    "1517486808906-6ca8b3f04846",
    "1531482615713-2afd69097998",
    "1522202176988-66273c2fd55f",
    "1454165804606-c3d57bc86b40",
    "1497435334941-8c899ee9e8e9",
    "1529156069898-49953e39b3ac",
  ],
};

export function splitScript(text: string): string[] {
  const parts = text
    .split(/(?<=[.!?؟])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [text.trim()].filter(Boolean);
}

export function buildScenes(script: string, category: CategoryId): Scene[] {
  const sentences = splitScript(script);
  const pool = IMAGE_POOLS[category];
  return sentences.map((caption, i) => {
    const id = pool[i % pool.length];
    return {
      id: uid(),
      caption,
      imageUrl: `https://images.unsplash.com/photo-${id}?w=1280&q=80&auto=format&fit=crop`,
      fallbackUrl: `https://picsum.photos/seed/${id}/1280/720`,
    };
  });
}

export function createVideo(input: GenerationInput): GeneratedVideo {
  const scenes = buildScenes(input.script, input.category);
  const title =
    input.title.trim() ||
    (scenes[0]?.caption.slice(0, 56) ?? "Untitled video");
  return {
    id: uid(),
    title,
    category: input.category,
    script: input.script,
    format: input.format,
    scenes,
    createdAt: Date.now(),
    duration: Math.max(scenes.length * 4, 4),
  };
}
