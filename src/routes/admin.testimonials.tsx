import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, uid, type Testimonial } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/testimonials")({
  component: () => <AdminGate><TestimonialsAdmin /></AdminGate>,
});

function TestimonialsAdmin() {
  const { state, setState } = useAdmin();
  const [draft, setDraft] = useState({ name: "", role: "", quote: "" });

  function add() {
    if (!draft.name.trim() || !draft.quote.trim()) return;
    const t: Testimonial = { id: uid("tm"), name: draft.name.trim(), role: draft.role.trim(), quote: draft.quote.trim(), featured: true };
    setState((prev) => ({ ...prev, testimonials: [t, ...prev.testimonials] }));
    setDraft({ name: "", role: "", quote: "" });
  }
  function update(id: string, patch: Partial<Testimonial>) {
    setState((prev) => ({ ...prev, testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  }
  function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    setState((prev) => ({ ...prev, testimonials: prev.testimonials.filter((t) => t.id !== id) }));
  }

  return (
    <>
      <AdminPageHeader title="Testimonials" subtitle='Handwritten quotes shown in the homepage "What our customers say" section. Toggle the star to feature or hide.' />

      <Card className="mb-6">
        <h3 className="text-display text-xl">Add testimonial</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</span>
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" />
          </label>
          <label className="block"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">City / Role</span>
            <input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" placeholder="Osu, Accra" />
          </label>
          <label className="block sm:col-span-2"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Quote</span>
            <textarea rows={3} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" />
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={add} className="btn-flame !py-2 !px-4 !text-xs"><Plus size={14} /> Add testimonial</button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {state.testimonials.length === 0 && <Card className="lg:col-span-2 text-center text-slate-500">No testimonials yet.</Card>}
        {state.testimonials.map((t) => (
          <Card key={t.id}>
            <div className="flex items-start justify-between gap-3">
              <button onClick={() => update(t.id, { featured: !t.featured })} title={t.featured ? "Hide from homepage" : "Feature on homepage"}>
                <Star size={18} className={t.featured ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
              </button>
              <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <input value={t.name} onChange={(e) => update(t.id, { name: e.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" placeholder="Name" />
              <input value={t.role} onChange={(e) => update(t.id, { role: e.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" placeholder="Role / City" />
            </div>
            <textarea rows={3} value={t.quote} onChange={(e) => update(t.id, { quote: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" />
          </Card>
        ))}
      </div>
    </>
  );
}
