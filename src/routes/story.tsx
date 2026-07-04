import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import { useAdmin } from "@/lib/adminStore";
import galleryGrill from "@/assets/gallery-grill.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import logoCream from "@/assets/firebird-emblem-cream.png";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — FIREBIRD Ghana" },
      { name: "description", content: "From one charcoal grill in Osu to a Ghanaian flame-grilled obsession." },
      { property: "og:image", content: galleryGrill },
    ],
  }),
  component: StoryPage,
});

const valueIcons = [Flame, Leaf, ArrowRight];

function StoryPage() {
  const { state } = useAdmin();
  const sc = state.siteContent;
  return (
    <PageShell>
      <PageHero eyebrow="Our Story" title="BORN FROM FIRE." accent="RAISED ON FLAVOR." description={sc.story.intro} />

      <section className="bg-[var(--cream)] pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="img-zoom overflow-hidden rounded-[2rem] shadow-float">
            <img src={galleryGrill} alt="Open flame grill" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">The Origin</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">ONE GRILL. <span className="text-[var(--primary)]">ONE OBSESSION.</span></h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--ink)]/75 sm:text-lg">
              <p>{sc.story.origin}</p>
              <p>One menu. Six items. A line that wouldn't quit. That kitchen became Firebird — and the rule has never changed: if it doesn't touch fire, it doesn't go on the plate.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">What We Believe</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">THE FIREBIRD <span className="text-[var(--accent)]">CODE.</span></h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sc.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div key={v.id} className="card-lift rounded-[1.75rem] bg-white/10 p-7 backdrop-blur">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-white"><Icon size={22} /></div>
                  <h3 className="text-display mt-5 text-xl tracking-wide text-[var(--cream)]">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--cream)]/80">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">The Journey</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">FROM ONE GRILL TO <span className="text-[var(--primary)]">{state.locations.length}.</span></h2>
          </div>
          <ol className="mt-14 space-y-6">
            {sc.timeline.map((t, i) => (
              <li key={t.id} className="card-lift grid gap-4 rounded-[1.75rem] bg-white p-6 shadow-soft sm:grid-cols-[120px_1fr] sm:p-8" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-display text-4xl text-[var(--accent)]">{t.year}</div>
                <div>
                  <h3 className="text-display text-2xl tracking-wide">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/70 sm:text-base">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--primary)] py-20 text-center">
        <img src={galleryInterior} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <img src={logoCream} alt="" className="mx-auto h-16 w-16" />
          <h2 className="text-display mt-6 text-4xl text-[var(--cream)] sm:text-5xl">COME TASTE THE <span className="text-[var(--accent)]">FIRE.</span></h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/locations" className="btn-flame">Find a location</Link>
            <Link to="/menu" className="btn-ghost-cream">See the menu</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
