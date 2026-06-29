import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";

import { Navbar } from "@/components/firebird/Navbar";
import { Footer } from "@/components/firebird/Footer";

import logoBlue from "@/assets/firebird-logo-blue.png.asset.json";
import heroBurger from "@/assets/hero-burger.jpg";
import wings from "@/assets/wings.jpg";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuBowl from "@/assets/menu-bowl.jpg";
import menuMocktail from "@/assets/menu-mocktail.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryGrill from "@/assets/gallery-grill.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIREBIRD — Bold Flavors. Fired Up." },
      {
        name: "description",
        content:
          "Flame-grilled burgers, crispy chicken & handcrafted sauces. Bold flavors, fired up.",
      },
      { property: "og:title", content: "FIREBIRD — Bold Flavors. Fired Up." },
      { property: "og:description", content: "Flame-grilled. Fresh daily. Fired up." },
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
        <Story />
        <MenuPreview />
        <Gallery />
        <Reviews />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────── HERO ─────────────── */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[var(--cream)] pt-24 pb-10">
      {/* flame backdrop behind burger */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[420px] w-[420px] rounded-full blur-2xl opacity-70"
        style={{ background: "radial-gradient(closest-side, #FF6A00, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 sm:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            🔥 Flame-grilled since day one
          </span>

          <h1 className="text-display mt-4 text-5xl leading-[0.95] text-[var(--primary)] sm:text-6xl">
            BOLD FLAVORS.
            <br />
            FIRED UP.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--ink)]/70">
            Firebird brings the heat with smoky, spicy dishes made from the freshest
            ingredients.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--cream)] shadow-[0_8px_18px_-6px_rgba(17,71,209,0.5)] transition-transform hover:-translate-y-0.5"
            >
              View Menu
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-[var(--cream)]"
            >
              Order Now
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroBurger}
            alt="Firebird signature burger"
            width={1024}
            height={1024}
            className="relative z-10 mx-auto w-full max-w-md object-contain drop-shadow-[0_30px_40px_rgba(17,23,41,0.3)] animate-float"
          />
          <div className="absolute right-[12%] top-[6%] z-20 grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary)] shadow-md rotate-[8deg]">
            <img src={logoBlue.url} alt="" className="h-8 w-8 invert brightness-200" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── STORY ─────────────── */

function Story() {
  return (
    <section id="about" className="bg-[var(--primary)] py-10">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5">
          <div className="grid h-24 w-24 place-items-center rounded-2xl bg-[var(--cream)] p-3 sm:h-28 sm:w-28">
            <img src={logoBlue.url} alt="Firebird" className="h-full w-full object-contain" />
          </div>

          <div className="text-[var(--cream)]">
            <h2 className="text-display text-2xl tracking-wide sm:text-3xl">OUR STORY</h2>
            <p className="mt-2 max-w-md text-[11px] leading-relaxed text-[var(--cream)]/85 sm:text-xs">
              Born from a passion for fire-grilled perfection, Firebird is where bold flavors
              meet unforgettable experiences. Every dish is crafted to ignite your taste buds
              and keep you coming back.
            </p>
            <a
              href="#menu"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_6px_14px_-4px_rgba(255,106,0,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Learn More
            </a>
          </div>

          <div className="hidden sm:block">
            <img
              src={wings}
              alt="Smoky wings"
              className="h-28 w-36 rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MENU HIGHLIGHTS ─────────────── */

const menuItems = [
  { name: "Firebird Burger", desc: "Juicy grilled chicken, spicy mayo, slaw, pickles.", price: "$11.99", img: heroBurger },
  { name: "Smoky Wings", desc: "Tossed in our signature smoky fire sauce.", price: "$8.49", img: wings },
  { name: "Firebird Bowl", desc: "Grilled chicken, rice, slaw, beans, sauce.", price: "$10.99", img: menuBowl },
  { name: "Blaze Mocktail", desc: "Refreshing mix of citrus, berry, and a hint of spice.", price: "$4.99", img: menuMocktail },
];

function MenuPreview() {
  return (
    <section id="menu" className="bg-[var(--cream)] py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-display text-center text-3xl tracking-wide text-[var(--primary)] sm:text-4xl">
          MENU HIGHLIGHTS
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {menuItems.map((it, i) => (
            <article
              key={it.name}
              className="card-lift img-zoom group overflow-hidden rounded-2xl bg-white shadow-soft animate-rise"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                <img src={it.img} alt={it.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-display text-xs tracking-wide text-[var(--primary)]">
                  {it.name.toUpperCase()}
                </h3>
                <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-[var(--ink)]/60">
                  {it.desc}
                </p>
                <p className="text-display mt-2 text-sm text-[var(--accent)]">{it.price}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#order"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--cream)] shadow-[0_8px_18px_-6px_rgba(17,71,209,0.5)] transition-transform hover:-translate-y-0.5"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── GALLERY ─────────────── */

const galleryShots = [galleryGrill, heroBurger, menuBowl, galleryInterior];

function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--primary)] py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-display text-center text-3xl tracking-wide text-[var(--cream)] sm:text-4xl">
          GALLERY
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryShots.map((src, i) => (
            <div key={i} className="img-zoom overflow-hidden rounded-2xl bg-black/20">
              <img src={src} alt="" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--primary)] shadow-md transition-transform hover:-translate-y-0.5"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── REVIEWS ─────────────── */

const reviews = [
  { name: "Alex K.", quote: "The best grilled chicken I've ever had!" },
  { name: "Priya S.", quote: "Amazing flavors and great vibes!" },
  { name: "Jason M.", quote: "Spicy, smoky and absolutely delicious." },
];

function Reviews() {
  return (
    <section id="reviews" className="bg-[var(--cream)] py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-display text-center text-3xl tracking-wide text-[var(--primary)] sm:text-4xl">
          WHAT OUR CUSTOMERS SAY
        </h2>

        <div className="relative mt-8">
          <button
            aria-label="Previous"
            className="absolute -left-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--primary)] shadow-md transition-colors hover:bg-[var(--primary)] hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            className="absolute -right-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--primary)] shadow-md transition-colors hover:bg-[var(--primary)] hover:text-white"
          >
            <ChevronRight size={18} />
          </button>

          <div className="grid gap-4 px-6 sm:grid-cols-3">
            {reviews.map((r, i) => (
              <article
                key={r.name}
                className="rounded-2xl bg-white p-5 text-center shadow-soft animate-rise"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-center gap-0.5 text-[var(--accent)]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[var(--ink)]/80">
                  "{r.quote}"
                </p>
                <p className="text-display mt-3 text-xs tracking-wide text-[var(--primary)]">
                  — {r.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA ─────────────── */

function CallToAction() {
  return (
    <section id="order" className="bg-[var(--primary)] py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--cream)] p-2">
            <img src={logoBlue.url} alt="" className="h-full w-full object-contain" />
          </div>
          <div>
            <h2 className="text-display text-xl tracking-wide text-[var(--cream)] sm:text-2xl">
              READY TO FEEL THE HEAT?
            </h2>
            <p className="mt-1 text-[11px] text-[var(--cream)]/75">
              Order online or visit us in store
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            Order Now
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--cream)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--cream)] transition-colors hover:bg-[var(--cream)] hover:text-[var(--primary)]"
          >
            Find Us
          </a>
        </div>
      </div>
    </section>
  );
}
