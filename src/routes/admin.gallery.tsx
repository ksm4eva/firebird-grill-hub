import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, uid, type GalleryShot } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/gallery")({
  component: () => <AdminGate><GalleryAdmin /></AdminGate>,
});

const SPAN_OPTIONS: { value: NonNullable<GalleryShot["span"]>; label: string }[] = [
  { value: "", label: "Normal" },
  { value: "lg:col-span-2", label: "Wide (2 cols)" },
  { value: "lg:row-span-2", label: "Tall (2 rows)" },
];

async function fileToDataUrl(f: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = rej;
    r.readAsDataURL(f);
  });
}

function GalleryAdmin() {
  const { state, setState } = useAdmin();
  const [newLabel, setNewLabel] = useState("");

  function move(id: string, dir: -1 | 1) {
    setState((prev) => {
      const arr = [...prev.gallery];
      const i = arr.findIndex((s) => s.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return prev;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...prev, gallery: arr };
    });
  }
  function remove(id: string) {
    if (!confirm("Delete this gallery shot?")) return;
    setState((prev) => ({ ...prev, gallery: prev.gallery.filter((s) => s.id !== id) }));
  }
  function update(id: string, patch: Partial<GalleryShot>) {
    setState((prev) => ({ ...prev, gallery: prev.gallery.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
  }
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 1_500_000) { alert("Image too large. Please pick under 1.5 MB."); e.target.value = ""; return; }
    const src = await fileToDataUrl(f);
    setState((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { id: uid("g"), src, label: newLabel.trim() || "Untitled", span: "" }],
    }));
    setNewLabel("");
    e.target.value = "";
  }

  return (
    <>
      <AdminPageHeader title="Gallery" subtitle='Manage images shown in the homepage "Straight from the Grill" section.' />

      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <label className="block flex-1 min-w-[200px]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">New shot label</span>
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Signature Burger" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" />
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
            <Plus size={14} /> Upload image
            <input type="file" accept="image/*" onChange={upload} className="sr-only" />
          </label>
        </div>
        <p className="mt-2 text-xs text-slate-500">Max ~1.5 MB per image. Uploads are stored locally in this browser.</p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.gallery.length === 0 && (
          <Card className="sm:col-span-2 lg:col-span-3 text-center text-slate-500">No gallery shots yet.</Card>
        )}
        {state.gallery.map((s, idx) => (
          <Card key={s.id} className="!p-3">
            <div className="aspect-video overflow-hidden rounded-xl bg-slate-100">
              <img src={s.src} alt={s.label} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 space-y-2">
              <input value={s.label} onChange={(e) => update(s.id, { label: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" placeholder="Label" />
              <select value={s.span ?? ""} onChange={(e) => update(s.id, { span: e.target.value as GalleryShot["span"] })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
                {SPAN_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="flex items-center justify-between text-xs">
                <div className="flex gap-1">
                  <button onClick={() => move(s.id, -1)} disabled={idx === 0} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30"><ArrowUp size={14} /></button>
                  <button onClick={() => move(s.id, 1)} disabled={idx === state.gallery.length - 1} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30"><ArrowDown size={14} /></button>
                </div>
                <button onClick={() => remove(s.id)} className="inline-flex items-center gap-1 text-red-600 hover:underline"><Trash2 size={12} /> Delete</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
