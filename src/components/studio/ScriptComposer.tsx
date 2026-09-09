import { useEffect, useRef, useState } from "react";
import { Mic, Square, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getCategory } from "@/constants/categories";
import type { CategoryId, VideoFormat } from "@/types";

interface ScriptComposerProps {
  category: CategoryId;
  title: string;
  script: string;
  format: VideoFormat;
  onTitle: (v: string) => void;
  onScript: (v: string) => void;
  onFormat: (v: VideoFormat) => void;
  onGenerate: () => void;
}

const FORMATS: { id: VideoFormat; label: string; hint: string }[] = [
  { id: "16:9", label: "Landscape", hint: "YouTube · Web" },
  { id: "9:16", label: "Vertical", hint: "Reels · Shorts" },
];

export function ScriptComposer({
  category,
  title,
  script,
  format,
  onTitle,
  onScript,
  onFormat,
  onGenerate,
}: ScriptComposerProps) {
  const meta = getCategory(category);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (recording) {
      timer.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timer.current) {
      clearInterval(timer.current);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [recording]);

  const stopRecording = () => {
    setRecording(false);
    if (!script.trim()) {
      onScript(meta.sample);
      toast.success("Narration transcribed", {
        description: "We captured a starter draft — edit it freely.",
      });
    } else {
      toast.success("Narration added to your draft");
    }
    setSeconds(0);
  };

  const words = script.trim() ? script.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          placeholder="e.g. Why deep sleep protects your memory"
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="script" className="text-sm font-medium">
            Your explanation
          </label>
          <button
            type="button"
            onClick={() => onScript(meta.sample)}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" /> Use example
          </button>
        </div>
        <div className="relative rounded-xl border border-input bg-background transition focus-within:ring-2 focus-within:ring-ring">
          <textarea
            id="script"
            value={script}
            onChange={(e) => onScript(e.target.value)}
            rows={7}
            placeholder="Speak or type what you want to explain. Each sentence becomes a scene with a matching visual…"
            className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm outline-none"
          />
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
            <button
              type="button"
              onClick={() => (recording ? stopRecording() : setRecording(true))}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                recording
                  ? "bg-red-500/15 text-red-400"
                  : "bg-muted text-foreground hover:brightness-110"
              )}
            >
              {recording ? <Square className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
              {recording ? `Recording ${seconds}s` : "Record narration"}
            </button>

            {recording ? (
              <div className="flex items-end gap-0.5">
                {[10, 16, 22, 12, 18, 24, 14, 8].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 animate-wave rounded-full bg-red-400"
                    style={{ height: h, animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">{words} words</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium">Format</span>
        <div className="grid grid-cols-2 gap-3">
          {FORMATS.map((f) => {
            const active = format === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFormat(f.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 text-left transition",
                  active ? "border-primary ring-2 ring-ring" : "border-border hover:border-foreground/20"
                )}
              >
                <span
                  className={cn(
                    "rounded-md bg-muted",
                    f.id === "16:9" ? "h-6 w-10" : "h-10 w-6"
                  )}
                />
                <span>
                  <span className="block text-sm font-semibold">{f.label}</span>
                  <span className="block text-xs text-muted-foreground">{f.hint}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={!script.trim()}
        onClick={onGenerate}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Wand2 className="h-5 w-5" />
        Generate video
      </button>
    </div>
  );
}
