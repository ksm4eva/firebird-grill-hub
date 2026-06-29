import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — FIREBIRD" },
      { name: "description", content: "Firebird in the press. Media coverage, press kit, and contact." },
      { property: "og:title", content: "Press — FIREBIRD" },
    ],
  }),
  component: PressPage,
});

const features = [
  { outlet: "The New York Times", title: "Firebird is rewriting the fast-casual playbook", date: "March 2026", quote: "A burger so confidently char-grilled it makes the competition feel microwaved." },
  { outlet: "Eater", title: "How Mara Chen built America's most-watched chicken brand", date: "January 2026", quote: "Firebird grew without sacrificing the one thing that matters: actual fire." },
  { outlet: "Bon Appétit", title: "Best Burger of the Year", date: "December 2025", quote: "The Firebird Burger is, simply, perfect." },
  { outlet: "Fast Company", title: "Most innovative companies in food", date: "October 2025", quote: "A masterclass in scaling without losing the soul of the kitchen." },
  { outlet: "Forbes 30 Under 30", title: "Diego Ruiz, Executive Chef", date: "August 2025", quote: "Reinventing fast casual one flame-licked patty at a time." },
];

const kit = [
  { name: "Logo pack (SVG, PNG)", size: "2.4 MB" },
  { name: "Brand guidelines (PDF)", size: "8.1 MB" },
  { name: "Hi-res photography", size: "240 MB" },
  { name: "Founder bios & headshots", size: "12 MB" },
];

function PressPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Press"
        title="STORIES ABOUT"
        accent="THE FIRE."
        description="What writers, critics, and customers are saying about Firebird."
      />

      <section className="bg-[var(--cream)] pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <ul className="space-y-4">
            {features.map((f) => (
              <li key={f.title}>
                <a href="#" className="card-lift block rounded-[1.75rem] bg-white p-6 shadow-soft sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-display text-sm uppercase tracking-widest text-[var(--primary)]">{f.outlet}</span>
                    <span className="text-xs uppercase tracking-widest text-[var(--ink)]/50">{f.date}</span>
                  </div>
                  <h3 className="text-display mt-3 text-2xl sm:text-3xl">{f.title}</h3>
                  <p className="mt-3 text-base italic text-[var(--ink)]/70">"{f.quote}"</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                    Read article <ArrowRight size={14} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--primary)] py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Press Kit</p>
              <h2 className="text-display mt-3 text-4xl text-[var(--cream)] sm:text-5xl">EVERYTHING YOU NEED.</h2>
              <p className="mt-4 text-[var(--cream)]/80">
                Logos, brand guidelines, photography, and bios. Free to use with attribution.
              </p>
              <p className="mt-6 text-sm text-[var(--cream)]/70">
                Press inquiries: <a href="mailto:press@firebird.com" className="text-[var(--accent)] underline">press@firebird.com</a>
              </p>
            </div>
            <ul className="space-y-3">
              {kit.map((k) => (
                <li key={k.name}>
                  <a href="#" className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-[var(--cream)] backdrop-blur transition-colors hover:bg-[var(--accent)]">
                    <div>
                      <p className="font-semibold">{k.name}</p>
                      <p className="text-xs uppercase tracking-widest opacity-70">{k.size}</p>
                    </div>
                    <Download size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
