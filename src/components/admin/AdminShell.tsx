import { useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { LayoutDashboard, UtensilsCrossed, Image as ImageIcon, MessageSquare, Quote, MapPin, Clock, FileText, ShoppingBag, Calendar, Sparkles, Award, Settings as SettingsIcon, LogOut, Menu, X, Flame, RotateCcw } from "lucide-react";
import { isAdminLoggedIn, adminLogout } from "@/lib/adminAuth";
import { useAdmin } from "@/lib/adminStore";
import logoCream from "@/assets/firebird-emblem-cream.png";

const navItems: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/comments", label: "Comments", icon: MessageSquare },
  { to: "/admin/locations", label: "Locations", icon: MapPin },
  { to: "/admin/hours", label: "Hours", icon: Clock },
  { to: "/admin/content", label: "Content", icon: FileText },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/reservations", label: "Reservations", icon: Calendar },
  { to: "/admin/catering", label: "Catering", icon: Sparkles },
  { to: "/admin/loyalty", label: "Loyalty", icon: Award },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export function AdminGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate({ to: "/admin/login" });
    } else {
      setReady(true);
    }
  }, [navigate]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--ink)] text-[var(--cream)]">
        <div className="flex items-center gap-2"><Flame className="animate-pulse" /> <span className="text-sm uppercase tracking-widest">Loading admin…</span></div>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}

function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { reset, state } = useAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function logout() {
    adminLogout();
    navigate({ to: "/admin/login" });
  }

  const counts = {
    "/admin/orders": state.orders.filter((o) => o.status === "new").length,
    "/admin/reservations": state.reservations.filter((r) => r.status === "pending").length,
    "/admin/catering": state.cateringInquiries.filter((c) => c.status === "new").length,
    "/admin/comments": state.comments.filter((c) => c.status === "pending").length,
  } as Record<string, number>;

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--ink)]">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-[var(--primary)] px-4 py-3 lg:hidden">
        <a href="/admin" className="flex items-center gap-2">
          <img src={logoCream} alt="" className="h-8 w-8" />
          <span className="text-display text-lg text-[var(--cream)]">FIREBIRD ADMIN</span>
        </a>
        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[var(--cream)]">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-[var(--primary)] text-[var(--cream)] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center gap-3 px-6 py-6">
            <img src={logoCream} alt="" className="h-10 w-10" />
            <div>
              <p className="text-display text-lg leading-none">FIREBIRD</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--cream)]/70">Admin Console</p>
            </div>
          </div>

          <nav className="space-y-1 px-3">
            {navItems.map((n) => {
              const active = n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/");
              const count = counts[n.to];
              return (
                <a
                  key={n.to}
                  href={n.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-[var(--accent)] text-white" : "text-[var(--cream)]/80 hover:bg-white/10"}`}
                >
                  <span className="flex items-center gap-3"><n.icon size={16} /> {n.label}</span>
                  {count > 0 && <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">{count}</span>}
                </a>
              );
            })}
          </nav>

          <div className="mt-6 space-y-2 border-t border-white/10 px-3 py-4">
            <a href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--cream)]/80 hover:bg-white/10">
              <Flame size={16} /> View Site
            </a>
            <button onClick={() => { if (confirm("Reset all data to defaults? This wipes orders, edits, everything.")) reset(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--cream)]/80 hover:bg-white/10">
              <RotateCcw size={16} /> Reset Data
            </button>
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--cream)]/80 hover:bg-white/10">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

export function AdminPageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-display text-3xl text-[var(--ink)] sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}>{children}</div>;
}
