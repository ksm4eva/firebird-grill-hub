import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, type Order } from "@/lib/adminStore";
import { formatGHS } from "@/lib/format";

export const Route = createFileRoute("/admin/orders")({
  component: () => <AdminGate><OrdersAdmin /></AdminGate>,
});

const statuses: Order["status"][] = ["new", "preparing", "ready", "completed", "cancelled"];

function OrdersAdmin() {
  const { state, setState } = useAdmin();
  const [filter, setFilter] = useState<Order["status"] | "all">("all");

  function setStatus(id: string, status: Order["status"]) {
    setState((prev) => ({ ...prev, orders: prev.orders.map((o) => o.id === id ? { ...o, status } : o) }));
  }
  function remove(id: string) {
    if (!confirm("Delete this order?")) return;
    setState((prev) => ({ ...prev, orders: prev.orders.filter((o) => o.id !== id) }));
  }

  const list = filter === "all" ? state.orders : state.orders.filter((o) => o.status === filter);

  return (
    <>
      <AdminPageHeader title="Orders" subtitle="Manage incoming pickup and delivery orders." />
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", ...statuses] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${filter === s ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--primary)] border border-slate-200"}`}>{s}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <Card><p className="text-center text-sm text-slate-500">No orders yet. Place a test order from the order page.</p></Card>
      ) : (
        <div className="grid gap-4">
          {list.map((o) => (
            <Card key={o.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-display text-xl">{o.customer.name}</p>
                  <p className="text-xs text-slate-500">{new Date(o.createdAt).toLocaleString()} · {o.customer.phone}</p>
                  <p className="mt-1 text-xs text-slate-500">{o.mode.toUpperCase()} · {o.payment.toUpperCase()}{o.address ? ` · ${o.address}` : ""}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value as Order["status"])} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => remove(o.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
              <ul className="mt-4 divide-y divide-slate-100 text-sm">
                {o.items.map((i) => (
                  <li key={i.id} className="flex justify-between py-2">
                    <span>{i.qty}× {i.name}</span>
                    <span className="font-semibold">{formatGHS(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-sm">
                <span className="text-slate-500">Subtotal {formatGHS(o.subtotal)} · Fee {formatGHS(o.fee)} · Tax {formatGHS(o.tax)}</span>
                <span className="text-display text-lg text-[var(--accent)]">{formatGHS(o.total)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
