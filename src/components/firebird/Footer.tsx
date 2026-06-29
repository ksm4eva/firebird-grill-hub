import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoCream from "@/assets/firebird-logo-cream.png";

type Col = { title: string; items: { label: string; to: string }[] };

const cols: Col[] = [
  {
    title: "Menu",
    items: [
      { label: "Full Menu", to: "/menu" },
      { label: "Order Online", to: "/order" },
      { label: "Catering", to: "/catering" },
      { label: "Gift Cards", to: "/gift-cards" },
    ],
  },
  {
    title: "Visit",
    items: [
      { label: "Locations", to: "/locations" },
      { label: "Hours", to: "/hours" },
      { label: "Reservations", to: "/reservations" },
      { label: "Catering", to: "/catering" },
      { label: "Gift Cards", to: "/gift-cards" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Our Story", to: "/story" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Loyalty", to: "/loyalty" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logoCream} alt="Firebird" className="h-14 w-14" width={56} height={56} />
              <span className="text-display text-3xl tracking-wider">FIREBIRD</span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-[var(--cream)]/75">
              Flame-grilled burgers, crispy chicken & handcrafted sauces. Made bold, served hot.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[var(--accent)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <FooterCol key={c.title} col={c} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-widest text-[var(--cream)]/60">
            © {new Date().getFullYear()} Firebird Grill Co. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-widest text-[var(--cream)]/60">
            Bold Flavors. Fired Up.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ col }: { col: Col }) {
  return (
    <div>
      <h4 className="text-display text-lg tracking-wider text-white">{col.title}</h4>
      <ul className="mt-5 space-y-3">
        {col.items.map((it) => (
          <li key={it.label}>
            <Link
              to={it.to}
              className="text-sm text-[var(--cream)]/75 transition-colors hover:text-[var(--accent)]"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
