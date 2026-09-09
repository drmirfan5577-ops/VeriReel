import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { VideoPlayer } from "@/components/features/VideoPlayer";
import { CategoryPill } from "@/components/features/CategoryPill";
import { useVideos } from "@/hooks/useVideos";
import { formatDate, formatDuration } from "@/lib/utils";

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { videos, removeVideo } = useVideos();
  const video = useMemo(() => videos.find((v) => v.id === id), [videos, id]);

  if (!video) {
    return (
      <div className="container max-w-2xl py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Video not found</h1>
        <p className="mt-2 text-muted-foreground">It may have been deleted.</p>
        <Link
          to="/library"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 font-semibold hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" /> Back to library
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    removeVideo(video.id);
    toast.success("Video deleted");
    navigate("/library");
  };

  return (
    <div className="container max-w-5xl py-10">
      <Link
        to="/library"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Library
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <VideoPlayer video={video} />
        </div>

        <div>
          <CategoryPill category={video.category} />
          <h1 className="mt-4 font-display text-2xl font-bold leading-tight">{video.title}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{video.scenes.length} scenes</span>
            <span>{formatDuration(video.duration)}</span>
            <span>{video.format}</span>
            <span>{formatDate(video.createdAt)}</span>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() =>
                toast.info("Export coming soon", {
                  description: "Video rendering & download will be available shortly.",
                })
              }
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Download className="h-4 w-4" /> Export
            </button>
            <button
              onClick={handleDelete}
              aria-label="Delete video"
              className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-3 text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Scene breakdown</h2>
            <ol className="space-y-2">
              {video.scenes.map((s, i) => (
                <li
                  key={s.id}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{s.caption}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
