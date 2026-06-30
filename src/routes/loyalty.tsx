import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Star, Crown, Gift, Check } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import { useAdmin } from "@/lib/adminStore";

export const Route = createFileRoute("/loyalty")({
  head: () => ({
    meta: [
      { title: "Loyalty — FIREBIRD Ghana" },
      { name: "description", content: "Earn flames with every cedi spent. Free food, early menu drops, members-only events." },
    ],
  }),
  component: LoyaltyPage,
});

const tierIcons = [Flame, Star, Crown];

function LoyaltyPage() {
  const { state } = useAdmin();
  const tiers = state.loyaltyTiers;
  const rewards = state.loyaltyRewards;

  return (
    <PageShell>
      <PageHero eyebrow="Loyalty" title="EARN" accent="FLAMES." description="Free food. Early access. Members-only drops. Every cedi you spend lights a flame." />

      <section className="bg-[var(--cream)] pb-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ v: "1×", l: "Flame per ₵10" }, { v: "₵0", l: "To join" }, { v: "∞", l: "Free food" }].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white p-6 shadow-soft">
                <p className="text-display text-5xl text-[var(--primary)]">{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-[var(--ink)]/60">{s.l}</p>
              </div>
            ))}
          </div>
          <Link to="/order" className="btn-flame mt-10 inline-flex">Join free</Link>
        </div>
      </section>

      <section className="bg-[var(--primary)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">{tiers.length} Tiers</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">CLIMB THE <span className="text-[var(--accent)]">FLAME.</span></h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {tiers.map((t, i) => {
              const Icon = tierIcons[i % tierIcons.length];
              return (
                <article key={t.id} className={`card-lift relative overflow-hidden rounded-[1.75rem] p-7 ${t.popular ? "bg-[var(--accent)] text-white" : "bg-white"}`}>
                  {t.popular && <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Most popular</span>}
                  <Icon size={32} className={t.popular ? "text-white" : "text-[var(--primary)]"} />
                  <h3 className="text-display mt-5 text-3xl tracking-wide">{t.name}</h3>
                  <p className={`text-xs uppercase tracking-widest ${t.popular ? "text-white/80" : "text-[var(--ink)]/60"}`}>{t.req}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Check size={16} className={`mt-0.5 shrink-0 ${t.popular ? "text-white" : "text-[var(--accent)]"}`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Redeem</p>
            <h2 className="text-display mt-3 text-4xl sm:text-5xl">SPEND YOUR <span className="text-[var(--primary)]">FLAMES.</span></h2>
          </div>
          <ul className="mt-10 divide-y divide-[var(--ink)]/10 rounded-[2rem] bg-white p-2 shadow-soft sm:p-4">
            {rewards.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)]"><Gift size={20} /></div>
                  <p className="text-display truncate text-lg sm:text-xl">{r.item}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--primary)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--cream)]"><Flame size={12} /> {r.cost}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
