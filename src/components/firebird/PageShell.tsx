import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const VARIANTS = ["fade-up", "fade-left", "zoom", "blur", "fade-right", "tilt"] as const;

function useSectionReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section"),
    );
    if (sections.length === 0) return;

    if (prefersReduced) {
      sections.forEach((s) => s.classList.add("is-revealed"));
      return;
    }

    sections.forEach((s, i) => {
      if (!s.dataset.reveal) s.dataset.reveal = VARIANTS[i % VARIANTS.length];
      // First section (hero) shows immediately for a smooth entry
      if (i === 0) {
        requestAnimationFrame(() => s.classList.add("is-revealed"));
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((s, i) => {
      if (i === 0) return;
      io.observe(s);
    });

    return () => io.disconnect();
  }, [pathname]);
}

export function PageShell({ children }: { children: ReactNode }) {
  useSectionReveal();
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--cream)] pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[360px] w-[360px] rounded-full blur-3xl opacity-40 animate-flame"
        style={{ background: "radial-gradient(closest-side, #FF6A00, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(closest-side, #1147D1, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
          {eyebrow}
        </p>
        <h1 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-8xl">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-[var(--primary)]">{accent}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink)]/70 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
