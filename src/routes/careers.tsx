import { createFileRoute } from "@tanstack/react-router";
import { MapPin, ArrowRight, Heart, TrendingUp, Coffee, Calendar } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — FIREBIRD" },
      { name: "description", content: "Join the Firebird crew. Open roles in the kitchen, on the floor, and at HQ." },
      { property: "og:title", content: "Careers — FIREBIRD" },
    ],
  }),
  component: CareersPage,
});

const perks = [
  { icon: Heart, t: "Health, dental, vision", d: "Day-one coverage, no waiting period." },
  { icon: TrendingUp, t: "Promotion from within", d: "76% of managers started behind the grill." },
  { icon: Coffee, t: "Free meals", d: "Every shift, every role. Eat what you serve." },
  { icon: Calendar, t: "Paid time off", d: "Starting at 3 weeks. Plus your birthday off." },
];

const roles = [
  { title: "Grill Cook", city: "Brooklyn, NY", type: "Full-time", dept: "Kitchen" },
  { title: "Shift Lead", city: "Austin, TX", type: "Full-time", dept: "Operations" },
  { title: "General Manager", city: "Miami, FL", type: "Full-time", dept: "Operations" },
  { title: "Line Cook", city: "Los Angeles, CA", type: "Full-time", dept: "Kitchen" },
  { title: "Catering Coordinator", city: "Chicago, IL", type: "Full-time", dept: "Catering" },
  { title: "Senior Product Designer", city: "Remote", type: "Full-time", dept: "HQ" },
  { title: "Supply Chain Manager", city: "New York, NY", type: "Full-time", dept: "HQ" },
  { title: "Cashier / Host", city: "Nashville, TN", type: "Part-time", dept: "Front of house" },
];

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="WORK WITH"
        accent="FIRE."
        description="We pay above market. We share tips. We promote from within. Come build the best fast-casual brand in the country."
      />

      <section className="bg-[var(--cream)] pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <div key={p.t} className="rounded-2xl bg-white p-6 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)]">
                  <p.icon size={20} />
                </div>
                <p className="text-display mt-4 text-lg">{p.t}</p>
                <p className="text-sm text-[var(--ink)]/65">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Open Roles</p>
              <h2 className="text-display mt-3 text-4xl sm:text-5xl">NOW HIRING.</h2>
            </div>
            <p className="text-sm text-[var(--ink)]/60">{roles.length} positions across {new Set(roles.map(r => r.city)).size} cities</p>
          </div>

          <ul className="mt-10 space-y-3">
            {roles.map((r) => (
              <li key={r.title + r.city}>
                <a href="#" className="card-lift flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="min-w-0">
                    <h3 className="text-display text-xl tracking-wide">{r.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-widest text-[var(--ink)]/60">
                      <span className="inline-flex items-center gap-1"><MapPin size={12} /> {r.city}</span>
                      <span>{r.type}</span>
                      <span className="text-[var(--accent)]">{r.dept}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--primary)]">
                    Apply <ArrowRight size={14} />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-[2rem] bg-[var(--primary)] p-8 text-center text-[var(--cream)] sm:p-12">
            <h3 className="text-display text-3xl sm:text-4xl">DON'T SEE YOUR ROLE?</h3>
            <p className="mx-auto mt-3 max-w-xl text-[var(--cream)]/80">
              We hire great people, not just open roles. Send us your story.
            </p>
            <a href="mailto:careers@firebird.com" className="btn-flame mt-6 inline-flex">
              careers@firebird.com
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
