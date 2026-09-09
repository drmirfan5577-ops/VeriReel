import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Studio from "@/pages/Studio";
import Library from "@/pages/Library";
import VideoDetail from "@/pages/VideoDetail";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/library" element={<Library />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster theme="dark" position="top-center" richColors />
    </BrowserRouter>
  );
}
