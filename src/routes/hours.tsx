import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";

export const Route = createFileRoute("/hours")({
  head: () => ({
    meta: [
      { title: "Hours — FIREBIRD" },
      { name: "description", content: "Firebird location hours. Open daily, late nights on weekends." },
      { property: "og:title", content: "Hours — FIREBIRD" },
    ],
  }),
  component: HoursPage,
});

const hours = [
  { day: "Monday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Tuesday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Wednesday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Thursday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Friday", open: "11:00 AM", close: "1:00 AM" },
  { day: "Saturday", open: "10:00 AM", close: "1:00 AM" },
  { day: "Sunday", open: "10:00 AM", close: "10:00 PM" },
];

const cityVariants = [
  { city: "Brooklyn, NY", note: "Late kitchen Fri–Sat" },
  { city: "Austin, TX", note: "Open until 12am every night" },
  { city: "Los Angeles, CA", note: "Brunch menu Sat–Sun until 2pm" },
  { city: "Miami, FL", note: "Open until 12am every night" },
];

function HoursPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <PageShell>
      <PageHero
        eyebrow="When We're Fired Up"
        title="ALWAYS"
        accent="OPEN HOT."
        description="Standard hours below. Some flagships run later — check your local kitchen."
      />

      <section className="bg-[var(--cream)] pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-10">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--primary)] text-[var(--cream)]">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Standard Hours</p>
                <h2 className="text-display text-2xl">Firebird Kitchens</h2>
              </div>
            </div>
            <ul className="mt-8 divide-y divide-[var(--ink)]/10">
              {hours.map((h) => {
                const active = h.day === today;
                return (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between py-4 ${
                      active ? "text-[var(--primary)]" : ""
                    }`}
                  >
                    <span className={`text-display text-lg tracking-wide ${active ? "" : "text-[var(--ink)]"}`}>
                      {h.day}
                      {active && <span className="ml-3 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">Today</span>}
                    </span>
                    <span className="text-sm font-semibold tabular-nums">{h.open} – {h.close}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="text-display text-2xl">Local variations</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {cityVariants.map((c) => (
                <div key={c.city} className="rounded-2xl bg-white p-5 shadow-soft">
                  <p className="text-display text-lg">{c.city}</p>
                  <p className="mt-1 text-sm text-[var(--ink)]/70">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
