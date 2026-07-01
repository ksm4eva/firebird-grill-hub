import { createFileRoute } from "@tanstack/react-router";
import { DiamondAdminGate, DcCard, DcHeader } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, formatUsd } from "@/lib/diamondStore";
import { Home, Sparkles, Image as ImageIcon, CalendarCheck } from "lucide-react";

export const Route = createFileRoute("/diamond/admin/")({
  component: () => <DiamondAdminGate><Dashboard /></DiamondAdminGate>,
});

function Dashboard() {
  const { state } = useDiamond();
  const revenue = state.apartments.filter((a) => !a.available).reduce((sum, a) => sum + a.price, 0);
  const tiles = [
    { icon: Home, label: "Apartments", value: state.apartments.length, sub: `${state.apartments.filter((a) => a.available).length} available` },
    { icon: Sparkles, label: "Amenities", value: state.amenities.length, sub: "all live" },
    { icon: ImageIcon, label: "Gallery", value: state.gallery.length, sub: "images" },
    { icon: CalendarCheck, label: "New Tours", value: state.bookings.filter((b) => b.status === "new").length, sub: `${state.bookings.length} total` },
  ];
  return (
    <>
      <DcHeader title="Dashboard" subtitle="Overview of your Diamond City property." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <DcCard key={t.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">{t.label}</p>
                  <p className="mt-3 font-[family-name:var(--dc-serif)] text-4xl font-light italic text-[var(--dc-charcoal)]">{t.value}</p>
                  <p className="mt-1 text-xs text-[var(--dc-graphite)]">{t.sub}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--dc-charcoal)] text-white">
                  <Icon size={18} />
                </div>
              </div>
            </DcCard>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <DcCard>
          <h2 className="font-[family-name:var(--dc-serif)] text-2xl font-light italic">Monthly rental value</h2>
          <p className="mt-4 text-4xl font-light">{formatUsd(revenue)}</p>
          <p className="mt-2 text-sm text-[var(--dc-graphite)]">Sum of reserved residences (mock).</p>
        </DcCard>
        <DcCard>
          <h2 className="font-[family-name:var(--dc-serif)] text-2xl font-light italic">Recent tour bookings</h2>
          {state.bookings.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--dc-graphite)]">No bookings yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-[var(--dc-concrete)]/30">
              {state.bookings.slice(0, 5).map((b) => (
                <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{b.name}</p>
                    <p className="truncate text-xs text-[var(--dc-graphite)]">{b.apartment || "Any"} · {b.date}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--dc-concrete)]/25 px-3 py-1 text-[10px] uppercase tracking-widest">{b.status}</span>
                </li>
              ))}
            </ul>
          )}
        </DcCard>
      </div>
    </>
  );
}
