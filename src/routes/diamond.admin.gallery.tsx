import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DiamondAdminGate, DcCard, DcHeader, DcInput, DcButton } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, dcUid, diamondImages } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/gallery")({
  component: () => <DiamondAdminGate><GalleryAdmin /></DiamondAdminGate>,
});

function GalleryAdmin() {
  const { state, setState } = useDiamond();
  const [draft, setDraft] = useState({ url: diamondImages.hero, caption: "" });

  function add() {
    if (!draft.url.trim()) return;
    setState((prev) => ({ ...prev, gallery: [...prev.gallery, { id: dcUid("g"), ...draft }] }));
    setDraft({ url: diamondImages.hero, caption: "" });
  }
  function remove(id: string) {
    setState((prev) => ({ ...prev, gallery: prev.gallery.filter((g) => g.id !== id) }));
  }
  function updateCaption(id: string, caption: string) {
    setState((prev) => ({ ...prev, gallery: prev.gallery.map((g) => g.id === id ? { ...g, caption } : g) }));
  }

  return (
    <>
      <DcHeader title="Gallery" subtitle="Homepage gallery images." />
      <DcCard className="mb-6">
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Add image</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
          <DcInput label="Image URL" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="https://..." />
          <DcInput label="Caption" value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} />
          <DcButton onClick={add}><Plus size={14} /> Add</DcButton>
        </div>
      </DcCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.gallery.map((g) => (
          <DcCard key={g.id} className="!p-4">
            <img src={g.url} alt={g.caption} className="h-40 w-full rounded-2xl object-cover" />
            <div className="mt-3 flex gap-2">
              <input
                value={g.caption}
                onChange={(e) => updateCaption(g.id, e.target.value)}
                className="h-9 flex-1 rounded-lg border border-[var(--dc-concrete)]/40 px-3 text-xs"
              />
              <button onClick={() => remove(g.id)} className="rounded-lg p-2 text-[var(--dc-graphite)] hover:bg-red-50 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </DcCard>
        ))}
      </div>
    </>
  );
}
