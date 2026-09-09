import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CategoryPicker } from "@/components/studio/CategoryPicker";
import { ScriptComposer } from "@/components/studio/ScriptComposer";
import { GenerationOverlay } from "@/components/studio/GenerationOverlay";
import { useVideos } from "@/hooks/useVideos";
import { createVideo } from "@/lib/generation";
import type { CategoryId, VideoFormat } from "@/types";

export default function Studio() {
  const navigate = useNavigate();
  const { addVideo } = useVideos();

  const [category, setCategory] = useState<CategoryId | null>(null);
  const [title, setTitle] = useState("");
  const [script, setScript] = useState("");
  const [format, setFormat] = useState<VideoFormat>("16:9");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!category || !script.trim()) return;
    setGenerating(true);
  };

  const finalize = () => {
    if (!category) return;
    const video = createVideo({ title, category, script, format });
    addVideo(video);
    setGenerating(false);
    toast.success("Video ready", { description: `${video.scenes.length} scenes composed.` });
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Video Studio</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a mission, narrate your idea, and generate a captioned video.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              1
            </span>
            Pick a category
          </h2>
          <CategoryPicker value={category} onChange={setCategory} />
        </section>

        {category && (
          <section className="animate-fade-up">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                2
              </span>
              Compose your video
            </h2>
            <div className="rounded-3xl border border-border bg-card p-6">
              <ScriptComposer
                category={category}
                title={title}
                script={script}
                format={format}
                onTitle={setTitle}
                onScript={setScript}
                onFormat={setFormat}
                onGenerate={handleGenerate}
              />
            </div>
          </section>
        )}
      </div>

      {generating && <GenerationOverlay onDone={finalize} />}
    </div>
  );
}
