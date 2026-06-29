import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/firebird/PageShell";
import galleryInterior from "@/assets/gallery-interior.jpg";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations — FIREBIRD" },
      { name: "description", content: "Find a Firebird near you. 48 locations across the US." },
      { property: "og:title", content: "Locations — FIREBIRD" },
      { property: "og:image", content: galleryInterior },
    ],
  }),
  component: LocationsPage,
});

const locations = [
  { city: "Brooklyn", region: "NY", addr: "284 Wythe Ave, Brooklyn, NY 11249", phone: "(718) 555-0142", hours: "11am – 11pm Daily", flagship: true },
  { city: "Austin", region: "TX", addr: "1820 E 6th St, Austin, TX 78702", phone: "(512) 555-0188", hours: "11am – 12am Daily" },
  { city: "Los Angeles", region: "CA", addr: "8420 W Sunset Blvd, LA, CA 90069", phone: "(323) 555-0199", hours: "11am – 11pm Daily", flagship: true },
  { city: "Chicago", region: "IL", addr: "1535 N Milwaukee Ave, Chicago, IL 60622", phone: "(312) 555-0151", hours: "11am – 10pm Daily" },
  { city: "Miami", region: "FL", addr: "140 NE 39th St, Miami, FL 33137", phone: "(305) 555-0177", hours: "11am – 12am Daily" },
  { city: "Denver", region: "CO", addr: "2401 Larimer St, Denver, CO 80205", phone: "(720) 555-0133", hours: "11am – 10pm Daily" },
  { city: "Seattle", region: "WA", addr: "1424 11th Ave, Seattle, WA 98122", phone: "(206) 555-0166", hours: "11am – 10pm Daily" },
  { city: "Nashville", region: "TN", addr: "905 Gallatin Ave, Nashville, TN 37206", phone: "(615) 555-0122", hours: "11am – 12am Daily" },
];

function LocationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Find Firebird"
        title="48 KITCHENS."
        accent="ONE FIRE."
        description="From Brooklyn to LA, every Firebird grinds its own spice blend and brines chicken for 24 hours."
      />

      <section className="bg-[var(--cream)] pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <article
                key={l.city + l.region}
                className="card-lift relative overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-soft"
              >
                {l.flagship && (
                  <span className="absolute right-5 top-5 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Flagship
                  </span>
                )}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--cream)]">
                  <MapPin size={20} />
                </div>
                <h3 className="text-display mt-5 text-2xl tracking-wide">
                  {l.city}, <span className="text-[var(--primary)]">{l.region}</span>
                </h3>
                <p className="mt-3 text-sm text-[var(--ink)]/70">{l.addr}</p>
                <div className="mt-4 space-y-2 text-sm text-[var(--ink)]/70">
                  <p className="flex items-center gap-2"><Phone size={14} className="text-[var(--accent)]" /> {l.phone}</p>
                  <p className="flex items-center gap-2"><Clock size={14} className="text-[var(--accent)]" /> {l.hours}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link to="/order" className="btn-flame !py-2 !px-4 !text-xs">Order</Link>
                  <Link to="/reservations" className="btn-ghost-cream !py-2 !px-4 !text-xs">Reserve</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary)] py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-display text-3xl text-[var(--cream)] sm:text-4xl">
            DON'T SEE YOUR CITY? <span className="text-[var(--accent)]">WE'RE COMING.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--cream)]/80">
            New locations launching every quarter. Get notified when Firebird hits your neighborhood.
          </p>
          <Link to="/loyalty" className="btn-flame mt-6 inline-flex">
            Join Loyalty <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
