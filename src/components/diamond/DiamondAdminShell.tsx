import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Home, Sparkles, Image as ImageIcon, MessageSquare, FileText, CalendarCheck, Settings as SettingsIcon, LogOut } from "lucide-react";
import { isDiamondLoggedIn, diamondLogout, useDiamond } from "@/lib/diamondStore";

const items = [
  { to: "/diamond/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/diamond/admin/apartments", label: "Apartments", icon: Home },
  { to: "/diamond/admin/amenities", label: "Amenities", icon: Sparkles },
  { to: "/diamond/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/diamond/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/diamond/admin/content", label: "Site Content", icon: FileText },
  { to: "/diamond/admin/bookings", label: "Tour Bookings", icon: CalendarCheck },
  { to: "/diamond/admin/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function DiamondAdminGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isDiamondLoggedIn()) navigate({ to: "/diamond/admin/login" });
    else setAllowed(true);
    setReady(true);
  }, [navigate]);
  if (!ready || !allowed) return null;
  return <AdminShell>{children}</AdminShell>;
}

function AdminShell({ children }: { children: ReactNode }) {
  const { state } = useDiamond();
  const location = useLocation();
  const navigate = useNavigate();
  const newBookings = state.bookings.filter((b) => b.status === "new").length;

  function signOut() {
    diamondLogout();
    navigate({ to: "/diamond/admin/login" });
  }

  return (
    <div className="min-h-screen" style={{ background: "#F7F5F0" }}>
      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 py-8 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-8 rounded-3xl bg-white p-6" style={{ boxShadow: "0 12px 40px -20px rgba(46,49,54,0.25)" }}>
            <Link to="/diamond" className="block">
              <span className="font-[family-name:var(--dc-serif)] text-2xl text-[var(--dc-charcoal)]">
                <span className="font-light">Diamond</span>
                <span className="font-medium italic"> City</span>
              </span>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[var(--dc-concrete)]">Admin Console</p>
            </Link>
            <nav className="mt-8 flex flex-col gap-1">
              {items.map((item) => {
                const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
                const Icon = item.icon;
                const badge = item.to === "/diamond/admin/bookings" && newBookings > 0 ? newBookings : null;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition ${
                      active
                        ? "bg-[var(--dc-charcoal)] text-white"
                        : "text-[var(--dc-graphite)] hover:bg-[var(--dc-concrete)]/20"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="flex-1">{item.label}</span>
                    {badge !== null && (
                      <span className="rounded-full bg-[var(--dc-pool)] px-2 py-0.5 text-[10px] font-bold text-white">{badge}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={signOut}
              className="mt-8 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[var(--dc-graphite)] hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-white px-4 py-3 lg:hidden">
            <Link to="/diamond" className="font-[family-name:var(--dc-serif)] text-lg text-[var(--dc-charcoal)]">
              <span className="font-light">Diamond</span>
              <span className="font-medium italic"> City</span>
            </Link>
            <button onClick={signOut} className="text-xs text-[var(--dc-graphite)]"><LogOut size={16} /></button>
          </div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {items.map((item) => {
              const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                    active ? "bg-[var(--dc-charcoal)] text-white" : "bg-white text-[var(--dc-graphite)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function DcCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-white p-6 sm:p-8 ${className}`} style={{ boxShadow: "0 12px 40px -24px rgba(46,49,54,0.25)" }}>
      {children}
    </div>
  );
}

export function DcHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h1 className="truncate font-[family-name:var(--dc-serif)] text-3xl font-light italic text-[var(--dc-charcoal)] sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-[var(--dc-graphite)]">{subtitle}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export function DcInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">{label}</span>
      <input
        {...props}
        className="mt-2 h-11 w-full rounded-xl border border-[var(--dc-concrete)]/40 bg-white px-3 text-sm outline-none transition focus:border-[var(--dc-aqua)]"
      />
    </label>
  );
}

export function DcTextarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">{label}</span>
      <textarea
        {...props}
        className="mt-2 w-full rounded-xl border border-[var(--dc-concrete)]/40 bg-white px-3 py-3 text-sm outline-none transition focus:border-[var(--dc-aqua)]"
      />
    </label>
  );
}

export function DcButton({ children, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const cls =
    variant === "primary" ? "bg-[var(--dc-charcoal)] text-white hover:bg-[var(--dc-aqua)]" :
    variant === "danger" ? "bg-red-500 text-white hover:bg-red-600" :
    "border border-[var(--dc-concrete)] text-[var(--dc-charcoal)] hover:bg-[var(--dc-concrete)]/20";
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition ${cls} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
