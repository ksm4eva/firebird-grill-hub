import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoBlue from "@/assets/firebird-emblem-blue.png";
import logoCream from "@/assets/firebird-emblem-cream.png";

const links = [
  { label: "Menu", to: "/menu" },
  { label: "Our Story", to: "/story" },
  { label: "Locations", to: "/locations" },
  { label: "Reservations", to: "/reservations" },
  { label: "Catering", to: "/catering" },
  { label: "Loyalty", to: "/loyalty" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        dark
          ? "bg-[var(--primary)] shadow-[0_10px_40px_-10px_rgba(17,71,209,0.45)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-24 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src={dark ? logoCream : logoBlue}
            alt="Firebird"
            className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
            width={80}
            height={80}
          />
          <span
            className={`text-display truncate text-xl tracking-wider sm:text-2xl ${
              dark ? "text-[var(--cream)]" : "text-[var(--primary)]"
            }`}
          >
            FIREBIRD
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`relative px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                dark
                  ? "text-[var(--cream)]/90 hover:text-white"
                  : "text-[var(--ink)]/80 hover:text-[var(--primary)]"
              }`}
              activeProps={{ className: "text-[var(--accent)]" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/order" className="hidden sm:inline-flex btn-flame !py-3 !px-5 !text-xs">
            Order Now
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden grid h-11 w-11 shrink-0 place-items-center rounded-full ${
              dark ? "bg-white/10 text-white" : "bg-[var(--primary)]/10 text-[var(--primary)]"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[var(--primary)] px-4 pb-6 pt-2 sm:px-6">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold uppercase tracking-wider text-[var(--cream)] hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/order"
              onClick={() => setOpen(false)}
              className="btn-flame mt-3"
            >
              Order Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
