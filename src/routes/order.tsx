import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, ShoppingBag, MapPin, Clock, ArrowRight, Flame } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import heroBurger from "@/assets/hero-burger.jpg";
import wings from "@/assets/wings.jpg";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuBowl from "@/assets/menu-bowl.jpg";
import menuMocktail from "@/assets/menu-mocktail.jpg";
import galleryFries from "@/assets/gallery-fries.jpg";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — FIREBIRD" },
      { name: "description", content: "Order Firebird for pickup or delivery. Flame-grilled in 15 minutes." },
      { property: "og:title", content: "Order Online — FIREBIRD" },
      { property: "og:description", content: "Pickup or delivery in 15 minutes." },
    ],
  }),
  component: OrderPage,
});

type Product = { id: string; name: string; desc: string; price: number; img: string; category: string };

const products: Product[] = [
  { id: "fb-burger", name: "Firebird Burger", desc: "Double smash, aged cheddar, flame sauce.", price: 12.95, img: heroBurger, category: "Burgers" },
  { id: "inferno", name: "Inferno Double", desc: "Pepper jack, jalapeños, ghost-pepper aioli.", price: 13.5, img: heroBurger, category: "Burgers" },
  { id: "crispy", name: "Crispy Heat Chicken", desc: "24-hr brine, spicy aioli, pickles.", price: 10.5, img: menuChicken, category: "Chicken" },
  { id: "honey-bird", name: "Honey Bird", desc: "Crispy chicken, hot honey drizzle.", price: 10.95, img: menuChicken, category: "Chicken" },
  { id: "smoky", name: "Smoky Wings (6)", desc: "Slow-smoked, honey-buffalo glaze.", price: 11.25, img: wings, category: "Wings" },
  { id: "flame-w", name: "Flame Wings (10)", desc: "Cayenne, smoked paprika, garlic.", price: 16.5, img: wings, category: "Wings" },
  { id: "bowl", name: "Firebird Bowl", desc: "Grilled chicken, charred corn, avocado.", price: 13.75, img: menuBowl, category: "Bowls" },
  { id: "fries", name: "Waffle Fries", desc: "Crispy waffle-cut, sea salt.", price: 4.5, img: galleryFries, category: "Sides" },
  { id: "truffle", name: "Truffle Parm Fries", desc: "Shoestring, truffle, parm, chives.", price: 6.25, img: galleryFries, category: "Sides" },
  { id: "blaze", name: "Blaze Mocktail", desc: "Mango, lime, chili, ginger beer.", price: 5.95, img: menuMocktail, category: "Drinks" },
];

const categories = ["All", "Burgers", "Chicken", "Wings", "Bowls", "Sides", "Drinks"] as const;

type CartItem = { id: string; qty: number };

