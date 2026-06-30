import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import { useAdmin } from "@/lib/adminStore";
import { formatGHS } from "@/lib/format";
import heroBurger from "@/assets/hero-burger.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Full Menu — FIREBIRD Ghana" },
      { name: "description", content: "Explore the full Firebird menu — flame-grilled burgers, crispy chicken, suya wings, jollof bowls, sides, drinks and dessert." },
      { property: "og:title", content: "Full Menu — FIREBIRD" },
      { property: "og:image", content: heroBurger },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { state } = useAdmin();
  const { menuSections, menuItems } = state;

  return (
    <PageShell>
      <PageHero
        eyebrow="The Full Lineup"
        title="EVERY"
        accent="BITE."
        description="Hand-pressed, brined for 24 hours, flame-grilled to order. Browse the entire Firebird menu."
      />

      <div className="sticky top-20 z-30 -mt-2 border-y border-[var(--primary)]/15 bg-[var(--cream)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10">
          {menuSections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] shadow-sm transition-colors hover:bg-[var(--primary)] hover:text-[var(--cream)]">
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {menuSections.map((sec, idx) => {
        const items = menuItems.filter((i) => i.sectionId === sec.id && i.available);
        if (items.length === 0) return null;
        return (
          <section key={sec.id} id={sec.id} className={`${idx % 2 === 0 ? "bg-[var(--cream)]" : "bg-white"} py-16 sm:py-24`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">{sec.tagline}</p>
                  <h2 className="text-display mt-3 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">{sec.title}</h2>
                </div>
                <Flame className="hidden text-[var(--accent)] sm:block" size={36} />
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it) => (
                  <article key={it.id} className="card-lift group overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
                    {it.img && (
                      <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                        <img src={it.img} alt={it.name} loading="lazy" className="h-full w-full object-cover" />
                        {it.tag && <span className="absolute left-3 top-3 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--cream)]">{it.tag}</span>}
                      </div>
                    )}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-display text-lg tracking-wide sm:text-xl">{it.name}</h3>
                        <span className="text-display text-lg text-[var(--accent)] sm:text-xl">{formatGHS(it.price)}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/65">{it.desc}</p>
                      {it.veg && <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[var(--primary)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]"><Leaf size={12} /> Plant-based</span>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-[var(--primary)] py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-display text-4xl text-[var(--cream)] sm:text-5xl">HUNGRY? <span className="text-[var(--accent)]">FIRE IT UP.</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--cream)]/80">Order online for pickup or delivery across Ghana.</p>
          <Link to="/order" className="btn-flame mt-8 inline-flex">Order Now <ArrowRight size={16} /></Link>
        </div>
      </section>
    </PageShell>
  );
}
