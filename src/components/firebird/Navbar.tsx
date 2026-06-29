import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoBlue from "@/assets/firebird-logo-blue.png.asset.json";
import logoCream from "@/assets/firebird-logo-cream.png.asset.json";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--primary)] shadow-[0_10px_40px_-10px_rgba(17,71,209,0.45)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <img
            src={scrolled ? logoCream.url : logoBlue.url}
            alt="Firebird"
            className="h-12 w-12 object-contain"
            width={48}
            height={48}
          />
          <span
            className={`text-display text-2xl tracking-wider ${
              scrolled ? "text-[var(--cream)]" : "text-[var(--primary)]"
            }`}
          >
            FIREBIRD
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                scrolled
                  ? "text-[var(--cream)]/90 hover:text-white"
                  : "text-[var(--ink)]/80 hover:text-[var(--primary)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#order" className="hidden sm:inline-flex btn-flame !py-3 !px-6">
            Order Now
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden grid h-11 w-11 place-items-center rounded-full ${
              scrolled ? "bg-white/10 text-white" : "bg-[var(--primary)]/10 text-[var(--primary)]"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[var(--primary)] px-6 pb-6 pt-2">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold uppercase tracking-wider text-[var(--cream)] hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a href="#order" onClick={() => setOpen(false)} className="btn-flame mt-3">
              Order Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
