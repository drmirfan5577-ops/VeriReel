import { Microscope, Leaf, Megaphone, type LucideIcon } from "lucide-react";
import type { CategoryId } from "@/types";

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  text: string;
  bg: string;
  border: string;
  ring: string;
  gradient: string;
  glow: string;
  sample: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "research",
    name: "Scientific Research",
    tagline: "Evidence, made visual",
    description:
      "Turn findings, studies and data-driven insights into clear, credible explainer videos.",
    icon: Microscope,
    text: "text-research",
    bg: "bg-research",
    border: "border-research/40",
    ring: "ring-research/40",
    gradient: "from-research/25 via-research/10 to-transparent",
    glow: "shadow-[0_0_60px_-12px_hsl(var(--research))]",
    sample:
      "Recent studies reveal that deep sleep strengthens memory consolidation. During slow-wave sleep, the brain replays daily experiences and transfers them to long-term storage. Researchers found that a single night of poor sleep can reduce recall by up to forty percent.",
  },
  {
    id: "health",
    name: "Healthy Life, No Medication",
    tagline: "Natural, practical wellbeing",
    description:
      "Share lifestyle habits, nutrition and natural routines that support the body without drugs.",
    icon: Leaf,
    text: "text-health",
    bg: "bg-health",
    border: "border-health/40",
    ring: "ring-health/40",
    gradient: "from-health/25 via-health/10 to-transparent",
    glow: "shadow-[0_0_60px_-12px_hsl(var(--health))]",
    sample:
      "Your body has a remarkable ability to heal naturally. Start your morning with sunlight to reset your rhythm. Replace processed sugar with whole fruits. Move your body for thirty minutes each day. Let slow breathing calm your nervous system.",
  },
  {
    id: "awareness",
    name: "Social Awareness",
    tagline: "Messages that move people",
    description:
      "Craft compelling awareness videos on the causes and community issues that matter most.",
    icon: Megaphone,
    text: "text-awareness",
    bg: "bg-awareness",
    border: "border-awareness/40",
    ring: "ring-awareness/40",
    gradient: "from-awareness/25 via-awareness/10 to-transparent",
    glow: "shadow-[0_0_60px_-12px_hsl(var(--awareness))]",
    sample:
      "Every plastic bottle takes four hundred and fifty years to break down. Together we can change this story. Choose reusable containers. Sort your waste with care. Share this message widely. Small daily actions ripple outward and protect our planet for generations.",
  },
];

export function getCategory(id: CategoryId): CategoryMeta {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}
