import { Instagram, Facebook, Twitter } from "lucide-react";
import logoCream from "@/assets/firebird-logo-cream.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logoCream.url} alt="Firebird" className="h-14 w-14" width={56} height={56} />
              <span className="text-display text-3xl tracking-wider">FIREBIRD</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--cream)]/75">
              Flame-grilled burgers, crispy chicken & handcrafted sauces.
              Made bold, served hot.
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

          <FooterCol
            title="Menu"
            items={["Burgers", "Chicken", "Wings", "Bowls", "Sides", "Drinks"]}
          />
          <FooterCol
            title="Visit"
            items={["Locations", "Hours", "Reservations", "Catering", "Gift Cards"]}
          />
          <FooterCol
            title="Company"
            items={["About", "Careers", "Press", "Loyalty", "Contact"]}
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
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

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-display text-lg tracking-wider text-white">{title}</h4>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="text-sm text-[var(--cream)]/75 transition-colors hover:text-[var(--accent)]">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
