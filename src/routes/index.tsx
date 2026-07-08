import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf, Star, MapPin, Clock, Phone, Send } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Navbar } from "@/components/firebird/Navbar";
import { Footer } from "@/components/firebird/Footer";
import { useAdmin, uid } from "@/lib/adminStore";
import { formatGHS } from "@/lib/format";

import logoBlue from "@/assets/firebird-emblem-blue.png";
import heroBurger from "@/assets/hero-burger.jpg";
import heroBurgerOnly from "@/assets/hero-burger-only.png.asset.json";
// gallery assets are now sourced from the admin store

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIREBIRD — Bold Flavors. Fired Up. | Accra, Ghana" },
      { name: "description", content: "Flame-grilled burgers, crispy chicken, smoked wings & handcrafted sauces in Accra, Kumasi, Tema and more across Ghana." },
      { property: "og:title", content: "FIREBIRD — Bold Flavors. Fired Up." },
      { property: "og:description", content: "Flame-grilled burgers, crispy chicken, smoked wings — across Ghana." },
      { property: "og:image", content: heroBurger },
      { name: "twitter:image", content: heroBurger },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <MenuPreview />
        <Gallery />
        <Reviews />
        <CallToAction />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  const { state } = useAdmin();
  const featured = state.menuItems.find((i) => i.featured && i.available) ?? state.menuItems[0];

  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const burgerX = useTransform(sx, (v) => v * 20);
  const burgerY = useTransform(sy, (v) => v * 20);
  const burgerRotY = useTransform(sx, (v) => v * 6);
  const burgerRotX = useTransform(sy, (v) => v * -6);
  const juicyX = useTransform(sx, (v) => v * 8);
  const juicyY = useTransform(sy, (v) => v * 8);
  const particleX = useTransform(sx, (v) => v * 12);
  const particleY = useTransform(sy, (v) => v * 12);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mx.set(nx);
    my.set(ny);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    top: `${(i * 53) % 100}%`,
    left: `${(i * 37) % 100}%`,
    size: 3 + (i % 4) * 2,
    dx: `${((i % 5) - 2) * 40}px`,
    dy: `${-40 - (i % 6) * 30}px`,
    dur: `${6 + (i % 5) * 2}s`,
    delay: `${(i * 0.3) % 4}s`,
  }));

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="hero-v2 relative min-h-screen overflow-hidden flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Floating particles layer */}
      <motion.div
        aria-hidden
        style={{ x: particleX, y: particleY }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-particle"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              ["--dx" as string]: p.dx,
              ["--dy" as string]: p.dy,
              ["--dur" as string]: p.dur,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Giant JUICY word */}
      <motion.span
        aria-hidden
        style={{ x: juicyX, y: juicyY }}
        className="juicy-word z-[2]"
      >
        JUICY
      </motion.span>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-8 lg:px-10">
        {/* LEFT — content */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-white/90"
          >
            <span className="block h-px w-14 bg-white/80" />
            100% Premium Beef
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="font-bebas mt-6 text-white leading-[0.9] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          >
            BIG FLAVOR.
            <br />
            BIGGER
            <br />
            CRAVINGS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Crafted with premium ingredients, flame-grilled to perfection and packed with bold unforgettable flavor.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
            }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {[
              <Link key="reserve" to="/reservations" className="btn-primary-orange">
                Reserve a Table <ArrowRight size={16} />
              </Link>,
              <Link key="menu" to="/menu" className="btn-ghost-white">
                Explore Menu
              </Link>,
            ].map((child, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
            className="mt-10 flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-white/70"
          >
            <Stat value="4.9★" label="2,400+ reviews" />
            <Divider />
            <Stat value="100%" label="Fresh daily" />
            <Divider />
            <Stat value="15 min" label="Avg. pickup" />
          </motion.div>
        </div>

        {/* RIGHT — burger (shown FIRST on mobile so it's visible in the fold) */}
        <div className="relative order-1 flex items-center justify-center lg:order-2" style={{ perspective: 1200 }}>
          <motion.div
            style={{
              x: burgerX,
              y: burgerY,
              rotateY: burgerRotY,
              rotateX: burgerRotX,
              transformStyle: "preserve-3d",
            }}
            className="burger-v2-float relative mx-auto w-full max-w-[360px] sm:max-w-[520px] lg:max-w-[720px]"
          >
            <div aria-hidden className="absolute inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(255,210,122,0.55),transparent_70%)] blur-3xl" />
            <motion.img
              src={heroBurgerOnly.url}
              alt={featured?.name ?? "Firebird signature juicy double cheeseburger"}
              width={1920}
              height={1920}
              loading="eager"
              // @ts-expect-error fetchpriority is valid HTML but not yet in React types
              fetchpriority="high"
              decoding="async"
              className="burger-v2-enter relative z-10 w-full drop-shadow-[0_50px_60px_rgba(0,0,0,0.45)]"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-display text-2xl text-[var(--cream)] normal-case">{value}</span>
      <span>{label}</span>
    </div>
  );
}
function Divider() {
  return <span className="h-8 w-px bg-[var(--cream)]/25" />;
}

function Marquee() {
  const items = ["FLAME-GRILLED", "FRESH DAILY", "HANDCRAFTED SAUCES", "100% REAL", "FIRED UP", "BOLD FLAVORS", "SUYA WINGS", "MADE TO ORDER"];
  return (
    <div className="overflow-hidden border-y border-[var(--primary)]/15 bg-[var(--primary)] py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-12 text-[var(--cream)]">
            <span className="text-display text-2xl tracking-widest">{t}</span>
            <Flame size={20} className="text-[var(--accent)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { state } = useAdmin();
  const a = state.siteContent.about;
  return (
    <section id="about" className="relative overflow-hidden bg-[var(--primary)] py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(closest-side, #FF6A00, transparent 70%)" }} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="space-y-8">
          <div className="aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-[var(--cream)] p-12 shadow-float">
            <img src={logoBlue} alt="Firebird logo" className="h-full w-full object-contain" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: `${state.siteContent.timeline.length}+`, l: "Years grilling" },
              { v: String(state.locations.length), l: "Locations" },
              { v: "500K+", l: "Meals served" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-display text-2xl text-[var(--accent)]">{s.v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--cream)]/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Our Story</p>
          <h2 className="text-display mt-4 text-5xl text-[var(--cream)] sm:text-6xl lg:text-7xl">{a.headline}</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--cream)]/85">{a.body}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {a.bullets.map((p) => (
              <li key={p} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-[var(--cream)] backdrop-blur">
                <Leaf size={16} className="text-[var(--accent)] shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <Link to="/story" className="btn-flame mt-10">Learn More <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

