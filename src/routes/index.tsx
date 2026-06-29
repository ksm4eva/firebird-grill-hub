import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf, Star, MapPin, Clock, Phone } from "lucide-react";

import { Navbar } from "@/components/firebird/Navbar";
import { Footer } from "@/components/firebird/Footer";

import logoBlue from "@/assets/firebird-logo-blue.png.asset.json";
import logoCream from "@/assets/firebird-logo-cream.png.asset.json";
import heroBurger from "@/assets/hero-burger.jpg";
import wings from "@/assets/wings.jpg";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuBowl from "@/assets/menu-bowl.jpg";
import menuMocktail from "@/assets/menu-mocktail.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryGrill from "@/assets/gallery-grill.jpg";
import galleryFries from "@/assets/gallery-fries.jpg";
import galleryDessert from "@/assets/gallery-dessert.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIREBIRD — Bold Flavors. Fired Up." },
      {
        name: "description",
        content:
          "Flame-grilled burgers, crispy chicken, smoked wings & handcrafted sauces. Luxury fast-casual, fired up.",
      },
      { property: "og:title", content: "FIREBIRD — Bold Flavors. Fired Up." },
      {
        property: "og:description",
        content:
          "Flame-grilled burgers, crispy chicken, smoked wings & handcrafted sauces.",
      },
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

/* ─────────────── HERO ─────────────── */

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[var(--cream)] pt-32 pb-16 lg:pt-40 lg:pb-24"
    >
      {/* abstract flame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[600px] w-[600px] rounded-full blur-3xl opacity-40 animate-flame"
        style={{ background: "radial-gradient(closest-side, #FF6A00, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(closest-side, #1147D1, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-6 animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] backdrop-blur">
            <Flame size={14} className="text-[var(--accent)]" />
            Flame-grilled since day one
          </div>

          <h1 className="text-display mt-6 text-5xl text-[var(--ink)] sm:text-7xl lg:text-[7.5rem]">
            BOLD <span className="text-[var(--primary)]">FLAVORS.</span>
            <br />
            <span className="relative inline-block">
              FIRED UP.
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-3 w-full rounded-full bg-[var(--accent)]"
                style={{ clipPath: "polygon(0 30%,100% 0,100% 70%,0 100%)" }}
              />
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--ink)]/75 sm:text-lg">
            Firebird brings the heat with flame-grilled burgers, crispy chicken,
            smoked wings, handcrafted sauces and unforgettable flavor — made from
            the freshest ingredients.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/menu" className="btn-primary">
              View Menu <ArrowRight size={16} />
            </Link>
            <Link to="/order" className="btn-ghost-cream">
              Order Now
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-8 text-xs uppercase tracking-widest text-[var(--ink)]/60">
            <Stat value="4.9★" label="2,400+ reviews" />
            <Divider />
            <Stat value="100%" label="Fresh daily" />
            <Divider />
            <Stat value="15 min" label="Avg. pickup" />
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            {/* flame backdrop */}
            <div
              aria-hidden
              className="absolute inset-6 rounded-full bg-gradient-flame opacity-90 blur-2xl animate-flame"
            />
            {/* burger */}
            <img
              src={heroBurger}
              alt="Firebird signature double cheeseburger"
              width={1280}
              height={1280}
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_40px_60px_rgba(17,23,41,0.35)] animate-float"
            />
            {/* floating flag */}
            <div
              className="absolute right-[18%] top-[14%] z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)] shadow-soft rotate-[8deg] animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <img
                src={logoCream.url}
                alt=""
                className="h-10 w-10"
                width={40}
                height={40}
              />
            </div>
            {/* price tag */}
            <div className="absolute -left-2 bottom-10 z-20 rounded-3xl bg-white/95 px-5 py-4 shadow-float backdrop-blur">
              <p className="text-[10px] uppercase tracking-widest text-[var(--ink)]/60">Signature</p>
              <p className="text-display text-2xl text-[var(--primary)]">$12.95</p>
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
      <span className="text-display text-2xl text-[var(--ink)] normal-case">{value}</span>
      <span>{label}</span>
    </div>
  );
}
function Divider() {
  return <span className="h-8 w-px bg-[var(--ink)]/15" />;
}

/* ─────────────── MARQUEE ─────────────── */