function OrderPage() {
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(
    () => (category === "All" ? products : products.filter((p) => p.category === category)),
    [category],
  );

  const cartCount = cart.reduce((n, c) => n + c.qty, 0);
  const subtotal = cart.reduce((s, c) => {
    const p = products.find((x) => x.id === c.id);
    return p ? s + p.price * c.qty : s;
  }, 0);
  const fee = mode === "delivery" ? 2.99 : 0;
  const tax = +(subtotal * 0.0875).toFixed(2);
  const total = +(subtotal + fee + tax).toFixed(2);

  function add(id: string) {
    setCart((c) => {
      const ex = c.find((i) => i.id === id);
      if (ex) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id, qty: 1 }];
    });
  }
  function dec(id: string) {
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  }
  function remove(id: string) {
    setCart((c) => c.filter((i) => i.id !== id));
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Order Online"
        title="FIRE UP"
        accent="YOUR ORDER."
        description="Pickup or delivery in 15 minutes. Built fresh, served hot."
      />

      {/* Mode + Address */}
      <section className="bg-[var(--cream)] pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="rounded-[1.75rem] bg-white p-5 shadow-soft sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="inline-flex rounded-full bg-[var(--cream)] p-1">
                {(["pickup", "delivery"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                      mode === m
                        ? "bg-[var(--primary)] text-[var(--cream)]"
                        : "text-[var(--ink)]/70"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3">
                <MapPin size={18} className="shrink-0 text-[var(--primary)]" />
                <input
                  type="text"
                  defaultValue={mode === "pickup" ? "Firebird — Brooklyn, NY" : "Enter delivery address"}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40"
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
                <Clock size={14} /> Ready in ~15 min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="sticky top-20 z-30 border-y border-[var(--primary)]/15 bg-[var(--cream)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                category === c
                  ? "bg-[var(--primary)] text-[var(--cream)]"
                  : "bg-white text-[var(--primary)] hover:bg-[var(--primary)]/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Layout */}
      <section className="bg-[var(--cream)] py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-10">
          {/* Product grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((p) => {
              const qty = cart.find((c) => c.id === p.id)?.qty ?? 0;
              return (
                <article key={p.id} className="card-lift overflow-hidden rounded-[1.5rem] bg-white shadow-soft">
                  <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-display text-lg tracking-wide">{p.name}</h3>
                      <span className="text-display text-lg text-[var(--accent)]">${p.price.toFixed(2)}</span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--ink)]/65">{p.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]">
                        {p.category}
                      </span>
                      {qty === 0 ? (
                        <button onClick={() => add(p.id)} className="btn-flame !py-2 !px-4 !text-xs">
                          <Plus size={14} /> Add
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-3 rounded-full bg-[var(--primary)] px-2 py-1 text-[var(--cream)]">
                          <button onClick={() => dec(p.id)} className="grid h-7 w-7 place-items-center rounded-full bg-white/15"><Minus size={14} /></button>
                          <span className="min-w-4 text-center text-sm font-bold">{qty}</span>
                          <button onClick={() => add(p.id)} className="grid h-7 w-7 place-items-center rounded-full bg-white/15"><Plus size={14} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Desktop cart */}
          <aside className="sticky top-36 hidden h-fit rounded-[1.75rem] bg-white p-6 shadow-soft lg:block">
            <CartPanel
              cart={cart}
              products={products}
              mode={mode}
              subtotal={subtotal}
              fee={fee}
              tax={tax}
              total={total}
              dec={dec}
              add={add}
              remove={remove}
            />
          </aside>
        </div>
      </section>

      {/* Mobile cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 lg:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="flex w-full items-center justify-between rounded-full bg-[var(--primary)] px-5 py-4 text-[var(--cream)] shadow-flame"
          >
            <span className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
              <ShoppingBag size={18} />
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
            <span className="text-display text-lg">${total.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Mobile cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-white p-6">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[var(--ink)]/15" />
            <CartPanel
              cart={cart}
              products={products}
              mode={mode}
              subtotal={subtotal}
              fee={fee}
              tax={tax}
              total={total}
              dec={dec}
              add={add}
              remove={remove}
            />
          </div>
        </div>
      )}
    </PageShell>
  );
}

function CartPanel(props: {
  cart: CartItem[];
  products: Product[];
  mode: "pickup" | "delivery";
  subtotal: number;
  fee: number;
  tax: number;
  total: number;
  add: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
}) {
  const { cart, products, mode, subtotal, fee, tax, total, add, dec, remove } = props;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-display text-2xl">Your Order</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
          <Flame size={12} /> {mode}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-[var(--cream)] p-8 text-center">
          <ShoppingBag className="mx-auto text-[var(--primary)]/50" size={32} />
          <p className="mt-3 text-sm text-[var(--ink)]/60">Your cart's empty. Add something fired up.</p>
        </div>
      ) : (
        <>
          <ul className="mt-5 divide-y divide-[var(--ink)]/10">
            {cart.map((c) => {
              const p = products.find((x) => x.id === c.id)!;
              return (
                <li key={c.id} className="flex items-center gap-3 py-3">
                  <img src={p.img} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-[var(--ink)]/60">${p.price.toFixed(2)}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-2 py-1">
                    <button onClick={() => dec(c.id)} className="grid h-6 w-6 place-items-center"><Minus size={12} /></button>
                    <span className="min-w-4 text-center text-xs font-bold">{c.qty}</span>
                    <button onClick={() => add(c.id)} className="grid h-6 w-6 place-items-center"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => remove(c.id)} aria-label="Remove" className="text-[var(--ink)]/40 hover:text-[var(--accent)]">
                    <Trash2 size={16} />
                  </button>
                </li>
              );
            })}
          </ul>

          <dl className="mt-5 space-y-2 border-t border-[var(--ink)]/10 pt-5 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            {fee > 0 && <Row label="Delivery fee" value={`$${fee.toFixed(2)}`} />}
            <Row label="Tax" value={`$${tax.toFixed(2)}`} />
            <Row label="Total" value={`$${total.toFixed(2)}`} bold />
          </dl>

          <button className="btn-primary mt-6 w-full">
            Checkout <ArrowRight size={16} />
          </button>
          <Link to="/menu" className="mt-3 block text-center text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
            ← Browse full menu
          </Link>
        </>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-display text-lg" : ""}`}>
      <dt className={bold ? "" : "text-[var(--ink)]/60"}>{label}</dt>
      <dd className={bold ? "text-[var(--accent)]" : ""}>{value}</dd>
    </div>
  );
}