function MenuPreview() {
  const { state } = useAdmin();
  const featured = state.menuItems.filter((i) => i.featured && i.available).slice(0, 4);
  const m = state.siteContent.menuHighlights;
  return (
    <section id="menu" className="bg-[var(--cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">{m.eyebrow}</p>
            <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-7xl">{m.titleLine1}<br /><span className="text-[var(--primary)]">{m.titleLine2}</span></h2>
          </div>
          <Link to="/menu" className="btn-primary">Full Menu <ArrowRight size={16} /></Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((it, i) => (
            <article key={it.id} className="card-lift img-zoom group relative overflow-hidden rounded-[2rem] bg-white shadow-soft animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="relative aspect-square overflow-hidden bg-[var(--cream)]">
                <img src={it.img ?? heroBurger} alt={it.name} width={800} height={800} loading="lazy" className="h-full w-full object-cover" />
                {it.tag && <span className="absolute left-4 top-4 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--cream)]">{it.tag}</span>}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-display text-xl tracking-wide">{it.name}</h3>
                  <span className="text-display text-xl text-[var(--accent)]">{formatGHS(it.price)}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/65">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { state } = useAdmin();
  const shots = state.gallery;
  const g = state.siteContent.gallery;
  const [firstWord, ...rest] = g.titleLine2.split(" ");
  const restOfLine = rest.join(" ");
  return (
    <section id="gallery" className="bg-[var(--primary)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">{g.eyebrow}</p>
          <h2 className="text-display mt-4 text-5xl text-[var(--cream)] sm:text-6xl lg:text-7xl">
            {g.titleLine1}<br />
            {firstWord ? `${firstWord} ` : ""}<span className="text-[var(--accent)]">{restOfLine || ""}</span>
          </h2>
        </div>
        {shots.length === 0 ? (
          <p className="mt-14 text-[var(--cream)]/70">No gallery shots yet.</p>
        ) : (
          <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[260px]">
            {shots.map((s) => (
              <figure key={s.id} className={`img-zoom group relative overflow-hidden rounded-[1.75rem] bg-black/20 ${s.span ?? ""}`}>
                <img src={s.src} alt={s.label} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/90 via-[var(--primary)]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-4 translate-y-2 text-display text-lg text-[var(--cream)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{s.label}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Reviews() {
  const { state, setState } = useAdmin();
  const r = state.siteContent.reviews;
  const featuredTestimonials = state.testimonials.filter((t) => t.featured);
  const featuredComments = state.comments.filter((c) => c.status === "approved" && c.featured);
  const items: { key: string; name: string; role: string; quote: string }[] = [
    ...featuredTestimonials.map((t) => ({ key: `t-${t.id}`, name: t.name, role: t.role, quote: t.quote })),
    ...featuredComments.map((c) => ({ key: `c-${c.id}`, name: c.name, role: c.location, quote: c.message })),
  ].slice(0, 6);

  return (
    <section id="reviews" className="bg-[var(--cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">{r.eyebrow}</p>
          <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-7xl">{r.titleLine1}<br /><span className="text-[var(--primary)]">{r.titleLine2}</span></h2>
        </div>
        {items.length > 0 && (
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {items.map((it, i) => (
              <article key={it.key} className="card-lift relative rounded-[2rem] bg-white p-8 shadow-soft animate-rise" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-1 text-[var(--accent)]">
                  {Array.from({ length: 5 }).map((_, k) => (<Star key={k} size={18} fill="currentColor" strokeWidth={0} />))}
                </div>
                <p className="mt-5 text-base leading-relaxed text-[var(--ink)]/80">"{it.quote}"</p>
                <p className="mt-6 text-display text-lg">{it.name}</p>
                <p className="text-xs uppercase tracking-widest text-[var(--ink)]/50">{it.role}</p>
              </article>
            ))}
          </div>
        )}
        <CommentForm onSubmit={(c) => setState((prev) => ({ ...prev, comments: [c, ...prev.comments] }))} />
      </div>
    </section>
  );
}

function CommentForm({ onSubmit }: { onSubmit: (c: import("@/lib/adminStore").CustomerComment) => void }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    onSubmit({
      id: uid("cmt"),
      createdAt: new Date().toISOString(),
      name: name.trim().slice(0, 80),
      location: location.trim().slice(0, 80),
      rating,
      message: message.trim().slice(0, 600),
      status: "pending",
      featured: false,
    });
    setName(""); setLocation(""); setRating(5); setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="mx-auto mt-20 max-w-2xl rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Share your experience</p>
        <h3 className="text-display mt-3 text-3xl text-[var(--ink)] sm:text-4xl">LEAVE A COMMENT.</h3>
        <p className="mt-2 text-sm text-[var(--ink)]/60">Your comment goes to our team. We may feature it here.</p>
      </div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Name</span>
            <input required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-[var(--cream)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
          </label>
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">City / Area</span>
            <input maxLength={80} value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-[var(--cream)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" placeholder="e.g. Osu, Accra" />
          </label>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Rating</span>
          <div className="mt-2 flex items-center gap-1">
            {[1,2,3,4,5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                <Star size={26} className={n <= rating ? "fill-[var(--accent)] text-[var(--accent)]" : "text-slate-300"} strokeWidth={n <= rating ? 0 : 1.5} />
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Your comment</span>
          <textarea required maxLength={600} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-[var(--cream)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" placeholder="Tell us about your Firebird experience…" />
        </label>
        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
          {sent ? (
            <p className="text-sm font-semibold text-emerald-600">Thanks! Your comment was sent to our team.</p>
          ) : <span />}
          <button type="submit" className="btn-flame"><Send size={14} /> Send comment</button>
        </div>
      </form>
    </div>
  );
}


function CallToAction() {
  return (
    <section className="bg-[var(--primary)] py-20 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-display text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">
          HUNGRY? <span className="text-[var(--accent)]">FIRE IT UP.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--cream)]/85">Order online for pickup or delivery across Accra in 30 minutes.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/order" className="btn-flame">Order Now <ArrowRight size={16} /></Link>
          <Link to="/menu" className="btn-ghost-cream">See Menu</Link>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  const { state } = useAdmin();
  const top = state.locations.slice(0, 3);
  return (
    <section id="contact" className="bg-[var(--cream)] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Find Firebird</p>
          <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl">VISIT <span className="text-[var(--primary)]">A KITCHEN.</span></h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {top.map((l) => (
            <article key={l.id} className="card-lift rounded-[1.75rem] bg-white p-6 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--primary)] text-[var(--cream)]"><MapPin size={20} /></div>
              <h3 className="text-display mt-4 text-2xl">{l.city} — {l.region}</h3>
              <p className="mt-2 text-sm text-[var(--ink)]/70">{l.addr}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-[var(--ink)]/70"><Phone size={14} className="text-[var(--accent)]" />{l.phone}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-[var(--ink)]/70"><Clock size={14} className="text-[var(--accent)]" />{l.hours}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/locations" className="btn-primary">All Locations <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
