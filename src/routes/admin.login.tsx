import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Flame, Lock } from "lucide-react";
import { adminLogin, isAdminLoggedIn } from "@/lib/adminAuth";
import logoCream from "@/assets/firebird-emblem-cream.png";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isAdminLoggedIn()) navigate({ to: "/admin" });
  }, [navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(pwd)) navigate({ to: "/admin" });
    else setErr("Wrong password. Default is: firebird2026");
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[var(--primary)] p-4 text-[var(--cream)]">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-8 text-[var(--ink)] shadow-float">
        <div className="flex items-center gap-3">
          <img src={logoCream} alt="" className="h-12 w-12 rounded-xl bg-[var(--primary)] p-1.5" />
          <div>
            <p className="text-display text-2xl leading-none">FIREBIRD</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Admin Console</p>
          </div>
        </div>
        <h1 className="text-display mt-8 text-2xl flex items-center gap-2"><Lock size={18} /> Sign in</h1>
        <p className="mt-1 text-xs text-slate-500">Mock auth — for production, enable Lovable Cloud for real email + Google sign-in.</p>

        <label className="mt-6 block">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Password</span>
          <input type="password" required autoFocus value={pwd} onChange={(e) => { setPwd(e.target.value); setErr(""); }} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--primary)]" />
        </label>
        {err && <p className="mt-2 text-xs text-red-600">{err}</p>}

        <button type="submit" className="btn-flame mt-6 w-full"><Flame size={14} /> Sign in</button>
        <a href="/" className="mt-4 block text-center text-[10px] uppercase tracking-widest text-slate-400 hover:text-[var(--primary)]">← back to site</a>
      </form>
    </div>
  );
}
