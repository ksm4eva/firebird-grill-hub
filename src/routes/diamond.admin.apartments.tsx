import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { DiamondAdminGate, DcCard, DcHeader, DcInput, DcTextarea, DcButton } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, dcUid, diamondImages, type Apartment } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/apartments")({
  component: () => <DiamondAdminGate><ApartmentsAdmin /></DiamondAdminGate>,
});

const empty: Apartment = { id: "", name: "", bedrooms: 1, bathrooms: 1, sqft: 0, price: 0, available: true, featured: false, image: diamondImages.apt1, description: "" };

function ApartmentsAdmin() {
  const { state, setState } = useDiamond();
  const [editing, setEditing] = useState<Apartment | null>(null);

  function save(a: Apartment) {
    setState((prev) => {
      const exists = prev.apartments.find((x) => x.id === a.id);
      return {
        ...prev,
        apartments: exists
          ? prev.apartments.map((x) => (x.id === a.id ? a : x))
          : [...prev.apartments, { ...a, id: dcUid("apt") }],
      };
    });
    setEditing(null);
  }
  function remove(id: string) {
    if (!confirm("Delete this residence?")) return;
    setState((prev) => ({ ...prev, apartments: prev.apartments.filter((a) => a.id !== id) }));
  }
  function toggle(id: string, key: "available" | "featured") {
    setState((prev) => ({ ...prev, apartments: prev.apartments.map((a) => a.id === id ? { ...a, [key]: !a[key] } : a) }));
  }

  return (
    <>
      <DcHeader
        title="Apartments"
        subtitle="Manage your residences — availability, pricing, and details."
        actions={<DcButton onClick={() => setEditing({ ...empty, id: "new" })}><Plus size={14} /> New</DcButton>}
      />
      <div className="grid gap-4">
        {state.apartments.map((a) => (
          <DcCard key={a.id}>
            <div className="flex flex-wrap gap-6">
              <img src={a.image} alt={a.name} className="h-28 w-40 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--dc-serif)] text-2xl italic">{a.name}</h3>
                    <p className="text-xs text-[var(--dc-graphite)]">
                      {a.bedrooms || "Studio"} bd · {a.bathrooms} ba · {a.sqft} sqft · ${a.price.toLocaleString()}/mo
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggle(a.id, "available")} className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest ${a.available ? "bg-green-100 text-green-700" : "bg-[var(--dc-charcoal)]/10 text-[var(--dc-charcoal)]"}`}>
                      {a.available ? "Available" : "Reserved"}
                    </button>
                    <button onClick={() => toggle(a.id, "featured")} className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest ${a.featured ? "bg-[var(--dc-pool)]/20 text-[var(--dc-aqua)]" : "bg-[var(--dc-concrete)]/25 text-[var(--dc-graphite)]"}`}>
                      {a.featured ? "★ Featured" : "Not featured"}
                    </button>
                    <button onClick={() => setEditing(a)} className="text-[var(--dc-graphite)] hover:text-[var(--dc-aqua)]"><Pencil size={16} /></button>
                    <button onClick={() => remove(a.id)} className="text-[var(--dc-graphite)] hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-[var(--dc-graphite)]">{a.description}</p>
              </div>
            </div>
          </DcCard>
        ))}
      </div>

      {editing && <EditModal apt={editing} onClose={() => setEditing(null)} onSave={save} />}
    </>
  );
}

function EditModal({ apt, onClose, onSave }: { apt: Apartment; onClose: () => void; onSave: (a: Apartment) => void }) {
  const [f, setF] = useState(apt);
  const images = [
    { label: "Living", url: diamondImages.apt1 },
    { label: "Bedroom", url: diamondImages.apt2 },
    { label: "Kitchen", url: diamondImages.apt3 },
    { label: "Pool", url: diamondImages.pool },
    { label: "Garden", url: diamondImages.garden },
    { label: "Hero", url: diamondImages.hero },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--dc-serif)] text-2xl italic">{apt.id === "new" ? "New Residence" : "Edit Residence"}</h2>
          <button onClick={onClose} className="text-[var(--dc-graphite)]"><X size={20} /></button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DcInput label="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <DcInput label="Price / month (USD)" type="number" value={f.price} onChange={(e) => setF({ ...f, price: +e.target.value })} />
          <DcInput label="Bedrooms" type="number" value={f.bedrooms} onChange={(e) => setF({ ...f, bedrooms: +e.target.value })} />
          <DcInput label="Bathrooms" type="number" value={f.bathrooms} onChange={(e) => setF({ ...f, bathrooms: +e.target.value })} />
          <DcInput label="Square Feet" type="number" value={f.sqft} onChange={(e) => setF({ ...f, sqft: +e.target.value })} />
          <div className="flex items-end gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.available} onChange={(e) => setF({ ...f, available: e.target.checked })} /> Available</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.featured} onChange={(e) => setF({ ...f, featured: e.target.checked })} /> Featured</label>
          </div>
          <div className="sm:col-span-2">
            <DcTextarea label="Description" rows={3} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">Image</p>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {images.map((im) => (
                <button key={im.label} onClick={() => setF({ ...f, image: im.url })} className={`overflow-hidden rounded-xl border-2 transition ${f.image === im.url ? "border-[var(--dc-aqua)]" : "border-transparent"}`}>
                  <img src={im.url} alt={im.label} className="h-16 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <DcButton variant="ghost" onClick={onClose}>Cancel</DcButton>
          <DcButton onClick={() => onSave(f)}>Save</DcButton>
        </div>
      </div>
    </div>
  );
}
