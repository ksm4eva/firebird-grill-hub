import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Edit2, Save, X, Star } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, uid, type MenuItem } from "@/lib/adminStore";
import { formatGHS } from "@/lib/format";

export const Route = createFileRoute("/admin/menu")({
  component: () => <AdminGate><MenuAdmin /></AdminGate>,
});

function emptyItem(sectionId: string): MenuItem {
  return { id: uid("itm"), sectionId, name: "", desc: "", price: 0, available: true, featured: false };
}

function MenuAdmin() {
  const { state, setState } = useAdmin();
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [activeSec, setActiveSec] = useState(state.menuSections[0]?.id ?? "");

  function save(item: MenuItem) {
    setState((prev) => {
      const exists = prev.menuItems.some((i) => i.id === item.id);
      return { ...prev, menuItems: exists ? prev.menuItems.map((i) => (i.id === item.id ? item : i)) : [...prev.menuItems, item] };
    });
    setEditing(null);
  }
  function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    setState((prev) => ({ ...prev, menuItems: prev.menuItems.filter((i) => i.id !== id) }));
  }
  function toggle(id: string, key: "available" | "featured") {
    setState((prev) => ({ ...prev, menuItems: prev.menuItems.map((i) => (i.id === id ? { ...i, [key]: !i[key] } : i)) }));
  }

  const items = state.menuItems.filter((i) => i.sectionId === activeSec);

  return (
    <>
      <AdminPageHeader title="Menu" subtitle="Add, edit, remove items. Toggle availability and featured status.">
        <button onClick={() => setEditing(emptyItem(activeSec))} className="btn-flame !py-2 !px-4 !text-xs"><Plus size={14} /> New item</button>
      </AdminPageHeader>

      <div className="mb-4 flex flex-wrap gap-2">
        {state.menuSections.map((s) => (
          <button key={s.id} onClick={() => setActiveSec(s.id)} className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${activeSec === s.id ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--primary)] border border-slate-200"}`}>{s.title}</button>
        ))}
      </div>

      <Card className="overflow-x-auto !p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-[10px] uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Tag</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No items in this section yet.</td></tr>
            )}
            {items.map((it) => (
              <tr key={it.id}>
                <td className="px-4 py-3">
                  <p className="font-semibold">{it.name}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{it.desc}</p>
                </td>
                <td className="px-4 py-3 font-semibold">{formatGHS(it.price)}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{it.tag ?? "—"}</td>
                <td className="px-4 py-3"><Switch on={it.available} onClick={() => toggle(it.id, "available")} /></td>
                <td className="px-4 py-3"><button onClick={() => toggle(it.id, "featured")}><Star size={16} className={it.featured ? "fill-amber-400 text-amber-400" : "text-slate-300"} /></button></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(it)} className="mr-2 text-slate-500 hover:text-[var(--primary)]"><Edit2 size={16} /></button>
                  <button onClick={() => remove(it.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {editing && <ItemEditor item={editing} onSave={save} onClose={() => setEditing(null)} sections={state.menuSections} />}
    </>
  );
}

function Switch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-emerald-500" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
    </button>
  );
}

function ItemEditor({ item, onSave, onClose, sections }: { item: MenuItem; onSave: (i: MenuItem) => void; onClose: () => void; sections: { id: string; title: string }[] }) {
  const [draft, setDraft] = useState(item);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <form onSubmit={(e) => { e.preventDefault(); onSave(draft); }} className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-float">
        <div className="flex items-center justify-between">
          <h3 className="text-display text-2xl">{item.name ? "Edit item" : "New item"}</h3>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="Name"><input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="input" /></Field>
          <Field label="Price (₵)"><input required type="number" step="0.01" value={draft.price} onChange={(e) => setDraft({ ...draft, price: +e.target.value })} className="input" /></Field>
          <div className="sm:col-span-2"><Field label="Description"><textarea rows={2} value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} className="input" /></Field></div>
          <Field label="Section"><select value={draft.sectionId} onChange={(e) => setDraft({ ...draft, sectionId: e.target.value })} className="input">{sections.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}</select></Field>
          <Field label="Tag (optional)"><input value={draft.tag ?? ""} onChange={(e) => setDraft({ ...draft, tag: e.target.value || undefined })} className="input" placeholder="Signature, Spicy, Ghana…" /></Field>
          <div className="sm:col-span-2">
            <Field label="Image">
              <div className="flex items-start gap-3">
                <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-[10px] text-slate-400">
                  {draft.img ? <img src={draft.img} alt="" className="h-full w-full object-cover" /> : "No image"}
                </div>
                <div className="flex-1 space-y-2">
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const f = e.target.files?.[0]; if (!f) return;
                    if (f.size > 1_200_000) { alert("Image too large. Please pick under 1.2 MB."); e.target.value = ""; return; }
                    const dataUrl = await new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsDataURL(f); });
                    setDraft({ ...draft, img: dataUrl });
                    e.target.value = "";
                  }} className="block w-full text-xs" />
                  <input value={draft.img?.startsWith("data:") ? "" : (draft.img ?? "")} onChange={(e) => setDraft({ ...draft, img: e.target.value || undefined })} className="input" placeholder="…or paste an image URL" />
                  {draft.img && <button type="button" onClick={() => setDraft({ ...draft, img: undefined })} className="text-xs font-semibold text-red-600 hover:underline">Remove image</button>}
                </div>
              </div>
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.available} onChange={(e) => setDraft({ ...draft, available: e.target.checked })} /> Available</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} /> Featured on home</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!draft.veg} onChange={(e) => setDraft({ ...draft, veg: e.target.checked })} /> Plant-based</label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold uppercase tracking-widest">Cancel</button>
          <button type="submit" className="btn-flame !py-2 !px-5 !text-xs"><Save size={14} /> Save</button>
        </div>
        <style>{`.input{width:100%;border:1px solid #e2e8f0;background:#f8fafc;border-radius:0.75rem;padding:0.625rem 0.875rem;font-size:0.875rem;outline:none}`}</style>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span><div className="mt-1">{children}</div></label>;
}
