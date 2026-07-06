import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf, Star, MapPin, Clock, Phone } from "lucide-react";

import { Navbar } from "@/components/firebird/Navbar";
import { Footer } from "@/components/firebird/Footer";
import { useAdmin } from "@/lib/adminStore";
import { formatGHS } from "@/lib/format";

import logoBlue from "@/assets/firebird-emblem-blue.png";
import logoCream from "@/assets/firebird-emblem-cream.png";
import heroBurger from "@/assets/hero-burger.jpg";
import heroBurgerLayers from "@/assets/hero-burger-layers.jpg.asset.json";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryGrill from "@/assets/gallery-grill.jpg";
import galleryFries from "@/assets/gallery-fries.jpg";
import galleryDessert from "@/assets/gallery-dessert.jpg";
import menuMocktail from "@/assets/menu-mocktail.jpg";
import wings from "@/assets/wings.jpg";

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
  const h = state.siteContent.hero;
  const featured = state.menuItems.find((i) => i.featured && i.available) ?? state.menuItems[0];

  return (
    <section id="home" className="relative overflow-hidden bg-[var(--primary)] pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Vibrant orange glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 30% 20%, #FF8A2B 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #FF6A00 0%, transparent 60%), var(--primary)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[600px] w-[600px] rounded-full blur-3xl opacity-50 animate-flame z-[1]" style={{ background: "radial-gradient(closest-side, #FFB347, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full blur-3xl opacity-30 z-[1]" style={{ background: "radial-gradient(closest-side, #FFD27A, transparent 70%)" }} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-6">
          <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-[var(--cream)]/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--cream)] backdrop-blur" style={{ ["--hero-delay" as string]: "1.5s" }}>
            <Flame size={14} className="text-[var(--accent)]" />
            {h.eyebrow}
          </div>

          <h1 className="text-display mt-6 text-5xl text-[var(--cream)] sm:text-7xl lg:text-[7.5rem] drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)]">
            <span className="hero-reveal inline-block" style={{ ["--hero-delay" as string]: "1.7s" }}>
              {h.titleLine1} <span className="text-[var(--accent)]">{h.titleAccent}</span>
            </span>
            <br />
            <span className="hero-reveal relative inline-block" style={{ ["--hero-delay" as string]: "1.95s" }}>
              {h.titleLine2}
              <span aria-hidden className="absolute -bottom-2 left-0 h-3 w-full rounded-full bg-[var(--accent)]" style={{ clipPath: "polygon(0 30%,100% 0,100% 70%,0 100%)" }} />
            </span>
          </h1>

          <p className="hero-reveal mt-7 max-w-xl text-base leading-relaxed text-[var(--cream)]/90 sm:text-lg" style={{ ["--hero-delay" as string]: "2.2s" }}>{h.subtitle}</p>

          <div className="hero-reveal mt-9 flex flex-wrap items-center gap-4" style={{ ["--hero-delay" as string]: "2.45s" }}>
            <Link to="/menu" className="btn-flame">View Menu <ArrowRight size={16} /></Link>
            <Link to="/order" className="btn-ghost-cream">Order Now</Link>
          </div>

          <div className="hero-reveal mt-12 flex flex-wrap items-center gap-8 text-xs uppercase tracking-widest text-[var(--cream)]/80" style={{ ["--hero-delay" as string]: "2.7s" }}>
            <Stat value="4.9★" label="2,400+ reviews" />
            <Divider />
            <Stat value="100%" label="Fresh daily" />
            <Divider />
            <Stat value="15 min" label="Avg. pickup" />
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="burger-stack relative mx-auto aspect-square w-full max-w-[620px]">
            <div aria-hidden className="absolute inset-6 rounded-full bg-[radial-gradient(closest-side,#FFD27A,transparent_70%)] blur-2xl opacity-70" />
            {/* Layer-by-layer 4K burger reveal */}
            {[
              { clip: "polygon(0 0, 100% 0, 100% 30%, 0 30%)", delay: "1.2s" },      // top bun + sesame
              { clip: "polygon(0 30%, 100% 30%, 100% 46%, 0 46%)", delay: "1.55s" }, // lettuce + tomato
              { clip: "polygon(0 46%, 100% 46%, 100% 62%, 0 62%)", delay: "1.9s" },  // cheese + top patty
              { clip: "polygon(0 62%, 100% 62%, 100% 80%, 0 80%)", delay: "2.25s" }, // bottom patty + cheese
              { clip: "polygon(0 80%, 100% 80%, 100% 100%, 0 100%)", delay: "2.6s" },// bottom bun
            ].map((l, i) => (
              <img
                key={i}
                src={heroBurgerLayers.url}
                alt=""
                aria-hidden={i > 0}
                width={2048}
                height={2048}
                className="burger-layer drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
                style={{ clipPath: l.clip, ["--layer-delay" as string]: l.delay }}
              />
            ))}
            {/* Accessible label layer (full image, invisible clip already covers) */}
            <img src={heroBurgerLayers.url} alt={featured?.name ?? "Firebird signature burger"} className="sr-only" />

            <div className="animate-hero-badge absolute right-[10%] top-[8%] z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--ink)] shadow-soft" style={{ ["--hero-delay" as string]: "3.1s" }}>
              <img src={logoCream} alt="" className="h-10 w-10" width={40} height={40} />
            </div>
            <div className="animate-hero-badge absolute -left-2 bottom-8 z-20 rounded-3xl bg-white/95 px-5 py-4 shadow-float backdrop-blur" style={{ ["--hero-delay" as string]: "3.3s" }}>
              <p className="text-[10px] uppercase tracking-widest text-[var(--ink)]/60">{featured?.tag ?? "Signature"}</p>
              <p className="text-display text-2xl text-[var(--primary)]">{formatGHS(featured?.price ?? 85)}</p>
            </div>
          </div>
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
  return (
    <section id="menu" className="bg-[var(--cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">The Lineup</p>
            <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-7xl">MENU<br /><span className="text-[var(--primary)]">HIGHLIGHTS.</span></h2>
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

const galleryShots = [
  { src: heroBurger, label: "Signature Burger", span: "lg:row-span-2" },
  { src: galleryGrill, label: "Open Flame" },
  { src: wings, label: "Suya Wings" },
  { src: galleryInterior, label: "The Room", span: "lg:col-span-2" },
  { src: menuMocktail, label: "Sobolo Spritz" },
  { src: galleryFries, label: "Waffle Fries" },
  { src: galleryDessert, label: "Sweet Heat" },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--primary)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Up Close</p>
          <h2 className="text-display mt-4 text-5xl text-[var(--cream)] sm:text-6xl lg:text-7xl">STRAIGHT<br />FROM THE <span className="text-[var(--accent)]">GRILL.</span></h2>
        </div>
        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[260px]">
          {galleryShots.map((g, i) => (
            <figure key={i} className={`img-zoom group relative overflow-hidden rounded-[1.75rem] bg-black/20 ${g.span ?? ""}`}>
              <img src={g.src} alt={g.label} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/90 via-[var(--primary)]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 translate-y-2 text-display text-lg text-[var(--cream)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{g.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { name: "Kwame A.", role: "Osu, Accra", quote: "The Firebird Burger ruined every other burger for me. That char, that sauce — it's not normal fast food." },
  { name: "Akosua M.", role: "Kumasi", quote: "The suya wings are insanity. I've ordered four times this week and have zero regrets. Sauce game is unreal." },
  { name: "Yaw B.", role: "East Legon, Accra", quote: "Fast casual that feels like a chef's kitchen. The jollof bowl is fresh, the chicken is crispy perfection." },
];

function Reviews() {
  return (
    <section id="reviews" className="bg-[var(--cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Word of Mouth</p>
          <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-7xl">WHAT OUR<br /><span className="text-[var(--primary)]">CUSTOMERS SAY.</span></h2>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article key={r.name} className="card-lift relative rounded-[2rem] bg-white p-8 shadow-soft animate-rise" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-1 text-[var(--accent)]">
                {Array.from({ length: 5 }).map((_, k) => (<Star key={k} size={18} fill="currentColor" strokeWidth={0} />))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-[var(--ink)]/80">"{r.quote}"</p>
              <p className="mt-6 text-display text-lg">{r.name}</p>
              <p className="text-xs uppercase tracking-widest text-[var(--ink)]/50">{r.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
