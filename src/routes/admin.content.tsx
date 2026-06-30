import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, uid } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/content")({
  component: () => <AdminGate><ContentAdmin /></AdminGate>,
});

function ContentAdmin() {
  const { state, setState } = useAdmin();
  const [c, setC] = useState(state.siteContent);

  function save() {
    setState((prev) => ({ ...prev, siteContent: c }));
    alert("Content saved.");
  }

  return (
    <>
      <AdminPageHeader title="Site Content" subtitle="Hero, About, Story, Timeline, Values.">
        <button onClick={save} className="btn-flame !py-2 !px-4 !text-xs"><Save size={14} /> Save</button>
      </AdminPageHeader>

      <Card>
        <h3 className="text-display text-xl">Hero</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <F l="Eyebrow"><input className="ai" value={c.hero.eyebrow} onChange={(e) => setC({ ...c, hero: { ...c.hero, eyebrow: e.target.value } })} /></F>
          <F l="Title line 1"><input className="ai" value={c.hero.titleLine1} onChange={(e) => setC({ ...c, hero: { ...c.hero, titleLine1: e.target.value } })} /></F>
          <F l="Title accent (blue)"><input className="ai" value={c.hero.titleAccent} onChange={(e) => setC({ ...c, hero: { ...c.hero, titleAccent: e.target.value } })} /></F>
          <F l="Title line 2"><input className="ai" value={c.hero.titleLine2} onChange={(e) => setC({ ...c, hero: { ...c.hero, titleLine2: e.target.value } })} /></F>
          <div className="sm:col-span-2"><F l="Subtitle"><textarea rows={3} className="ai" value={c.hero.subtitle} onChange={(e) => setC({ ...c, hero: { ...c.hero, subtitle: e.target.value } })} /></F></div>
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-display text-xl">About (Home)</h3>
        <div className="mt-4 space-y-3">
          <F l="Headline"><input className="ai" value={c.about.headline} onChange={(e) => setC({ ...c, about: { ...c.about, headline: e.target.value } })} /></F>
          <F l="Body"><textarea rows={3} className="ai" value={c.about.body} onChange={(e) => setC({ ...c, about: { ...c.about, body: e.target.value } })} /></F>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Bullets</span>
            {c.about.bullets.map((b, i) => (
              <div key={i} className="mt-2 flex gap-2">
                <input className="ai flex-1" value={b} onChange={(e) => setC({ ...c, about: { ...c.about, bullets: c.about.bullets.map((x, j) => j === i ? e.target.value : x) } })} />
                <button onClick={() => setC({ ...c, about: { ...c.about, bullets: c.about.bullets.filter((_, j) => j !== i) } })} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={() => setC({ ...c, about: { ...c.about, bullets: [...c.about.bullets, ""] } })} className="mt-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)]"><Plus size={12} className="inline" /> Add bullet</button>
          </div>
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-display text-xl">Story page</h3>
        <div className="mt-4 space-y-3">
          <F l="Intro"><textarea rows={2} className="ai" value={c.story.intro} onChange={(e) => setC({ ...c, story: { ...c.story, intro: e.target.value } })} /></F>
          <F l="Origin paragraph"><textarea rows={4} className="ai" value={c.story.origin} onChange={(e) => setC({ ...c, story: { ...c.story, origin: e.target.value } })} /></F>
        </div>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center justify-between"><h3 className="text-display text-xl">Timeline</h3>
          <button onClick={() => setC({ ...c, timeline: [...c.timeline, { id: uid("t"), year: "", title: "", text: "" }] })} className="btn-flame !py-1.5 !px-3 !text-[10px]"><Plus size={12} /> Add</button>
        </div>
        <ul className="mt-4 space-y-3">
          {c.timeline.map((t) => (
            <li key={t.id} className="grid gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-[100px_1fr_auto]">
              <input className="ai" placeholder="2025" value={t.year} onChange={(e) => setC({ ...c, timeline: c.timeline.map((x) => x.id === t.id ? { ...x, year: e.target.value } : x) })} />
              <div className="space-y-2">
                <input className="ai" placeholder="Title" value={t.title} onChange={(e) => setC({ ...c, timeline: c.timeline.map((x) => x.id === t.id ? { ...x, title: e.target.value } : x) })} />
                <textarea rows={2} className="ai" placeholder="Description" value={t.text} onChange={(e) => setC({ ...c, timeline: c.timeline.map((x) => x.id === t.id ? { ...x, text: e.target.value } : x) })} />
              </div>
              <button onClick={() => setC({ ...c, timeline: c.timeline.filter((x) => x.id !== t.id) })} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center justify-between"><h3 className="text-display text-xl">Values</h3>
          <button onClick={() => setC({ ...c, values: [...c.values, { id: uid("v"), title: "", text: "" }] })} className="btn-flame !py-1.5 !px-3 !text-[10px]"><Plus size={12} /> Add</button>
        </div>
        <ul className="mt-4 space-y-3">
          {c.values.map((v) => (
            <li key={v.id} className="grid gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <input className="ai" placeholder="Title" value={v.title} onChange={(e) => setC({ ...c, values: c.values.map((x) => x.id === v.id ? { ...x, title: e.target.value } : x) })} />
                <textarea rows={2} className="ai" placeholder="Description" value={v.text} onChange={(e) => setC({ ...c, values: c.values.map((x) => x.id === v.id ? { ...x, text: e.target.value } : x) })} />
              </div>
              <button onClick={() => setC({ ...c, values: c.values.filter((x) => x.id !== v.id) })} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </Card>
      <style>{`.ai{width:100%;border:1px solid #e2e8f0;background:#fff;border-radius:0.75rem;padding:0.625rem 0.875rem;font-size:0.875rem;outline:none}`}</style>
    </>
  );
}

function F({ l, children }: { l: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{l}</span><div className="mt-1">{children}</div></label>;
}
