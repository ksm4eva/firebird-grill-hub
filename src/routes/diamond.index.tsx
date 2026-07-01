import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Waves, Dumbbell, Baby, Car, Shield, TreePalm, Wifi, Zap,
  BedDouble, Bath, Ruler, MapPin, Phone, Mail, MessageCircle, X, ChevronLeft, ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useDiamond, dcUid, formatUsd, diamondImages, type Apartment } from "@/lib/diamondStore";
import { Reveal, Counter, AmbientParticles } from "@/components/diamond/DiamondShell";

export const Route = createFileRoute("/diamond/")({
  component: DiamondHome,
});

const iconMap: Record<string, LucideIcon> = {
  Waves, Dumbbell, Baby, Car, Shield, TreePalm, Wifi, Zap,
};

function DiamondHome() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Apartments />
      <Amenities />
      <Gallery />
      <Stats />
      <Testimonials />
      <Contact />
    </main>
  );
}

/* ================ HERO ================ */
function Hero() {
  const { state } = useDiamond();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [lines] = useState(state.content.heroTitle.split("\n"));

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={diamondImages.hero}
          alt="Diamond City residences"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
      <AmbientParticles />

      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-medium uppercase tracking-[0.5em] text-white/80"
        >
          {state.content.heroEyebrow}
        </motion.p>
        <h1 className="mt-8 font-[family-name:var(--dc-serif)] text-5xl leading-[1.02] sm:text-7xl lg:text-[7.5rem]">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8 + i * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="block font-light italic"
            >
              {line}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {state.content.heroSubtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#apartments" className="dc-btn-primary">Explore Apartments</a>
          <a href="#contact" className="dc-btn-ghost">Book a Tour</a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/70"
      >
        Scroll to explore ↓
      </motion.div>
    </section>
  );
}

