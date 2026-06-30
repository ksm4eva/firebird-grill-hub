import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, uid, type Location } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/locations")({
  component: () => <AdminGate><LocationsAdmin /></AdminGate>,
});

const empty = (): Location => ({ id: uid("loc"), city: "", region: "", addr: "", phone: "+233 ", hours: "11am – 11pm Daily" });

function LocationsAdmin() {
  const { state, setState } = useAdmin();
  const [editing, setEditing] = useState<Location | null>(null);

  function save(l: Location) {
    setState((prev) => ({ ...prev, locations: prev.locations.some((x) => x.id === l.id) ? prev.locations.map((x) => (x.id === l.id ? l : x)) : [...prev.locations, l] }));
    setEditing(null);
  }
  function remove(id: string) {
    if (!confirm("Delete this location?")) return;
    setState((prev) => ({ ...prev, locations: prev.locations.filter((x) => x.id !== id) }));
  }

  return (
    <>
      <AdminPageHeader title="Locations" subtitle="Manage your Ghana branches.">
        <button onClick={() => setEditing(empty())} className="btn-flame !py-2 !px-4 !text-xs"><Plus size={14} /> New location</button>
      </AdminPageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.locations.map((l) => (
          <Card key={l.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-display text-xl">{l.city} <span className="text-[var(--primary)]">— {l.region}</span></p>
                {l.flagship && <span className="mt-1 inline-block rounded-full bg-[var(--accent)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">Flagship</span>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(l)} className="text-slate-500 hover:text-[var(--primary)]"><Edit2 size={16} /></button>
                <button onClick={() => remove(l.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">{l.addr}</p>
            <p className="mt-1 text-sm text-slate-600">{l.phone}</p>
            <p className="mt-1 text-xs text-slate-500">{l.hours}</p>
          </Card>
        ))}
      </div>

      {editing && <Editor loc={editing} onSave={save} onClose={() => setEditing(null)} />}
    </>
  );
}

function Editor({ loc, onSave, onClose }: { loc: Location; onSave: (l: Location) => void; onClose: () => void }) {
  const [d, setD] = useState(loc);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <form onSubmit={(e) => { e.preventDefault(); onSave(d); }} className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-float">
        <div className="flex items-center justify-between"><h3 className="text-display text-2xl">{loc.city ? "Edit location" : "New location"}</h3><button type="button" onClick={onClose}><X size={18} /></button></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <F l="City"><input required value={d.city} onChange={(e) => setD({ ...d, city: e.target.value })} className="ai" placeholder="Accra" /></F>
          <F l="Area / Region"><input required value={d.region} onChange={(e) => setD({ ...d, region: e.target.value })} className="ai" placeholder="Osu" /></F>
          <div className="sm:col-span-2"><F l="Address"><input required value={d.addr} onChange={(e) => setD({ ...d, addr: e.target.value })} className="ai" /></F></div>
          <F l="Phone"><input required value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} className="ai" placeholder="+233 24 555 0000" /></F>
          <F l="Hours"><input required value={d.hours} onChange={(e) => setD({ ...d, hours: e.target.value })} className="ai" /></F>
          <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={!!d.flagship} onChange={(e) => setD({ ...d, flagship: e.target.checked })} /> Flagship location</label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold uppercase tracking-widest">Cancel</button>
          <button type="submit" className="btn-flame !py-2 !px-5 !text-xs"><Save size={14} /> Save</button>
        </div>
        <style>{`.ai{width:100%;border:1px solid #e2e8f0;background:#f8fafc;border-radius:0.75rem;padding:0.625rem 0.875rem;font-size:0.875rem;outline:none}`}</style>
      </form>
    </div>
  );
}

function F({ l, children }: { l: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{l}</span><div className="mt-1">{children}</div></label>;
}
