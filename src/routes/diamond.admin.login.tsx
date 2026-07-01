import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { diamondLogin } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (diamondLogin(pwd)) navigate({ to: "/diamond/admin" });
    else setErr("Incorrect password.");
  }

  return (
    <div className="grid min-h-screen place-items-center px-6" style={{ background: "linear-gradient(135deg, #2E3136 0%, #007FA6 100%)" }}>
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-10" style={{ boxShadow: "0 40px 80px -30px rgba(0,0,0,0.4)" }}>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--dc-aqua)]">Admin Console</p>
          <h1 className="mt-3 font-[family-name:var(--dc-serif)] text-4xl font-light italic text-[var(--dc-charcoal)]">
            <span className="font-light">Diamond</span>
            <span className="font-medium italic"> City</span>
          </h1>
        </div>
        <label className="mt-10 block">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--dc-concrete)]">Password</span>
          <input
            type="password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setErr(""); }}
            autoFocus
            className="mt-2 h-12 w-full rounded-xl border border-[var(--dc-concrete)]/40 px-4 text-sm outline-none transition focus:border-[var(--dc-aqua)]"
          />
        </label>
        {err && <p className="mt-3 text-xs text-red-600">{err}</p>}
        <button type="submit" className="dc-btn-primary mt-6 w-full">Enter</button>
        <p className="mt-6 text-center text-[11px] text-[var(--dc-concrete)]">Default password: <code className="font-mono">diamond2026</code></p>
      </form>
    </div>
  );
}
