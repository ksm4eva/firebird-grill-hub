import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import galleryGrill from "@/assets/gallery-grill.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import logoCream from "@/assets/firebird-logo-cream.png.asset.json";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — FIREBIRD" },
      { name: "description", content: "From one brick oven to a flame-grilled obsession. The story behind Firebird." },
      { property: "og:title", content: "Our Story — FIREBIRD" },
      { property: "og:description", content: "Born from fire. Raised on flavor." },
      { property: "og:image", content: galleryGrill },
    ],
  }),
  component: StoryPage,
});

const timeline = [
  { year: "2012", title: "One brick oven", text: "Founder Mara opens a tiny brick-oven kitchen in Brooklyn with one obsession — real fire, real flavor." },
  { year: "2015", title: "The smash hit", text: "The Firebird Burger lands on a local food show. A line forms around the block and never really stops." },
  { year: "2018", title: "Flame goes south", text: "Austin opens. A second wood-burning grill. Smoky wings join the menu and become a cult favorite." },
  { year: "2021", title: "West coast heat", text: "LA flagship debuts with the first open-kitchen design and a full mocktail bar." },
  { year: "2026", title: "48 kitchens, one fire", text: "We've grown — but every kitchen still grinds its own spice blend and brines chicken for 24 hours." },
];

const values = [
  { icon: Flame, title: "Real fire, always", text: "Every patty hits an open flame. Every bird gets char. No shortcuts, no convection cheats." },
  { icon: Leaf, title: "Whole, not processed", text: "Locally sourced beef and poultry. Brioche baked daily. Zero artificial anything." },
  { icon: ArrowRight, title: "Made to order", text: "Nothing sits under a lamp. Your order fires the second you hit confirm." },
];

function StoryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Story"
        title="BORN FROM FIRE."
        accent="RAISED ON FLAVOR."
        description="Firebird isn't a chain that grew into a brand. It's a brand built around one stubborn idea: food tastes better with real flame behind it."
      />

      {/* Intro split */}
      <section className="bg-[var(--cream)] pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="img-zoom overflow-hidden rounded-[2rem] shadow-float">
            <img src={galleryGrill} alt="Open flame grill" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">The Origin</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
              ONE OVEN. <span className="text-[var(--primary)]">ONE OBSESSION.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--ink)]/75 sm:text-lg">
              <p>
                In 2012, our founder Mara had a busted brick oven, a butcher she trusted, and a hunch
                that fast food didn't have to taste fast. She started smashing burgers over open flame
                and brining chicken overnight in buttermilk and a spice blend she still hand-mixes today.
              </p>
              <p>
                One menu. Six items. A line that wouldn't quit. That kitchen became Firebird — and the
                rule has never changed: if it doesn't touch fire, it doesn't go on the plate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--primary)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">What We Believe</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">
              THE FIREBIRD <span className="text-[var(--accent)]">CODE.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card-lift rounded-[1.75rem] bg-white/10 p-7 backdrop-blur">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-white">
                  <v.icon size={22} />
                </div>
                <h3 className="text-display mt-5 text-xl tracking-wide text-[var(--cream)]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--cream)]/80">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[var(--cream)] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">The Journey</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
              FROM ONE GRILL TO <span className="text-[var(--primary)]">FORTY-EIGHT.</span>
            </h2>
          </div>
          <ol className="mt-14 space-y-6">
            {timeline.map((t, i) => (
              <li
                key={t.year}
                className="card-lift grid gap-4 rounded-[1.75rem] bg-white p-6 shadow-soft sm:grid-cols-[120px_1fr] sm:p-8"
                style={{ animationDelay: `${i * 80}ms` }}
              >
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

      {/* Closing */}
      <section className="relative overflow-hidden bg-[var(--primary)] py-20 text-center">
        <img src={galleryInterior} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <img src={logoCream.url} alt="" className="mx-auto h-16 w-16" />
          <h2 className="text-display mt-6 text-4xl text-[var(--cream)] sm:text-5xl">
            COME TASTE THE <span className="text-[var(--accent)]">FIRE.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/locations" className="btn-flame">Find a location</Link>
            <Link to="/menu" className="btn-ghost-cream">See the menu</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