function Marquee() {
  const items = [
    "FLAME-GRILLED",
    "FRESH DAILY",
    "HANDCRAFTED SAUCES",
    "100% REAL INGREDIENTS",
    "FIRED UP",
    "BOLD FLAVORS",
    "SMOKED WINGS",
    "MADE TO ORDER",
  ];
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

/* ─────────────── ABOUT ─────────────── */

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[var(--primary)] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, #FF6A00, transparent 70%)" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="space-y-8">
          <div className="aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-[var(--cream)] p-12 shadow-float">
            <img src={logoCream.url} alt="Firebird logo" className="h-full w-full object-contain" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: "12+", l: "Years grilling" },
              { v: "48", l: "Locations" },
              { v: "1M+", l: "Meals served" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-display text-2xl text-[var(--accent)]">{s.v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--cream)]/70">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Our Story
          </p>
          <h2 className="text-display mt-4 text-5xl text-[var(--cream)] sm:text-6xl lg:text-7xl">
            BORN FROM
            <br />
            FIRE.
            <br />
            <span className="text-[var(--accent)]">RAISED ON FLAVOR.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--cream)]/85">
            Firebird started in a single brick oven kitchen with one obsession —
            real flame, real flavor. Every burger is hand-pressed, every chicken
            is brined for 24 hours, every sauce is made in-house. We don't cut
            corners. We crank up the heat.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Locally sourced beef & poultry",
              "Brioche baked fresh daily",
              "Open-flame mesquite grill",
              "Zero artificial anything",
            ].map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-[var(--cream)] backdrop-blur"
              >
                <Leaf size={16} className="text-[var(--accent)] shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          <Link to="/story" className="btn-flame mt-10">
            Learn More <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MENU PREVIEW ─────────────── */

const menuItems = [
  {
    name: "Firebird Burger",
    desc: "Double-stack smash beef, aged cheddar, charred onion, signature flame sauce.",
    price: "$12.95",
    img: heroBurger,
    tag: "Signature",
  },
  {
    name: "Crispy Heat Chicken",
    desc: "24-hr buttermilk brined chicken, crisped golden, pickles, spicy aioli.",
    price: "$10.50",
    img: menuChicken,
    tag: "Spicy",
  },
  {
    name: "Smoky Wings",
    desc: "Slow-smoked wings tossed in honey-buffalo glaze with char marks for days.",
    price: "$11.25",
    img: wings,
    tag: "Fan favorite",
  },
  {
    name: "Firebird Bowl",
    desc: "Grilled chicken, charred corn, black beans, avocado, chipotle drizzle.",
    price: "$13.75",
    img: menuBowl,
    tag: "Fresh",
  },
];

