import { createFileRoute } from "@tanstack/react-router";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin } from "@/lib/adminStore";
import { formatGHS } from "@/lib/format";
import { ShoppingBag, Calendar, Sparkles, UtensilsCrossed, MapPin, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: () => <AdminGate><Dashboard /></AdminGate>,
});

function Dashboard() {
  const { state } = useAdmin();
  const newOrders = state.orders.filter((o) => o.status === "new").length;
  const revenue = state.orders.reduce((s, o) => s + o.total, 0);
  const pendingRes = state.reservations.filter((r) => r.status === "pending").length;
  const newCat = state.cateringInquiries.filter((c) => c.status === "new").length;

  const stats = [
    { label: "Total Revenue", value: formatGHS(revenue), icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { label: "New Orders", value: newOrders, icon: ShoppingBag, color: "text-orange-600 bg-orange-50" },
    { label: "Pending Reservations", value: pendingRes, icon: Calendar, color: "text-blue-600 bg-blue-50" },
    { label: "Catering Inquiries", value: newCat, icon: Sparkles, color: "text-purple-600 bg-purple-50" },
    { label: "Menu Items", value: state.menuItems.length, icon: UtensilsCrossed, color: "text-pink-600 bg-pink-50" },
    { label: "Locations", value: state.locations.length, icon: MapPin, color: "text-indigo-600 bg-indigo-50" },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" subtitle="Overview of your Firebird operations across Ghana." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">{s.label}</p>
                <p className="text-display mt-2 text-3xl">{s.value}</p>
              </div>
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.color}`}><s.icon size={20} /></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-display text-xl">Recent Orders</h3>
          {state.orders.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No orders yet. Place one from the order page to see it here.</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {state.orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-semibold">{o.customer.name}</p>
                    <p className="text-xs text-slate-500">{o.items.length} items · {o.mode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-display text-lg text-[var(--accent)]">{formatGHS(o.total)}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{o.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <h3 className="text-display text-xl">Recent Reservations</h3>
          {state.reservations.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No reservations yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {state.reservations.slice(0, 5).map((r) => (
                <li key={r.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.location} · party of {r.partySize}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{r.date}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{r.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
