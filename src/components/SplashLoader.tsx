import { useEffect, useRef, useState } from "react";
import loader from "@/assets/loader.mp4.asset.json";

export function SplashLoader() {
  const [mounted, setMounted] = useState(true);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("firebird_splash_shown") === "1") {
      setMounted(false);
      return;
    }
    const done = () => {
      sessionStorage.setItem("firebird_splash_shown", "1");
      setHidden(true);
      window.setTimeout(() => setMounted(false), 650);
    };
    const fallback = window.setTimeout(done, 6000);
    const v = videoRef.current;
    if (v) {
      v.addEventListener("ended", done, { once: true });
      v.play().catch(() => done());
    }
    return () => {
      window.clearTimeout(fallback);
      v?.removeEventListener("ended", done);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--primary,#FF6A00)] transition-opacity duration-700 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src={loader.url}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-contain"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}
