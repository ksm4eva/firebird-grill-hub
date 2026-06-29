import { Instagram, Facebook, Twitter } from "lucide-react";
import logoBlue from "@/assets/firebird-logo-blue.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-[var(--cream)] text-[var(--ink)] border-t border-[var(--ink)]/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src={logoBlue.url} alt="Firebird" className="h-10 w-10" width={40} height={40} />
              <span className="text-display text-xl tracking-wider text-[var(--primary)]">
                FIREBIRD
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[var(--ink)]/65">
              Bold flavors, fired up.
              <br />
              Come for the heat,
              <br />
              stay for the fire.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-9 w-9 place-items-center rounded-full bg-[var(--primary)] text-[var(--cream)] transition-colors hover:bg-[var(--accent)]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Quick Links"
            items={["Home", "Menu", "About", "Gallery", "Reviews", "Contact"]}
          />

          <div>
            <h4 className="text-display text-base tracking-wider text-[var(--primary)]">HOURS</h4>
            <ul className="mt-4 space-y-1.5 text-xs text-[var(--ink)]/75">
              <li className="flex justify-between gap-6"><span>Mon – Thu</span><span>11AM – 10PM</span></li>
              <li className="flex justify-between gap-6"><span>Fri – Sat</span><span>11AM – 12AM</span></li>
              <li className="flex justify-between gap-6"><span>Sunday</span><span>12PM – 9PM</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-display text-base tracking-wider text-[var(--primary)]">CONTACT</h4>
            <ul className="mt-4 space-y-1.5 text-xs text-[var(--ink)]/75">
              <li>123 Foothill Lane</li>
              <li>Brooksville, FL 33064</li>
              <li>555-456-7890</li>
              <li>hello@firebird.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--ink)]/10 pt-6 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[var(--ink)]/55">
            © {new Date().getFullYear()} Firebird. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-display text-base tracking-wider text-[var(--primary)]">
        {title.toUpperCase()}
      </h4>
      <ul className="mt-4 space-y-1.5">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="text-xs text-[var(--ink)]/75 transition-colors hover:text-[var(--accent)]">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
