import { Instagram, Facebook, Twitter, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoCream from "@/assets/firebird-logo-cream.png";
import { useAdmin } from "@/lib/adminStore";

type Col = { title: string; items: { label: string; to: string }[] };

const cols: Col[] = [
  { title: "Menu", items: [
    { label: "Full Menu", to: "/menu" },
    { label: "Order Online", to: "/order" },
    { label: "Catering", to: "/catering" },
    { label: "Gift Cards", to: "/gift-cards" },
  ] },
  { title: "Visit", items: [
    { label: "Locations", to: "/locations" },
    { label: "Hours", to: "/hours" },
    { label: "Reservations", to: "/reservations" },
  ] },
  { title: "Company", items: [
    { label: "About", to: "/about" },
    { label: "Our Story", to: "/story" },
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/press" },
    { label: "Loyalty", to: "/loyalty" },
  ] },
];

export function Footer() {
  const { state } = useAdmin();
  const s = state.settings;
  return (
    <footer className="bg-[var(--primary)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logoCream} alt={s.brandName} className="h-14 w-14" width={56} height={56} />
              <span className="text-display text-3xl tracking-wider">{s.brandName}</span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-[var(--cream)]/75">{s.footerBlurb}</p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: s.socialInstagram },
                { Icon: Facebook, href: s.socialFacebook },
                { Icon: Twitter, href: s.socialTwitter },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label="Social" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[var(--accent)]">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (<FooterCol key={c.title} col={c} />))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-widest text-[var(--cream)]/60">
            © {new Date().getFullYear()} {s.brandName} Grill Co. · Ghana. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-xs uppercase tracking-widest text-[var(--cream)]/60">{s.tagline}</p>
            <Link to="/admin" className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[var(--cream)]/40 hover:text-[var(--accent)]">
              <Shield size={11} /> Admin
            </Link>
          </div>
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
            <Link to={it.to} className="text-sm text-[var(--cream)]/75 transition-colors hover:text-[var(--accent)]">{it.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
