import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, ShoppingBag, MapPin, Clock, ArrowRight, Flame, Check } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import { useAdmin, uid, type Order } from "@/lib/adminStore";
import { formatGHS } from "@/lib/format";
import heroBurger from "@/assets/hero-burger.jpg";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — FIREBIRD Ghana" },
      { name: "description", content: "Order Firebird for pickup or delivery in Accra. Pay with MTN MoMo, Telecel Cash, card or cash." },
      { property: "og:title", content: "Order Online — FIREBIRD" },
    ],
  }),
  component: OrderPage,
});

type CartItem = { id: string; qty: number };

function OrderPage() {
  const { state, setState } = useAdmin();
  const products = state.menuItems.filter((i) => i.available);
  const sections = state.menuSections;

  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [category, setCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [placed, setPlaced] = useState<Order | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? products : products.filter((p) => p.sectionId === category)),
    [category, products],
  );

  const cartCount = cart.reduce((n, c) => n + c.qty, 0);
  const subtotal = cart.reduce((s, c) => {
    const p = products.find((x) => x.id === c.id);
    return p ? s + p.price * c.qty : s;
  }, 0);
  const fee = mode === "delivery" ? state.settings.deliveryFee : 0;
  const tax = +(subtotal * state.settings.taxRate).toFixed(2);
  const total = +(subtotal + fee + tax).toFixed(2);

  function add(id: string) {
    setCart((c) => {
      const ex = c.find((i) => i.id === id);
      if (ex) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id, qty: 1 }];
    });
  }
  function dec(id: string) {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0));
  }
  function remove(id: string) {
    setCart((c) => c.filter((i) => i.id !== id));
  }

  function placeOrder(form: { name: string; phone: string; payment: Order["payment"]; address?: string }) {
    const order: Order = {
      id: uid("ord"),
      createdAt: new Date().toISOString(),
      customer: { name: form.name, phone: form.phone },
      mode,
      payment: form.payment,
      address: form.address,
      items: cart.map((c) => {
        const p = products.find((x) => x.id === c.id)!;
        return { id: p.id, name: p.name, price: p.price, qty: c.qty };
      }),
      subtotal, fee, tax, total,
      status: "new",
    };
    setState((prev) => ({ ...prev, orders: [order, ...prev.orders] }));
    setPlaced(order);
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
  }

  if (placed) {
    return (
      <PageShell>
        <PageHero eyebrow="Order Placed" title="FIRED" accent="UP!" description={`Order ${placed.id} confirmed. We'll text ${placed.customer.phone} when it's ready.`} />
        <section className="bg-[var(--cream)] pb-20">
          <div className="mx-auto max-w-2xl px-6">
            <div className="rounded-[2rem] bg-white p-8 text-center shadow-soft">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-white"><Check size={28} /></div>
              <h2 className="text-display mt-6 text-3xl">Total {formatGHS(placed.total)}</h2>
              <p className="mt-2 text-sm text-[var(--ink)]/60">Payment: {placed.payment.toUpperCase()} · {placed.mode.toUpperCase()}</p>
              <button onClick={() => setPlaced(null)} className="btn-flame mt-8">Place another order</button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero eyebrow="Order Online" title="FIRE UP" accent="YOUR ORDER." description="Pickup or delivery across Accra in 30 minutes. Pay with MTN MoMo, Telecel Cash, card or cash." />

      <section className="bg-[var(--cream)] pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="rounded-[1.75rem] bg-white p-5 shadow-soft sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="inline-flex rounded-full bg-[var(--cream)] p-1">
                {(["pickup", "delivery"] as const).map((m) => (
                  <button key={m} onClick={() => setMode(m)} className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${mode === m ? "bg-[var(--primary)] text-[var(--cream)]" : "text-[var(--ink)]/70"}`}>{m}</button>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3">
                <MapPin size={18} className="shrink-0 text-[var(--primary)]" />
                <input type="text" defaultValue={mode === "pickup" ? `Firebird — ${state.locations[0]?.city}, ${state.locations[0]?.region}` : "Enter delivery address in Accra"} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink)]/40" />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)]"><Clock size={14} /> Ready in ~30 min</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-y border-[var(--primary)]/15 bg-[var(--cream)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10">
          {["All", ...sections.map((s) => s.id)].map((c) => {
            const label = c === "All" ? "All" : sections.find((s) => s.id === c)?.title ?? c;
            return (
              <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${category === c ? "bg-[var(--primary)] text-[var(--cream)]" : "bg-white text-[var(--primary)] hover:bg-[var(--primary)]/10"}`}>{label}</button>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--cream)] py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((p) => {
              const qty = cart.find((c) => c.id === p.id)?.qty ?? 0;
              return (
                <article key={p.id} className="card-lift overflow-hidden rounded-[1.5rem] bg-white shadow-soft">
                  <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                    <img src={p.img ?? heroBurger} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-display text-lg tracking-wide">{p.name}</h3>
                      <span className="text-display text-lg text-[var(--accent)]">{formatGHS(p.price)}</span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--ink)]/65">{p.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]">{sections.find((s) => s.id === p.sectionId)?.title}</span>
                      {qty === 0 ? (
                        <button onClick={() => add(p.id)} className="btn-flame !py-2 !px-4 !text-xs"><Plus size={14} /> Add</button>
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

          <aside className="sticky top-36 hidden h-fit rounded-[1.75rem] bg-white p-6 shadow-soft lg:block">
            <CartPanel cart={cart} mode={mode} subtotal={subtotal} fee={fee} tax={tax} total={total} dec={dec} add={add} remove={remove} onCheckout={() => setCheckoutOpen(true)} />
          </aside>
        </div>
      </section>

      {cartCount > 0 && !cartOpen && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 lg:hidden">
          <button onClick={() => setCartOpen(true)} className="flex w-full items-center justify-between rounded-full bg-[var(--primary)] px-5 py-4 text-[var(--cream)] shadow-flame">
            <span className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest"><ShoppingBag size={18} />{cartCount} {cartCount === 1 ? "item" : "items"}</span>
            <span className="text-display text-lg">{formatGHS(total)}</span>
          </button>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-white p-6">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[var(--ink)]/15" />
            <CartPanel cart={cart} mode={mode} subtotal={subtotal} fee={fee} tax={tax} total={total} dec={dec} add={add} remove={remove} onCheckout={() => setCheckoutOpen(true)} />
          </div>
        </div>
      )}

      {checkoutOpen && (
        <CheckoutModal onClose={() => setCheckoutOpen(false)} onSubmit={placeOrder} mode={mode} total={total} />
      )}
    </PageShell>
  );
}

function CartPanel(props: {
  cart: CartItem[]; mode: "pickup" | "delivery"; subtotal: number; fee: number; tax: number; total: number;
  add: (id: string) => void; dec: (id: string) => void; remove: (id: string) => void; onCheckout: () => void;
}) {
  const { state } = useAdmin();
  const { cart, mode, subtotal, fee, tax, total, add, dec, remove, onCheckout } = props;
  const products = state.menuItems;
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
                  <img src={p.img ?? heroBurger} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-[var(--ink)]/60">{formatGHS(p.price)}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-2 py-1">
                    <button onClick={() => dec(c.id)} className="grid h-6 w-6 place-items-center"><Minus size={12} /></button>
                    <span className="min-w-4 text-center text-xs font-bold">{c.qty}</span>
                    <button onClick={() => add(c.id)} className="grid h-6 w-6 place-items-center"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => remove(c.id)} aria-label="Remove" className="text-[var(--ink)]/40 hover:text-[var(--accent)]"><Trash2 size={16} /></button>
                </li>
              );
            })}
          </ul>

          <dl className="mt-5 space-y-2 border-t border-[var(--ink)]/10 pt-5 text-sm">
            <Row label="Subtotal" value={formatGHS(subtotal)} />
            {fee > 0 && <Row label="Delivery fee" value={formatGHS(fee)} />}
            <Row label={`Tax (${Math.round(state.settings.taxRate * 100)}%)`} value={formatGHS(tax)} />
            <Row label="Total" value={formatGHS(total)} bold />
          </dl>

          <button onClick={onCheckout} className="btn-primary mt-6 w-full">Checkout <ArrowRight size={16} /></button>
          <Link to="/menu" className="mt-3 block text-center text-xs font-bold uppercase tracking-widest text-[var(--primary)]">← Browse full menu</Link>
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

