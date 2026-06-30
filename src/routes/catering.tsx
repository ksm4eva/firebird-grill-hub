import { createFileRoute } from "@tanstack/react-router";
import { Users, Truck, Flame, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import { useAdmin, uid } from "@/lib/adminStore";
import galleryGrill from "@/assets/gallery-grill.jpg";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: "Catering — FIREBIRD Ghana" },
      { name: "description", content: "Catering for offices, weddings & events across Ghana. From 10 to 1,000 guests." },
      { property: "og:image", content: galleryGrill },
    ],
  }),
  component: CateringPage,
});

const packages = [
  { id: "lunch", name: "The Lunch Drop", serves: "10–20", price: 180, per: "per person", desc: "Sandwich trays, sides, drinks. Delivered hot, ready in 60 minutes.", highlights: ["3 sandwich choices", "2 side trays", "Cookies & drinks"] },
  { id: "big-burn", name: "The Big Burn", serves: "25–75", price: 260, per: "per person", desc: "Build-your-own bar with burgers, chicken, wings, and full sides spread.", highlights: ["Live build bar", "4 mains", "5 sides", "Mocktails included"], popular: true },
  { id: "open-flame", name: "The Open Flame", serves: "75–500", price: 380, per: "per person", desc: "On-site grill, chef-led service, full beverage program. Full event production.", highlights: ["On-site chef & grill", "Custom menu", "Servers + beverage", "Setup & breakdown"] },
];

function CateringPage() {
  const { setState } = useAdmin();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", date: "", guests: "", notes: "", pkg: "big-burn" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      cateringInquiries: [
        { id: uid("cat"), createdAt: new Date().toISOString(), name: form.name, email: form.email, phone: form.phone, eventDate: form.date, guests: +form.guests || 0, packageType: form.pkg, notes: form.notes, status: "new" },
        ...prev.cateringInquiries,
      ],
    }));
    setSent(true);
  }

  return (
    <PageShell>
      <PageHero eyebrow="Catering" title="FEED THE" accent="WHOLE CREW." description="From a 10-person lunch drop to a 500-guest open-flame event. We bring the fire to you — anywhere in Ghana." />

      <section className="bg-[var(--cream)] pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Users, t: "Any size", d: "10 to 1,000 guests" },
              { icon: Truck, t: "Delivered hot", d: "Ready in 60 min" },
              { icon: Flame, t: "On-site grill", d: "Available for 75+ events" },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-white p-5 shadow-soft">
                <f.icon className="text-[var(--accent)]" size={22} />
                <p className="text-display mt-3 text-xl">{f.t}</p>
                <p className="text-sm text-[var(--ink)]/60">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((p) => (
              <article key={p.id} className={`card-lift relative overflow-hidden rounded-[1.75rem] p-7 shadow-soft ${p.popular ? "bg-[var(--primary)] text-[var(--cream)]" : "bg-white"}`}>
                {p.popular && <span className="absolute right-5 top-5 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Most popular</span>}
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Serves {p.serves}</p>
                <h3 className="text-display mt-2 text-3xl tracking-wide">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-display text-5xl">₵{p.price}</span>
                  <span className={`text-xs uppercase tracking-widest ${p.popular ? "text-[var(--cream)]/70" : "text-[var(--ink)]/60"}`}>{p.per}</span>
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${p.popular ? "text-[var(--cream)]/80" : "text-[var(--ink)]/70"}`}>{p.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.highlights.map((h) => (<li key={h} className="flex items-center gap-2"><Check size={14} className="text-[var(--accent)]" /> {h}</li>))}
                </ul>
                <button onClick={() => { setForm((f) => ({ ...f, pkg: p.id })); document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" }); }} className={`mt-7 inline-flex w-full justify-center ${p.popular ? "btn-flame" : "btn-primary"}`}>Inquire <ArrowRight size={16} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="bg-[var(--primary)] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <div className="text-center text-[var(--cream)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Tell us about your event</p>
            <h2 className="text-display mt-3 text-4xl sm:text-5xl">PLAN YOUR <span className="text-[var(--accent)]">BURN.</span></h2>
          </div>

          {sent ? (
            <div className="mt-10 rounded-[2rem] bg-white p-10 text-center shadow-soft">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-white"><Check size={28} /></div>
              <h3 className="text-display mt-6 text-2xl">GOT IT.</h3>
              <p className="mt-2 text-[var(--ink)]/70">A catering manager will reach out within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 rounded-[2rem] bg-white p-6 shadow-soft sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your full name" />
                <Input label="Company" required={false} value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Optional" />
                <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
                <Input label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+233 24 000 0000" />
                <Input label="Event date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
                <Input label="Guest count" type="number" value={form.guests} onChange={(v) => setForm({ ...form, guests: v })} placeholder="50" />
                <div className="sm:col-span-2">
                  <Input label="Tell us about your event" textarea value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} placeholder="Office lunch? Wedding? Conference? What's the vibe?" />
                </div>
              </div>
              <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">Send inquiry</button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Input({ label, type = "text", placeholder, textarea, required = true, value, onChange }: { label: string; type?: string; placeholder?: string; textarea?: boolean; required?: boolean; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">{label}</span>
      <div className="mt-2 rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3">
        {textarea ? (
          <textarea rows={4} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40" />
        ) : (
          <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40" />
        )}
      </div>
    </label>
  );
}