/* ================ ABOUT ================ */
function About() {
  const { state } = useDiamond();
  return (
    <section id="about" className="relative bg-white py-32 lg:py-44">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal>
          <p className="dc-eyebrow">The Philosophy</p>
          <h2 className="mt-6 text-5xl font-light italic lg:text-6xl">{state.content.aboutHeadline}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg leading-relaxed text-[var(--dc-graphite)]">
            {state.content.aboutBody}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--dc-concrete)]/50 pt-10">
            {[
              { k: "Founded", v: "2019, Accra" },
              { k: "Architect", v: "Studio Osei" },
              { k: "Landscape", v: "Palm & Stone" },
              { k: "Award", v: "AAA Gold, 2024" },
            ].map((x) => (
              <div key={x.k}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--dc-concrete)]">{x.k}</p>
                <p className="mt-2 font-[family-name:var(--dc-serif)] text-xl italic">{x.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================ APARTMENTS ================ */
function Apartments() {
  const { state } = useDiamond();
  return (
    <section id="apartments" className="relative py-32 lg:py-44" style={{ background: "#F7F5F0" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="dc-eyebrow">The Residences</p>
            <h2 className="mt-6 text-5xl font-light italic lg:text-6xl">Curated for a quieter kind of luxury.</h2>
          </div>
        </Reveal>
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {state.apartments.filter((a) => a.available || a.featured).map((apt, i) => (
            <Reveal key={apt.id} delay={i * 0.08}>
              <ApartmentCard apt={apt} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApartmentCard({ apt }: { apt: Apartment }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-white"
      style={{ boxShadow: "0 20px 60px -30px rgba(46, 49, 54, 0.4)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={apt.image}
          alt={apt.name}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-5 top-5">
          <span className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${
            apt.available ? "bg-white/90 text-[var(--dc-charcoal)]" : "bg-[var(--dc-charcoal)]/85 text-white"
          }`}>
            {apt.available ? "Available" : "Reserved"}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="font-[family-name:var(--dc-serif)] text-2xl italic">{apt.name}</h3>
        <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-[var(--dc-graphite)]">
          {apt.description}
        </p>
        <div className="mt-6 flex items-center gap-5 text-xs text-[var(--dc-graphite)]">
          <span className="flex items-center gap-1.5"><BedDouble size={14} /> {apt.bedrooms || "Studio"}</span>
          <span className="flex items-center gap-1.5"><Bath size={14} /> {apt.bathrooms}</span>
          <span className="flex items-center gap-1.5"><Ruler size={14} /> {apt.sqft} sqft</span>
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-[var(--dc-concrete)]/40 pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">From</p>
            <p className="font-[family-name:var(--dc-serif)] text-3xl italic text-[var(--dc-charcoal)]">
              {formatUsd(apt.price)}<span className="text-sm not-italic text-[var(--dc-graphite)]"> /mo</span>
            </p>
          </div>
          <a href="#contact" className="dc-link text-xs font-medium uppercase tracking-widest text-[var(--dc-aqua)]">
            Inquire →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ================ AMENITIES ================ */
function Amenities() {
  const { state } = useDiamond();
  return (
    <section id="amenities" className="relative overflow-hidden py-32 lg:py-44" style={{ background: "var(--dc-charcoal)" }}>
      <div
        className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #18C4F8 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #739E52 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center text-white">
            <p className="dc-eyebrow" style={{ color: "#18C4F8" }}>Amenities</p>
            <h2 className="mt-6 text-5xl font-light italic lg:text-6xl">World-class, quietly delivered.</h2>
          </div>
        </Reveal>
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {state.amenities.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Waves;
            return (
              <Reveal key={a.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="dc-glass-dark h-full rounded-3xl p-8 text-white"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="grid h-14 w-14 place-items-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #18C4F8, #007FA6)" }}
                  >
                    <Icon size={22} className="text-white" />
                  </motion.div>
                  <h3 className="mt-6 font-[family-name:var(--dc-serif)] text-xl italic">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{a.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================ GALLERY (masonry + lightbox) ================ */
function Gallery() {
  const { state } = useDiamond();
  const [idx, setIdx] = useState<number | null>(null);
  const spans = [
    "row-span-2", "row-span-1", "row-span-1",
    "row-span-1", "row-span-2", "row-span-1", "row-span-1",
  ];
  return (
    <section id="gallery" className="relative bg-white py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="dc-eyebrow">Gallery</p>
              <h2 className="mt-6 text-5xl font-light italic lg:text-6xl">Moments in light.</h2>
            </div>
            <p className="max-w-md text-sm text-[var(--dc-graphite)]">
              Every surface, every reflection — a study in warmth and stillness.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          {state.gallery.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setIdx(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl ${spans[i % spans.length]}`}
              style={{ boxShadow: "0 12px 30px -20px rgba(46, 49, 54, 0.4)" }}
            >
              <img
                src={g.url}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white">{g.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {idx !== null && (
        <Lightbox
          images={state.gallery}
          index={idx}
          onClose={() => setIdx(null)}
          onNav={(delta) => setIdx((prev) => prev === null ? null : (prev + delta + state.gallery.length) % state.gallery.length)}
        />
      )}
    </section>
  );
}

function Lightbox({ images, index, onClose, onNav }: {
  images: { id: string; url: string; caption: string }[];
  index: number;
  onClose: () => void;
  onNav: (delta: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  const cur = images[index]!;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
        <X size={20} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8">
        <ChevronLeft size={22} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8">
        <ChevronRight size={22} />
      </button>
      <motion.img
        key={cur.id}
        src={cur.url}
        alt={cur.caption}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain"
      />
      <p className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-white/80">{cur.caption}</p>
    </motion.div>
  );
}

/* ================ STATS ================ */
function Stats() {
  const { state } = useDiamond();
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(135deg, #007FA6 0%, #2E3136 100%)" }}>
      <AmbientParticles />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-8 text-white sm:grid-cols-4">
          {state.stats.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-[family-name:var(--dc-serif)] text-5xl font-light italic lg:text-6xl">
                  <Counter value={s.value} />
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================ TESTIMONIALS ================ */
function Testimonials() {
  const { state } = useDiamond();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % state.testimonials.length), 6500);
    return () => clearInterval(id);
  }, [state.testimonials.length]);

  return (
    <section className="relative bg-white py-32 lg:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="dc-eyebrow">Residents</p>
          <h2 className="mt-6 text-4xl font-light italic lg:text-5xl">In their words.</h2>
        </Reveal>
        <div className="relative mt-16 h-64 sm:h-56">
          {state.testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={false}
              animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : 20 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="dc-glass absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-10 dc-float"
              style={{ pointerEvents: idx === i ? "auto" : "none" }}
            >
              <p className="font-[family-name:var(--dc-serif)] text-xl italic leading-relaxed text-[var(--dc-charcoal)] sm:text-2xl">
                "{t.quote}"
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-[var(--dc-aqua)]">
                {t.name} · {t.role}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {state.testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? "w-8 bg-[var(--dc-aqua)]" : "w-1.5 bg-[var(--dc-concrete)]"
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================ CONTACT ================ */
function Contact() {
  const { state, setState } = useDiamond();
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", apartment: "", message: "" });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      bookings: [
        { id: dcUid("bk"), createdAt: new Date().toISOString(), status: "new", ...form },
        ...prev.bookings,
      ],
    }));
    setSent(true);
    setForm({ name: "", email: "", phone: "", date: "", apartment: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <section id="contact" className="relative py-32 lg:py-44" style={{ background: "#F7F5F0" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="dc-eyebrow">Book Your Private Tour</p>
            <h2 className="mt-6 text-5xl font-light italic lg:text-6xl">A walk-through, by appointment.</h2>
            <p className="mt-6 text-[var(--dc-graphite)]">
              Our residence consultants will guide you through the property at your preferred pace.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="rounded-3xl bg-white p-8 sm:p-12" style={{ boxShadow: "0 20px 60px -30px rgba(46, 49, 54, 0.35)" }}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
                <Field label="Preferred Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} required />
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[var(--dc-concrete)]">Interested Residence</label>
                  <select
                    value={form.apartment}
                    onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                    className="mt-2 h-12 w-full rounded-xl border border-[var(--dc-concrete)]/40 bg-white px-4 text-sm outline-none transition focus:border-[var(--dc-aqua)]"
                  >
                    <option value="">Any residence</option>
                    {state.apartments.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[var(--dc-concrete)]">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-[var(--dc-concrete)]/40 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--dc-aqua)]"
                    placeholder="Tell us a little about what you're looking for."
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="submit" className="dc-btn-primary">Book Tour</button>
                <a
                  href={`https://wa.me/${state.content.contactWhatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--dc-palm)] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[var(--dc-palm)] transition hover:bg-[var(--dc-palm)] hover:text-white"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                {sent && <span className="text-xs text-[var(--dc-palm)]">✓ Booking sent — we'll be in touch.</span>}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full space-y-4">
              <div id="location" className="overflow-hidden rounded-3xl" style={{ boxShadow: "0 20px 60px -30px rgba(46, 49, 54, 0.35)" }}>
                <iframe
                  title="Diamond City map"
                  src={state.content.mapEmbedUrl}
                  className="h-80 w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <InfoTile icon={MapPin} label="Address" value={state.content.contactAddress} />
                <InfoTile icon={Phone} label="Phone" value={state.content.contactPhone} href={`tel:${state.content.contactPhone}`} />
                <InfoTile icon={Mail} label="Email" value={state.content.contactEmail} href={`mailto:${state.content.contactEmail}`} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-[var(--dc-concrete)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 h-12 w-full rounded-xl border border-[var(--dc-concrete)]/40 bg-white px-4 text-sm outline-none transition focus:border-[var(--dc-aqua)]"
      />
    </div>
  );
}

function InfoTile({ icon: Icon, label, value, href }: { icon: LucideIcon; label: string; value: string; href?: string }) {
  const Wrapper: any = href ? "a" : "div";
  return (
    <Wrapper href={href} className="block rounded-2xl bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg" style={{ boxShadow: "0 8px 24px -18px rgba(46, 49, 54, 0.35)" }}>
      <Icon size={18} className="text-[var(--dc-aqua)]" />
      <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[var(--dc-concrete)]">{label}</p>
      <p className="mt-1 text-sm text-[var(--dc-charcoal)]">{value}</p>
    </Wrapper>
  );
}
