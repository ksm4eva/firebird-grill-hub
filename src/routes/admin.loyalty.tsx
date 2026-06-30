import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, uid } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/loyalty")({
  component: () => <AdminGate><LoyaltyAdmin /></AdminGate>,
});

function LoyaltyAdmin() {
  const { state, setState } = useAdmin();
  const [tiers, setTiers] = useState(state.loyaltyTiers);
  const [rewards, setRewards] = useState(state.loyaltyRewards);

  function save() {
    setState((prev) => ({ ...prev, loyaltyTiers: tiers, loyaltyRewards: rewards }));
    alert("Saved.");
  }

  return (
    <>
      <AdminPageHeader title="Loyalty" subtitle="Tiers and reward catalog.">
        <button onClick={save} className="btn-flame !py-2 !px-4 !text-xs"><Save size={14} /> Save</button>
      </AdminPageHeader>

      <Card>
        <div className="flex items-center justify-between"><h3 className="text-display text-xl">Tiers</h3>
          <button onClick={() => setTiers([...tiers, { id: uid("tier"), name: "", req: "", perks: [""] }])} className="btn-flame !py-1.5 !px-3 !text-[10px]"><Plus size={12} /> Add tier</button>
        </div>
        <ul className="mt-4 space-y-4">
          {tiers.map((t) => (
            <li key={t.id} className="rounded-xl bg-slate-50 p-4">
              <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
                <input className="ai" placeholder="Name" value={t.name} onChange={(e) => setTiers(tiers.map((x) => x.id === t.id ? { ...x, name: e.target.value } : x))} />
                <input className="ai" placeholder="Requirement" value={t.req} onChange={(e) => setTiers(tiers.map((x) => x.id === t.id ? { ...x, req: e.target.value } : x))} />
                <label className="flex items-center gap-2 text-xs whitespace-nowrap"><input type="checkbox" checked={!!t.popular} onChange={(e) => setTiers(tiers.map((x) => x.id === t.id ? { ...x, popular: e.target.checked } : x))} /> Popular</label>
                <button onClick={() => setTiers(tiers.filter((x) => x.id !== t.id))} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
              <div className="mt-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Perks</p>
                {t.perks.map((p, i) => (
                  <div key={i} className="mt-2 flex gap-2">
                    <input className="ai flex-1" value={p} onChange={(e) => setTiers(tiers.map((x) => x.id === t.id ? { ...x, perks: x.perks.map((q, j) => j === i ? e.target.value : q) } : x))} />
                    <button onClick={() => setTiers(tiers.map((x) => x.id === t.id ? { ...x, perks: x.perks.filter((_, j) => j !== i) } : x))} className="text-slate-500 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                ))}
                <button onClick={() => setTiers(tiers.map((x) => x.id === t.id ? { ...x, perks: [...x.perks, ""] } : x))} className="mt-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)]"><Plus size={12} className="inline" /> Add perk</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center justify-between"><h3 className="text-display text-xl">Rewards</h3>
          <button onClick={() => setRewards([...rewards, { id: uid("rw"), cost: 50, item: "" }])} className="btn-flame !py-1.5 !px-3 !text-[10px]"><Plus size={12} /> Add reward</button>
        </div>
        <ul className="mt-4 space-y-2">
          {rewards.map((r) => (
            <li key={r.id} className="grid gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-[120px_1fr_auto]">
              <input type="number" className="ai" placeholder="Flames" value={r.cost} onChange={(e) => setRewards(rewards.map((x) => x.id === r.id ? { ...x, cost: +e.target.value } : x))} />
              <input className="ai" placeholder="Reward item" value={r.item} onChange={(e) => setRewards(rewards.map((x) => x.id === r.id ? { ...x, item: e.target.value } : x))} />
              <button onClick={() => setRewards(rewards.filter((x) => x.id !== r.id))} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </Card>
      <style>{`.ai{width:100%;border:1px solid #e2e8f0;background:#fff;border-radius:0.75rem;padding:0.5rem 0.875rem;font-size:0.875rem;outline:none}`}</style>
    </>
  );
}
