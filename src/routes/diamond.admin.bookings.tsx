import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { DiamondAdminGate, DcCard, DcHeader } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, type TourBooking } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/bookings")({
  component: () => <DiamondAdminGate><Bookings /></DiamondAdminGate>,
});

const statuses: TourBooking["status"][] = ["new", "contacted", "scheduled", "completed", "cancelled"];

function Bookings() {
  const { state, setState } = useDiamond();
  function setStatus(id: string, status: TourBooking["status"]) {
    setState((prev) => ({ ...prev, bookings: prev.bookings.map((b) => b.id === id ? { ...b, status } : b) }));
  }
  function remove(id: string) {
    if (!confirm("Delete this booking?")) return;
    setState((prev) => ({ ...prev, bookings: prev.bookings.filter((b) => b.id !== id) }));
  }
  return (
    <>
      <DcHeader title="Tour Bookings" subtitle="Follow up on private tour requests." />
      {state.bookings.length === 0 ? (
        <DcCard><p className="text-center text-sm text-[var(--dc-graphite)]">No bookings yet. Fill the form on the site to see one here.</p></DcCard>
      ) : (
        <div className="grid gap-4">
          {state.bookings.map((b) => (
            <DcCard key={b.id}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                <div className="min-w-0">
                  <p className="font-[family-name:var(--dc-serif)] text-xl italic">{b.name}</p>
                  <p className="text-xs text-[var(--dc-graphite)]">
                    {b.email} · {b.phone} · Tour date: {b.date}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="text-[var(--dc-aqua)]">Residence:</span> {b.apartment || "Any"}
                  </p>
                  {b.message && <p className="mt-2 rounded-xl bg-[var(--dc-concrete)]/20 p-3 text-xs italic text-[var(--dc-graphite)]">"{b.message}"</p>}
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-[var(--dc-concrete)]">Received {new Date(b.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <select value={b.status} onChange={(e) => setStatus(b.id, e.target.value as TourBooking["status"])} className="rounded-full border border-[var(--dc-concrete)]/40 bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => remove(b.id)} className="text-[var(--dc-graphite)] hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            </DcCard>
          ))}
        </div>
      )}
    </>
  );
}
