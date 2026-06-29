import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Gift, Mail, Check } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import logoCream from "@/assets/firebird-logo-cream.png.asset.json";

export const Route = createFileRoute("/gift-cards")({
  head: () => ({
    meta: [
      { title: "Gift Cards — FIREBIRD" },
      { name: "description", content: "Send the gift of fire. Digital and physical Firebird gift cards, $10 to $500." },
      { property: "og:title", content: "Gift Cards — FIREBIRD" },
    ],
  }),
  component: GiftCardsPage,
});

const amounts = [25, 50, 75, 100, 150, 250];

function GiftCardsPage() {
  const [amount, setAmount] = useState(50);
  const [type, setType] = useState<"digital" | "physical">("digital");
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHero
        eyebrow="Gift Cards"
        title="SEND THE"
        accent="FIRE."
        description="The best gift since the burger itself. Digital cards delivered instantly, physical cards shipped free."
      />

      <section className="bg-[var(--cream)] pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          {/* Preview */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-32">
              <div className="relative aspect-[1.6/1] overflow-hidden rounded-[2rem] bg-gradient-blue p-8 shadow-float">
                <div className="absolute inset-0 bg-gradient-flame opacity-20" />
                <div className="relative flex h-full flex-col justify-between text-[var(--cream)]">
                  <div className="flex items-center justify-between">
                    <img src={logoCream.url} alt="" className="h-12 w-12" />
                    <Gift size={24} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-70">Firebird Gift Card</p>
                    <p className="text-display mt-2 text-6xl">${amount}</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs uppercase tracking-widest text-[var(--ink)]/50">
                {type === "digital" ? "Delivered by email" : "Ships free in 3–5 days"}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2">
            {sent ? (
              <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-white">
                  <Check size={28} />
                </div>
                <h2 className="text-display mt-6 text-3xl">GIFT SENT.</h2>
                <p className="mt-3 text-[var(--ink)]/70">Your recipient will get their card shortly.</p>
                <button onClick={() => setSent(false)} className="btn-ghost-cream mt-8">Send another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Card Type</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {(["digital", "physical"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                        type === t
                          ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--cream)]"
                          : "border-[var(--ink)]/10 bg-[var(--cream)] text-[var(--ink)]/70"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">Amount</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {amounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAmount(a)}
                      className={`rounded-2xl border-2 px-4 py-3 text-display text-xl transition-all ${
                        amount === a
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-[var(--ink)]/10 bg-[var(--cream)]"
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Inp label="Your name" placeholder="From" />
                  <Inp label="Recipient name" placeholder="To" />
                  <Inp label="Recipient email" type="email" placeholder="them@email.com" />
                  <Inp label={type === "physical" ? "Shipping address" : "Delivery date"} type={type === "physical" ? "text" : "date"} placeholder="123 Flame St" />
                  <div className="sm:col-span-2">
                    <Inp label="Personal message" placeholder="Add a note (optional)" required={false} />
                  </div>
                </div>

                <button type="submit" className="btn-primary mt-8 w-full">
                  <Mail size={16} /> Send ${amount} Gift
                </button>
                <p className="mt-3 text-center text-xs text-[var(--ink)]/50">No fees. Never expires.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Inp({ label, type = "text", placeholder, required = true }: { label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/60">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)] px-4 py-3 text-sm outline-none placeholder:text-[var(--ink)]/40 focus:border-[var(--primary)]"
      />
    </label>
  );
}
