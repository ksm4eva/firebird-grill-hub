import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, type CateringInquiry } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/catering")({
  component: () => <AdminGate><CateringAdmin /></AdminGate>,
});

const statuses: CateringInquiry["status"][] = ["new", "contacted", "booked", "closed"];

function CateringAdmin() {
  const { state, setState } = useAdmin();
  function setStatus(id: string, status: CateringInquiry["status"]) {
    setState((prev) => ({ ...prev, cateringInquiries: prev.cateringInquiries.map((c) => c.id === id ? { ...c, status } : c) }));
  }
  function remove(id: string) {
    if (!confirm("Delete?")) return;
    setState((prev) => ({ ...prev, cateringInquiries: prev.cateringInquiries.filter((c) => c.id !== id) }));
  }

  return (
    <>
      <AdminPageHeader title="Catering Inquiries" subtitle="Follow up on event leads." />
      {state.cateringInquiries.length === 0 ? (
        <Card><p className="text-center text-sm text-slate-500">No inquiries yet.</p></Card>
      ) : (
        <div className="grid gap-4">
          {state.cateringInquiries.map((c) => (
            <Card key={c.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-display text-xl">{c.name}</p>
                  <p className="text-sm text-slate-600">{c.guests} guests · package: {c.packageType}</p>
                  <p className="text-xs text-slate-500">Event date: {c.eventDate} · {c.phone} · {c.email}</p>
                  {c.notes && <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs italic text-slate-600">"{c.notes}"</p>}
                </div>
                <div className="flex items-center gap-2">
                  <select value={c.status} onChange={(e) => setStatus(c.id, e.target.value as CateringInquiry["status"])} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => remove(c.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