function MenuPreview() {
  return (
    <section id="menu" className="bg-[var(--cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              The Lineup
            </p>
            <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-7xl">
              MENU
              <br />
              <span className="text-[var(--primary)]">HIGHLIGHTS.</span>
            </h2>
          </div>
          <Link to="/menu" className="btn-primary">
            Full Menu <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((it, i) => (
            <article
              key={it.name}
              className="card-lift img-zoom group relative overflow-hidden rounded-[2rem] bg-white shadow-soft animate-rise"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--cream)]">
                <img
                  src={it.img}
                  alt={it.name}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--cream)]">
                  {it.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-display text-xl tracking-wide">{it.name}</h3>
                  <span className="text-display text-xl text-[var(--accent)]">{it.price}</span>
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

/* ─────────────── GALLERY ─────────────── */

const galleryShots = [
  { src: heroBurger, label: "Signature Burger", span: "lg:row-span-2" },
  { src: galleryGrill, label: "Open Flame" },
  { src: wings, label: "Smoky Wings" },
  { src: galleryInterior, label: "The Room", span: "lg:col-span-2" },
  { src: menuMocktail, label: "Blaze Mocktail" },
  { src: galleryFries, label: "Waffle Fries" },
  { src: galleryDessert, label: "Sweet Heat" },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--primary)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Up Close
          </p>
          <h2 className="text-display mt-4 text-5xl text-[var(--cream)] sm:text-6xl lg:text-7xl">
            STRAIGHT
            <br />
            FROM THE <span className="text-[var(--accent)]">GRILL.</span>
          </h2>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[260px]">
          {galleryShots.map((g, i) => (
            <figure
              key={i}
              className={`img-zoom group relative overflow-hidden rounded-[1.75rem] bg-black/20 ${g.span ?? ""}`}
            >
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/90 via-[var(--primary)]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 translate-y-2 text-display text-lg text-[var(--cream)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── REVIEWS ─────────────── */

const reviews = [
  {
    name: "Marcus T.",
    role: "Brooklyn, NY",
    quote:
      "The Firebird Burger ruined every other burger for me. That char, that sauce — it's not normal fast food. It's an experience.",
  },
  {
    name: "Priya K.",
    role: "Austin, TX",
    quote:
      "The smoky wings are insanity. I've ordered four times this week and I have zero regrets. Sauce game is unreal.",
  },
  {
    name: "Jordan L.",
    role: "Los Angeles, CA",
    quote:
      "Fast casual that feels like a chef's kitchen. The bowls are fresh, the chicken is crispy perfection. New favorite spot.",
  },
];

function Reviews() {
  return (
    <section id="reviews" className="bg-[var(--cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Word of Mouth
          </p>
          <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-7xl">
            WHAT OUR
            <br />
            <span className="text-[var(--primary)]">CUSTOMERS SAY.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className="card-lift relative rounded-[2rem] bg-white p-8 shadow-soft animate-rise"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-1 text-[var(--accent)]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-[var(--ink)]/85">
                "{r.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-[var(--ink)]/10 pt-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--primary)] text-display text-lg text-[var(--cream)]">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-display text-base tracking-wide">{r.name}</p>
                  <p className="text-xs uppercase tracking-widest text-[var(--ink)]/55">
                    {r.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA ─────────────── */

function CallToAction() {
  return (
    <section id="order" className="relative overflow-hidden bg-[var(--primary)] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(40% 60% at 50% 0%, rgba(255,106,0,0.4), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <img
          src={logoCream.url}
          alt="Firebird"
          className="mx-auto h-24 w-24 animate-float"
          width={96}
          height={96}
        />
        <h2 className="text-display mt-8 text-5xl text-[var(--cream)] sm:text-7xl lg:text-[8rem]">
          READY TO FEEL
          <br />
          <span className="text-[var(--accent)]">THE HEAT?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-[var(--cream)]/80 sm:text-lg">
          Pickup, delivery or dine-in — your next favorite meal is one click away.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/order" className="btn-flame">
            Order Now <ArrowRight size={16} />
          </Link>
          <Link
            to="/locations"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--cream)] bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-[var(--cream)] transition-all hover:bg-[var(--cream)] hover:text-[var(--primary)] hover:-translate-y-0.5"
          >
            Find Us
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── LOCATIONS ─────────────── */

const locations = [
  {
    city: "Brooklyn",
    addr: "412 Bedford Ave, Brooklyn NY 11211",
    hrs: "11am – 11pm Daily",
    phone: "(718) 555-0142",
  },
  {
    city: "Austin",
    addr: "2200 S Lamar Blvd, Austin TX 78704",
    hrs: "11am – 12am Daily",
    phone: "(512) 555-0188",
  },
  {
    city: "Los Angeles",
    addr: "8175 Melrose Ave, Los Angeles CA 90046",
    hrs: "11am – 11pm Daily",
    phone: "(323) 555-0167",
  },
];

function Locations() {
  return (
    <section id="locations" className="bg-[var(--cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Find Firebird
            </p>
            <h2 className="text-display mt-4 text-5xl text-[var(--ink)] sm:text-6xl lg:text-7xl">
              VISIT A <span className="text-[var(--primary)]">LOCATION.</span>
            </h2>
          </div>
          <Link to="/locations" className="btn-ghost-cream">
            All Locations
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <article
              key={loc.city}
              className="card-lift group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-soft animate-rise"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute right-6 top-6 opacity-10">
                <img src={logoBlue.url} alt="" className="h-20 w-20" width={80} height={80} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                Location {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-display mt-3 text-4xl tracking-wide text-[var(--primary)]">
                {loc.city}
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-[var(--ink)]/75">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                  {loc.addr}
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                  {loc.hrs}
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                  {loc.phone}
                </li>
              </ul>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--primary)] transition-colors hover:text-[var(--accent)]"
              >
                Get Directions <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
