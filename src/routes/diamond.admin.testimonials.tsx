import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DiamondAdminGate, DcCard, DcHeader, DcInput, DcTextarea, DcButton } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, dcUid } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/testimonials")({
  component: () => <DiamondAdminGate><TAdmin /></DiamondAdminGate>,
});

function TAdmin() {
  const { state, setState } = useDiamond();
  const [d, setD] = useState({ name: "", role: "", quote: "" });

  function add() {
    if (!d.name.trim() || !d.quote.trim()) return;
    setState((prev) => ({ ...prev, testimonials: [...prev.testimonials, { id: dcUid("t"), ...d }] }));
    setD({ name: "", role: "", quote: "" });
  }
  function remove(id: string) {
    setState((prev) => ({ ...prev, testimonials: prev.testimonials.filter((t) => t.id !== id) }));
  }
  function update(id: string, patch: Partial<{ name: string; role: string; quote: string }>) {
    setState((prev) => ({ ...prev, testimonials: prev.testimonials.map((t) => t.id === id ? { ...t, ...patch } : t) }));
  }

  return (
    <>
      <DcHeader title="Testimonials" subtitle="Resident quotes shown on the homepage." />
      <DcCard className="mb-6">
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Add testimonial</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <DcInput label="Name" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
          <DcInput label="Role / Residence" value={d.role} onChange={(e) => setD({ ...d, role: e.target.value })} />
          <div className="sm:col-span-2">
            <DcTextarea label="Quote" rows={3} value={d.quote} onChange={(e) => setD({ ...d, quote: e.target.value })} />
          </div>
        </div>
        <div className="mt-4"><DcButton onClick={add}><Plus size={14} /> Add</DcButton></div>
      </DcCard>

      <div className="grid gap-3">
        {state.testimonials.map((t) => (
          <DcCard key={t.id}>
            <div className="grid gap-3 sm:grid-cols-2">
              <DcInput label="Name" value={t.name} onChange={(e) => update(t.id, { name: e.target.value })} />
              <DcInput label="Role" value={t.role} onChange={(e) => update(t.id, { role: e.target.value })} />
              <div className="sm:col-span-2">
                <DcTextarea label="Quote" rows={2} value={t.quote} onChange={(e) => update(t.id, { quote: e.target.value })} />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button onClick={() => remove(t.id)} className="text-xs text-red-600 hover:underline"><Trash2 size={12} className="mr-1 inline" /> Delete</button>
            </div>
          </DcCard>
        ))}
      </div>
    </>
  );
}
