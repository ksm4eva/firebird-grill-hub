import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Users, Clock, MapPin, Check } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import { useAdmin, uid } from "@/lib/adminStore";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — FIREBIRD Ghana" },
      { name: "description", content: "Book a table at Firebird. Parties of 2 to 20, every flagship across Ghana." },
    ],
  }),
  component: ReservationsPage,
});

const times = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];
const sizes = [2, 3, 4, 5, 6, 8, 10, 12];

function ReservationsPage() {
  const { state, setState } = useAdmin();
  const locs = state.locations.map((l) => `${l.city} — ${l.region}`);

  const [location, setLocation] = useState(locs[0] ?? "");
  const [time, setTime] = useState("7:00 PM");
  const [size, setSize] = useState(2);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      reservations: [
        { id: uid("res"), createdAt: new Date().toISOString(), name, phone, email, location, date, time, partySize: size, notes, status: "pending" },
        ...prev.reservations,
      ],
    }));
    setDone(true);
  }

  return (
    <PageShell>
      <PageHero eyebrow="Book A Table" title="SAVE YOUR" accent="SEAT." description="Reservations open 30 days out. Walk-ins always welcome at the bar." />

      <section className="bg-[var(--cream)] pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          {done ? (
            <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-white"><Check size={28} /></div>
              <h2 className="text-display mt-6 text-3xl">YOU'RE BOOKED.</h2>
              <p className="mt-3 text-[var(--ink)]/70">Confirmation will be sent to {email}. We'll text you 1 hour before your seating.</p>
              <button onClick={() => { setDone(false); setName(""); setPhone(""); setEmail(""); setNotes(""); setDate(""); }} className="btn-ghost-cream mt-8">Book another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Location" icon={MapPin}>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent text-sm outline-none">
                    {locs.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </Field>
                <Field label="Date" icon={Calendar}>
                  <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
                </Field>
                <Field label="Party Size" icon={Users}>
                  <select value={size} onChange={(e) => setSize(+e.target.value)} className="w-full bg-transparent text-sm outline-none">
                    {sizes.map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                  </select>
                </Field>
                <Field label="Time" icon={Clock}>
                  <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-transparent text-sm outline-none">
                    {times.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40" />
                </Field>
                <Field label="Phone">
                  <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+233 24 000 0000" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Email">
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Special Requests">
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Birthday? High chair? Tell us." className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40" />
                  </Field>
                </div>
              </div>

              <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">Confirm Reservation</button>
              <p className="mt-4 text-xs text-[var(--ink)]/50">Parties of 12+ should book via <a href="/catering" className="text-[var(--primary)] underline">catering</a>.</p>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon?: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">{label}</span>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3">
        {Icon && <Icon size={16} className="shrink-0 text-[var(--primary)]" />}
        {children}
      </div>
    </label>
  );
}
