import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, type Reservation } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/reservations")({
  component: () => <AdminGate><ResAdmin /></AdminGate>,
});

const statuses: Reservation["status"][] = ["pending", "confirmed", "cancelled"];

function ResAdmin() {
  const { state, setState } = useAdmin();
  function setStatus(id: string, status: Reservation["status"]) {
    setState((prev) => ({ ...prev, reservations: prev.reservations.map((r) => r.id === id ? { ...r, status } : r) }));
  }
  function remove(id: string) {
    if (!confirm("Delete?")) return;
    setState((prev) => ({ ...prev, reservations: prev.reservations.filter((r) => r.id !== id) }));
  }

  return (
    <>
      <AdminPageHeader title="Reservations" subtitle="Confirm or cancel incoming bookings." />
      {state.reservations.length === 0 ? (
        <Card><p className="text-center text-sm text-slate-500">No reservations yet.</p></Card>
      ) : (
        <div className="grid gap-4">
          {state.reservations.map((r) => (
            <Card key={r.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-display text-xl">{r.name}</p>
                  <p className="text-sm text-slate-600">{r.location} · party of {r.partySize}</p>
                  <p className="text-xs text-slate-500">{r.date} at {r.time} · {r.phone} · {r.email}</p>
                  {r.notes && <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs italic text-slate-600">"{r.notes}"</p>}
                </div>
                <div className="flex items-center gap-2">
                  <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value as Reservation["status"])} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => remove(r.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
