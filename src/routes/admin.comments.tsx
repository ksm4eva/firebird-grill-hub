import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Star, Trash2, Inbox } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin, type CustomerComment } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/comments")({
  component: () => <AdminGate><CommentsAdmin /></AdminGate>,
});

const FILTERS: { id: "all" | "pending" | "approved" | "rejected"; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "all", label: "All" },
];

function CommentsAdmin() {
  const { state, setState } = useAdmin();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("pending");

  function patch(id: string, p: Partial<CustomerComment>) {
    setState((prev) => ({ ...prev, comments: prev.comments.map((c) => (c.id === id ? { ...c, ...p } : c)) }));
  }
  function remove(id: string) {
    if (!confirm("Delete this comment?")) return;
    setState((prev) => ({ ...prev, comments: prev.comments.filter((c) => c.id !== id) }));
  }

  const rows = filter === "all" ? state.comments : state.comments.filter((c) => c.status === filter);
  const counts = {
    pending: state.comments.filter((c) => c.status === "pending").length,
    approved: state.comments.filter((c) => c.status === "approved").length,
    rejected: state.comments.filter((c) => c.status === "rejected").length,
  };

  return (
    <>
      <AdminPageHeader title="Comments" subtitle="Customer comments submitted from the homepage. Approve and feature to show on the site." />

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f.id === "all" ? state.comments.length : counts[f.id];
          const active = filter === f.id;
          return (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${active ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--primary)] border border-slate-200"}`}>
              {f.label}
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? "bg-white/25" : "bg-slate-100 text-slate-500"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4">
        {rows.length === 0 && (
          <Card className="flex flex-col items-center gap-2 py-16 text-center text-slate-500">
            <Inbox size={32} className="text-slate-300" />
            <p>No comments in this view.</p>
          </Card>
        )}
        {rows.map((c) => (
          <Card key={c.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-display text-lg">{c.name} <span className="text-xs uppercase tracking-widest text-slate-400">{c.location || "—"}</span></p>
                <div className="mt-1 flex items-center gap-2 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < c.rating ? "fill-current" : "text-slate-200"} strokeWidth={i < c.rating ? 0 : 1.5} />
                  ))}
                  <span className="text-[10px] uppercase tracking-widest text-slate-400">{new Date(c.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${c.status === "pending" ? "bg-amber-100 text-amber-700" : c.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{c.status}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">"{c.message}"</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.status !== "approved" && (
                <button onClick={() => patch(c.id, { status: "approved" })} className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white"><Check size={12} /> Approve</button>
              )}
              {c.status !== "rejected" && (
                <button onClick={() => patch(c.id, { status: "rejected", featured: false })} className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-700"><X size={12} /> Reject</button>
              )}
              <button
                disabled={c.status !== "approved"}
                onClick={() => patch(c.id, { featured: !c.featured })}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${c.featured ? "bg-amber-400 text-white" : "bg-white text-amber-600 border border-amber-300"} disabled:opacity-40`}
              >
                <Star size={12} className={c.featured ? "fill-current" : ""} /> {c.featured ? "Featured" : "Feature on site"}
              </button>
              <button onClick={() => remove(c.id)} className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"><Trash2 size={12} /> Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
