import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, uid } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/hours")({
  component: () => <AdminGate><HoursAdmin /></AdminGate>,
});

function HoursAdmin() {
  const { state, setState } = useAdmin();
  const [hours, setHours] = useState(state.hours);
  const [variants, setVariants] = useState(state.cityVariants);

  function save() {
    setState((prev) => ({ ...prev, hours, cityVariants: variants }));
    alert("Saved.");
  }
  function addVariant() {
    setVariants([...variants, { id: uid("v"), city: "", note: "" }]);
  }

  return (
    <>
      <AdminPageHeader title="Hours" subtitle="Edit standard hours (GMT) and local variations.">
        <button onClick={save} className="btn-flame !py-2 !px-4 !text-xs"><Save size={14} /> Save changes</button>
      </AdminPageHeader>

      <Card>
        <h3 className="text-display text-xl">Standard hours</h3>
        <ul className="mt-4 space-y-2">
          {hours.map((h, i) => (
            <li key={h.day} className="grid grid-cols-[100px_1fr_1fr_auto] items-center gap-3 rounded-xl bg-slate-50 p-3">
              <span className="font-semibold">{h.day}</span>
              <input type="time" value={to24(h.open)} disabled={h.closed} onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, open: from24(e.target.value) } : x))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" />
              <input type="time" value={to24(h.close)} disabled={h.closed} onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, close: from24(e.target.value) } : x))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" />
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={!!h.closed} onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, closed: e.target.checked } : x))} /> Closed</label>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-display text-xl">Local variations</h3>
          <button onClick={addVariant} className="btn-flame !py-1.5 !px-3 !text-[10px]"><Plus size={12} /> Add</button>
        </div>
        <ul className="mt-4 space-y-2">
          {variants.map((v) => (
            <li key={v.id} className="grid gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-[1fr_2fr_auto]">
              <input value={v.city} onChange={(e) => setVariants(variants.map((x) => x.id === v.id ? { ...x, city: e.target.value } : x))} placeholder="City — Branch" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" />
              <input value={v.note} onChange={(e) => setVariants(variants.map((x) => x.id === v.id ? { ...x, note: e.target.value } : x))} placeholder="Note" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" />
              <button onClick={() => setVariants(variants.filter((x) => x.id !== v.id))} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function to24(t: string): string {
  // Convert "11:00 AM" → "11:00"
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return t;
  let h = +m[1]; const min = m[2]; const p = m[3].toUpperCase();
  if (p === "PM" && h < 12) h += 12;
  if (p === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
}
function from24(t: string): string {
  const [hStr, m] = t.split(":");
  let h = +hStr;
  const p = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${m} ${p}`;
}
