import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DiamondAdminGate, DcCard, DcHeader, DcInput, DcTextarea, DcButton } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, dcUid } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/amenities")({
  component: () => <DiamondAdminGate><AmenitiesAdmin /></DiamondAdminGate>,
});

const iconChoices = ["Waves", "Dumbbell", "Baby", "Car", "Shield", "TreePalm", "Wifi", "Zap"];

function AmenitiesAdmin() {
  const { state, setState } = useDiamond();
  const [draft, setDraft] = useState({ title: "", icon: "Waves", description: "" });

  function add() {
    if (!draft.title.trim()) return;
    setState((prev) => ({ ...prev, amenities: [...prev.amenities, { id: dcUid("am"), ...draft }] }));
    setDraft({ title: "", icon: "Waves", description: "" });
  }
  function remove(id: string) {
    setState((prev) => ({ ...prev, amenities: prev.amenities.filter((a) => a.id !== id) }));
  }
  function update(id: string, patch: Partial<{ title: string; icon: string; description: string }>) {
    setState((prev) => ({ ...prev, amenities: prev.amenities.map((a) => a.id === id ? { ...a, ...patch } : a) }));
  }

  return (
    <>
      <DcHeader title="Amenities" subtitle="Facilities and features shown on the site." />

      <DcCard className="mb-6">
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Add amenity</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr_3fr_auto]">
          <DcInput label="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">Icon</span>
            <select value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[var(--dc-concrete)]/40 px-3 text-sm">
              {iconChoices.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </label>
          <DcInput label="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          <div className="flex items-end"><DcButton onClick={add}><Plus size={14} /> Add</DcButton></div>
        </div>
      </DcCard>

      <div className="grid gap-3">
        {state.amenities.map((a) => (
          <DcCard key={a.id}>
            <div className="grid gap-3 sm:grid-cols-[2fr_1fr_3fr_auto] sm:items-end">
              <DcInput label="Title" value={a.title} onChange={(e) => update(a.id, { title: e.target.value })} />
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">Icon</span>
                <select value={a.icon} onChange={(e) => update(a.id, { icon: e.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[var(--dc-concrete)]/40 px-3 text-sm">
                  {iconChoices.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </label>
              <DcInput label="Description" value={a.description} onChange={(e) => update(a.id, { description: e.target.value })} />
              <button onClick={() => remove(a.id)} className="rounded-xl p-2 text-[var(--dc-graphite)] hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </DcCard>
        ))}
      </div>
    </>
  );
}
