import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { useDiamond } from "@/lib/diamondStore";

/* ---------- Lenis smooth scroll (client only) ---------- */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

/* ---------- Navigation ---------- */
const navLinks = [
  { label: "Home", to: "/diamond" as const, hash: "" },
  { label: "Apartments", to: "/diamond" as const, hash: "apartments" },
  { label: "Amenities", to: "/diamond" as const, hash: "amenities" },
  { label: "Gallery", to: "/diamond" as const, hash: "gallery" },
  { label: "Location", to: "/diamond" as const, hash: "location" },
  { label: "About", to: "/diamond" as const, hash: "about" },
  { label: "Contact", to: "/diamond" as const, hash: "contact" },
];

export function DiamondNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? "dc-glass py-3" : "bg-transparent py-6"
        }`}
        style={scrolled ? { boxShadow: "0 8px 32px -12px rgba(46, 49, 54, 0.15)" } : undefined}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            to="/diamond"
            className={`font-[family-name:var(--dc-serif)] text-2xl tracking-tight transition-colors duration-500 ${
              scrolled ? "text-[var(--dc-charcoal)]" : "text-white"
            }`}
          >
            <span className="font-light">Diamond</span>
            <span className="font-medium italic"> City</span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.hash ? `#${l.hash}` : "#top"}
                className={`dc-link text-[13px] font-medium tracking-widest uppercase transition-colors duration-500 ${
                  scrolled ? "text-[var(--dc-charcoal)]" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="#contact" className="dc-btn-dark">Book Tour</a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden ${scrolled ? "text-[var(--dc-charcoal)]" : "text-white"}`}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] lg:hidden"
            style={{ background: "rgba(46, 49, 54, 0.96)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-[family-name:var(--dc-serif)] text-2xl text-white">
                <span className="font-light">Diamond</span>
                <span className="font-medium italic"> City</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-white" aria-label="Close">
                <X size={28} />
              </button>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex flex-col items-center gap-8 px-6 pt-12"
            >
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.hash ? `#${l.hash}` : "#top"}
                  onClick={() => setOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                  className="font-[family-name:var(--dc-serif)] text-3xl text-white"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="dc-btn-primary mt-6"
              >
                Book Tour
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Footer ---------- */
export function DiamondFooter() {
  const { state } = useDiamond();
  return (
    <footer style={{ background: "var(--dc-charcoal)", color: "white" }} className="pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="font-[family-name:var(--dc-serif)] text-4xl">
              <span className="font-light">Diamond</span>
              <span className="font-medium italic"> City</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {state.content.aboutBody.split(".")[0]}.
            </p>
            <div className="mt-8 flex gap-3">
              <a href={state.content.instagramUrl} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-white/60 hover:bg-white/10">
                <Instagram size={16} />
              </a>
              <a href={state.content.facebookUrl} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-white/60 hover:bg-white/10">
                <Facebook size={16} />
              </a>
            </div>
          </div>
          <FooterCol title="Explore" links={[
            { label: "Apartments", href: "#apartments" },
            { label: "Amenities", href: "#amenities" },
            { label: "Gallery", href: "#gallery" },
            { label: "About", href: "#about" },
          ]} />
          <FooterCol title="Contact" links={[
            { label: state.content.contactPhone, href: `tel:${state.content.contactPhone}` },
            { label: state.content.contactEmail, href: `mailto:${state.content.contactEmail}` },
          ]} />
          <FooterCol title="Company" links={[
            { label: "Careers", href: "#" },
            { label: "Privacy", href: "#" },
            { label: "Admin", href: "/diamond/admin", internal: true },
          ]} />
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Diamond City. All rights reserved.</span>
          <span>{state.content.contactAddress}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string; internal?: boolean }[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">{title}</p>
      <ul className="mt-6 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            {l.internal ? (
              <Link to={l.href} className="text-white/80 transition hover:text-white">{l.label}</Link>
            ) : (
              <a href={l.href} className="text-white/80 transition hover:text-white">{l.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Ambient particles ---------- */
export function AmbientParticles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/40 dc-shimmer"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 5}s`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Reveal wrapper ---------- */
export function Reveal({ children, delay = 0, y = 40 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Counter ---------- */
export function Counter({ value }: { value: string }) {
  // For pure numbers count up, else display as-is
  const numMatch = value.match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(numMatch ? "0" + (numMatch[2] ?? "") : value);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!numMatch) return;
    const target = parseInt(numMatch[1]!, 10);
    const suffix = numMatch[2] ?? "";
    let started = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const duration = 1600;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(target * eased) + suffix);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numMatch, value]);
  return <span ref={ref}>{display}</span>;
}

/* ---------- Layout wrapper ---------- */
export function DiamondLayout({ children }: { children: ReactNode }) {
  useLenis();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/diamond/admin");

  return (
    <div className="diamond-root min-h-screen">
      {!isAdmin && <DiamondNav />}
      {children}
      {!isAdmin && <DiamondFooter />}
    </div>
  );
}