function CheckoutModal({ onClose, onSubmit, mode, total }: {
  onClose: () => void;
  onSubmit: (f: { name: string; phone: string; payment: Order["payment"]; address?: string }) => void;
  mode: "pickup" | "delivery";
  total: number;
}) {
  const { state } = useAdmin();
  const enabledPayments = state.settings.paymentMethods.filter((m) => m.enabled);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<Order["payment"]>(enabledPayments[0]?.id ?? "cash");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit({ name, phone, payment, address: mode === "delivery" ? address : undefined }); }}
        className="relative w-full max-w-md rounded-[2rem] bg-white p-6 shadow-float sm:p-8"
      >
        <h3 className="text-display text-2xl">Checkout</h3>
        <p className="mt-1 text-sm text-[var(--ink)]/60">Total due: <span className="font-bold text-[var(--accent)]">{formatGHS(total)}</span></p>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Full Name</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3 text-sm outline-none" />
          </label>
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Phone (+233)</span>
            <input required type="tel" placeholder="+233 24 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3 text-sm outline-none" />
          </label>
          {mode === "delivery" && (
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Delivery address</span>
              <input required value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3 text-sm outline-none" />
            </label>
          )}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Payment Method</span>
            <div className="mt-2 grid gap-2">
              {enabledPayments.map((m) => (
                <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${payment === m.id ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--ink)]/10"}`}>
                  <input type="radio" name="pay" checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-[var(--primary)]" />
                  <span className="font-semibold">{m.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-full border border-[var(--ink)]/15 px-5 py-3 text-xs font-bold uppercase tracking-widest">Cancel</button>
          <button type="submit" className="btn-flame flex-1 !py-3">Place Order</button>
        </div>
      </form>
    </div>
  );
}
