import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DiamondAdminGate, DcCard, DcHeader, DcInput, DcTextarea, DcButton } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, dcUid } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/content")({
  component: () => <DiamondAdminGate><ContentAdmin /></DiamondAdminGate>,
});

function ContentAdmin() {
  const { state, setState } = useDiamond();
  const c = state.content;
  function up<K extends keyof typeof c>(k: K, v: (typeof c)[K]) {
    setState((prev) => ({ ...prev, content: { ...prev.content, [k]: v } }));
  }

  const [s, setS] = useState({ value: "", label: "" });
  function addStat() {
    if (!s.value.trim()) return;
    setState((prev) => ({ ...prev, stats: [...prev.stats, { id: dcUid("s"), ...s }] }));
    setS({ value: "", label: "" });
  }
  function removeStat(id: string) {
    setState((prev) => ({ ...prev, stats: prev.stats.filter((x) => x.id !== id) }));
  }
  function updateStat(id: string, patch: Partial<{ value: string; label: string }>) {
    setState((prev) => ({ ...prev, stats: prev.stats.map((x) => x.id === id ? { ...x, ...patch } : x) }));
  }

  return (
    <>
      <DcHeader title="Site Content" subtitle="Hero, about, contact, and stats." />

      <DcCard className="mb-6">
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Hero & Brand</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <DcInput label="Brand Name" value={c.brandName} onChange={(e) => up("brandName", e.target.value)} />
          <DcInput label="Tagline" value={c.tagline} onChange={(e) => up("tagline", e.target.value)} />
          <DcInput label="Hero Eyebrow" value={c.heroEyebrow} onChange={(e) => up("heroEyebrow", e.target.value)} />
          <DcInput label="Hero Title (use \\n for line break)" value={c.heroTitle.replace(/\n/g, "\\n")} onChange={(e) => up("heroTitle", e.target.value.replace(/\\n/g, "\n"))} />
          <div className="sm:col-span-2">
            <DcTextarea label="Hero Subtitle" rows={3} value={c.heroSubtitle} onChange={(e) => up("heroSubtitle", e.target.value)} />
          </div>
        </div>
      </DcCard>

      <DcCard className="mb-6">
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">About</h3>
        <div className="mt-4 grid gap-3">
          <DcInput label="Headline" value={c.aboutHeadline} onChange={(e) => up("aboutHeadline", e.target.value)} />
          <DcTextarea label="Body" rows={5} value={c.aboutBody} onChange={(e) => up("aboutBody", e.target.value)} />
        </div>
      </DcCard>

      <DcCard className="mb-6">
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Contact</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <DcInput label="Phone" value={c.contactPhone} onChange={(e) => up("contactPhone", e.target.value)} />
          <DcInput label="Email" value={c.contactEmail} onChange={(e) => up("contactEmail", e.target.value)} />
          <DcInput label="Address" value={c.contactAddress} onChange={(e) => up("contactAddress", e.target.value)} />
          <DcInput label="WhatsApp Number" value={c.contactWhatsapp} onChange={(e) => up("contactWhatsapp", e.target.value)} />
          <DcInput label="Instagram URL" value={c.instagramUrl} onChange={(e) => up("instagramUrl", e.target.value)} />
          <DcInput label="Facebook URL" value={c.facebookUrl} onChange={(e) => up("facebookUrl", e.target.value)} />
          <div className="sm:col-span-2">
            <DcInput label="Map Embed URL (Google Maps embed src)" value={c.mapEmbedUrl} onChange={(e) => up("mapEmbedUrl", e.target.value)} />
          </div>
        </div>
      </DcCard>

      <DcCard>
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Statistics</h3>
        <div className="mt-4 grid gap-3">
          {state.stats.map((st) => (
            <div key={st.id} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
              <DcInput label="Value" value={st.value} onChange={(e) => updateStat(st.id, { value: e.target.value })} />
              <DcInput label="Label" value={st.label} onChange={(e) => updateStat(st.id, { label: e.target.value })} />
              <button onClick={() => removeStat(st.id)} className="rounded-xl p-2 text-[var(--dc-graphite)] hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          ))}
          <div className="grid gap-2 border-t border-[var(--dc-concrete)]/30 pt-4 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
            <DcInput label="New Value" value={s.value} onChange={(e) => setS({ ...s, value: e.target.value })} placeholder="200+" />
            <DcInput label="New Label" value={s.label} onChange={(e) => setS({ ...s, label: e.target.value })} placeholder="Luxury residences" />
            <DcButton onClick={addStat}><Plus size={14} /></DcButton>
          </div>
        </div>
      </DcCard>
    </>
  );
}
