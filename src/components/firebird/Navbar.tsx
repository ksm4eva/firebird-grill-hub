import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoBlue from "@/assets/firebird-logo-blue.png.asset.json";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img
            src={logoBlue.url}
            alt="Firebird"
            className="h-10 w-10 object-contain"
            width={40}
            height={40}
          />
          <span className="text-display text-xl tracking-wider text-[var(--primary)]">
            FIREBIRD
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--ink)]/85 transition-colors hover:text-[var(--primary)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#order"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_8px_18px_-6px_rgba(255,106,0,0.6)] transition-transform hover:-translate-y-0.5"
          >
            Order Now
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mx-5 mt-2 rounded-2xl bg-[var(--primary)] p-4">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[var(--cream)] hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
