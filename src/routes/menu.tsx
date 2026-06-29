import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import heroBurger from "@/assets/hero-burger.jpg";
import wings from "@/assets/wings.jpg";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuBowl from "@/assets/menu-bowl.jpg";
import menuMocktail from "@/assets/menu-mocktail.jpg";
import galleryFries from "@/assets/gallery-fries.jpg";
import galleryDessert from "@/assets/gallery-dessert.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Full Menu — FIREBIRD" },
      { name: "description", content: "Explore the full Firebird menu — flame-grilled burgers, crispy chicken, smoked wings, bowls, sides, drinks and dessert." },
      { property: "og:title", content: "Full Menu — FIREBIRD" },
      { property: "og:description", content: "Burgers, chicken, wings, bowls, sides, drinks & dessert." },
      { property: "og:image", content: heroBurger },
    ],
  }),
  component: MenuPage,
});

type Item = { name: string; desc: string; price: string; img?: string; tag?: string; veg?: boolean };
type Section = { id: string; title: string; tagline: string; items: Item[] };

const sections: Section[] = [
  {
    id: "burgers",
    title: "Burgers",
    tagline: "Smashed. Charred. Stacked.",
    items: [
      { name: "Firebird Burger", desc: "Double smash beef, aged cheddar, charred onion, signature flame sauce, brioche.", price: "$12.95", img: heroBurger, tag: "Signature" },
      { name: "Inferno Double", desc: "Two smash patties, pepper jack, jalapeños, ghost-pepper aioli, crispy onion.", price: "$13.50", tag: "Spicy" },
      { name: "Classic Smash", desc: "Single smash patty, American cheese, pickles, special sauce, soft brioche.", price: "$9.95" },
      { name: "Truffle & Char", desc: "Truffle aioli, gruyère, caramelized onion, arugula, smashed patty.", price: "$14.25" },
      { name: "Garden Smash", desc: "House black bean patty, smoked gouda, avocado, crisp lettuce, chipotle mayo.", price: "$11.50", veg: true },
    ],
  },
  {
    id: "chicken",
    title: "Chicken",
    tagline: "24-hour brine. Pure crunch.",
    items: [
      { name: "Crispy Heat Chicken", desc: "Buttermilk brined chicken, crisped golden, pickles, spicy aioli, brioche.", price: "$10.50", img: menuChicken, tag: "Spicy" },
      { name: "Nashville Hot", desc: "Cayenne-glazed crispy thigh, slaw, pickles, white bread.", price: "$11.25" },
      { name: "Honey Bird", desc: "Crispy chicken drizzled in hot honey, pickles, brioche.", price: "$10.95" },
      { name: "Tender Box (4)", desc: "Hand-breaded tenders served with your choice of two sauces.", price: "$9.95" },
    ],
  },
  {
    id: "wings",
    title: "Wings",
    tagline: "Slow-smoked, glazed hot.",
    items: [
      { name: "Smoky Wings (6)", desc: "Slow-smoked, tossed in honey-buffalo glaze.", price: "$11.25", img: wings, tag: "Fan favorite" },
      { name: "Flame Wings (10)", desc: "Cayenne, smoked paprika, garlic glaze. Heat that builds.", price: "$16.50" },
      { name: "Korean Gochujang (10)", desc: "Sticky-sweet gochujang, sesame, scallion.", price: "$16.95" },
      { name: "Lemon Pepper Char (10)", desc: "Bright, peppery, citrus. Charred edges.", price: "$15.50" },
    ],
  },
  {
    id: "bowls",
    title: "Bowls & Greens",
    tagline: "Fresh, fired, balanced.",
    items: [
      { name: "Firebird Bowl", desc: "Grilled chicken, charred corn, black beans, avocado, chipotle drizzle, rice.", price: "$13.75", img: menuBowl, tag: "Fresh", veg: false },
      { name: "Harvest Grain", desc: "Quinoa, roasted veg, kale, tahini-lemon, pickled onion.", price: "$12.25", veg: true },
      { name: "Smoked Caesar", desc: "Grilled romaine, smoked chicken, parm crisp, classic caesar.", price: "$12.95" },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    tagline: "Built for sharing.",
    items: [
      { name: "Waffle Fries", desc: "Crispy waffle-cut fries, sea salt.", price: "$4.50", img: galleryFries },
      { name: "Truffle Parm Fries", desc: "Shoestring, truffle oil, parmesan, chives.", price: "$6.25" },
      { name: "Mac & Char", desc: "Three-cheese mac, crisp char top.", price: "$5.95" },
      { name: "Charred Street Corn", desc: "Cotija, lime, smoky aioli, chili.", price: "$5.50", veg: true },
    ],
  },
  {
    id: "drinks",
    title: "Drinks & Mocktails",
    tagline: "Cool down the heat.",
    items: [
      { name: "Blaze Mocktail", desc: "Mango, lime, chili, ginger beer.", price: "$5.95", img: menuMocktail },
      { name: "Cucumber Cooler", desc: "Cucumber, mint, lime, soda.", price: "$5.50", veg: true },
      { name: "House Lemonade", desc: "Fresh-pressed, real lemon.", price: "$3.95" },
      { name: "Cold Brew", desc: "Slow-steeped 16hr cold brew.", price: "$4.25" },
    ],
  },
  {
    id: "dessert",
    title: "Sweet Heat",
    tagline: "Finish strong.",
    items: [
      { name: "Charred Banana Sundae", desc: "Grilled banana, vanilla, salted caramel, honeycomb.", price: "$7.50", img: galleryDessert },
      { name: "Brown Butter Cookie", desc: "Warm, salted, gooey center.", price: "$3.95" },
      { name: "Soft Serve Swirl", desc: "Vanilla & chocolate, hot honey drizzle.", price: "$4.95" },
    ],
  },
];

function MenuPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The Full Lineup"
        title="EVERY"
        accent="BITE."
        description="Hand-pressed, brined for 24 hours, flame-grilled to order. Browse the entire Firebird menu."
      />

      {/* Quick nav */}
      <div className="sticky top-20 z-30 -mt-2 border-y border-[var(--primary)]/15 bg-[var(--cream)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] shadow-sm transition-colors hover:bg-[var(--primary)] hover:text-[var(--cream)]"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {sections.map((sec, idx) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`${idx % 2 === 0 ? "bg-[var(--cream)]" : "bg-white"} py-16 sm:py-24`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  {sec.tagline}
                </p>
                <h2 className="text-display mt-3 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
                  {sec.title}
                </h2>
              </div>
              <Flame className="hidden text-[var(--accent)] sm:block" size={36} />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sec.items.map((it) => (
                <article
                  key={it.name}
                  className="card-lift group overflow-hidden rounded-[1.75rem] bg-white shadow-soft"
                >
                  {it.img && (
                    <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                      <img src={it.img} alt={it.name} loading="lazy" className="h-full w-full object-cover" />
                      {it.tag && (
                        <span className="absolute left-3 top-3 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--cream)]">
                          {it.tag}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-display text-lg tracking-wide sm:text-xl">{it.name}</h3>
                      <span className="text-display text-lg text-[var(--accent)] sm:text-xl">{it.price}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/65">{it.desc}</p>
                    {it.veg && (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[var(--primary)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]">
                        <Leaf size={12} /> Plant-based
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[var(--primary)] py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-display text-4xl text-[var(--cream)] sm:text-5xl">
            HUNGRY? <span className="text-[var(--accent)]">FIRE IT UP.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--cream)]/80">
            Order online for pickup or delivery in 15 minutes.
          </p>
          <Link to="/order" className="btn-flame mt-8 inline-flex">
            Order Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
