import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Users, Heart, Award } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import galleryInterior from "@/assets/gallery-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FIREBIRD" },
      { name: "description", content: "About Firebird — the team, the mission, the fire." },
      { property: "og:title", content: "About — FIREBIRD" },
      { property: "og:image", content: galleryInterior },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "Mara Chen", role: "Founder & CEO", bio: "Started Firebird in 2012. Still tastes every sauce." },
  { name: "Diego Ruiz", role: "Executive Chef", bio: "James Beard semifinalist. Owns the spice blend." },
  { name: "Aisha Patel", role: "Head of Operations", bio: "Keeps 48 kitchens running like one." },
  { name: "Jordan Kim", role: "Creative Director", bio: "The reason your napkin looks good." },
];

const stats = [
  { v: "12+", l: "Years grilling" },
  { v: "48", l: "Locations" },
  { v: "1M+", l: "Meals served monthly" },
  { v: "2,400+", l: "Five-star reviews" },
];

const principles = [
  { icon: Flame, t: "Fire first", d: "Open flame is non-negotiable. Every kitchen has a real grill." },
  { icon: Heart, t: "People first", d: "We pay above market, share tips, and promote from within." },
  { icon: Users, t: "Community first", d: "1% of every order funds local food security programs." },
  { icon: Award, t: "Craft first", d: "Brioche baked daily. Spices ground in-house. Always." },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Firebird"
        title="WE'RE A KITCHEN"
        accent="FIRST."
        description="A restaurant company built around one rule: if it doesn't touch fire, it doesn't go on the plate."
      />

      <section className="bg-[var(--cream)] pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl bg-white p-6 text-center shadow-soft">
                <p className="text-display text-5xl text-[var(--primary)]">{s.v}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-[var(--ink)]/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">What we stand for</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">
              FOUR PRINCIPLES. <span className="text-[var(--accent)]">ZERO COMPROMISE.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.t} className="card-lift rounded-[1.75rem] bg-white/10 p-7 backdrop-blur">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-white">
                  <p.icon size={22} />
                </div>
                <h3 className="text-display mt-5 text-xl text-[var(--cream)]">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--cream)]/80">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">The Crew</p>
            <h2 className="text-display mt-3 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
              THE PEOPLE BEHIND <span className="text-[var(--primary)]">THE FIRE.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article key={m.name} className="card-lift rounded-[1.75rem] bg-white p-6 text-center shadow-soft">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-blue text-display text-3xl text-[var(--cream)]">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-display mt-5 text-xl">{m.name}</h3>
                <p className="text-xs uppercase tracking-widest text-[var(--accent)]">{m.role}</p>
                <p className="mt-3 text-sm text-[var(--ink)]/70">{m.bio}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Link to="/story" className="btn-primary">Read our story</Link>
            <Link to="/careers" className="btn-ghost-cream">Join the crew</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
