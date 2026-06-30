import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";
import { AdminGate, AdminPageHeader, Card } from "@/components/admin/AdminShell";
import { useAdmin } from "@/lib/adminStore";
import { setAdminPassword, getAdminPassword } from "@/lib/adminAuth";

export const Route = createFileRoute("/admin/settings")({
  component: () => <AdminGate><SettingsAdmin /></AdminGate>,
});

function SettingsAdmin() {
  const { state, setState } = useAdmin();
  const [s, setS] = useState(state.settings);
  const [pwd, setPwd] = useState(getAdminPassword());

  function save() {
    setState((prev) => ({ ...prev, settings: s }));
    setAdminPassword(pwd);
    alert("Settings saved.");
  }

  return (
    <>
      <AdminPageHeader title="Settings" subtitle="Brand, payments, tax, admin password.">
        <button onClick={save} className="btn-flame !py-2 !px-4 !text-xs"><Save size={14} /> Save</button>
      </AdminPageHeader>

      <Card>
        <h3 className="text-display text-xl">Brand</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <F l="Brand name"><input className="ai" value={s.brandName} onChange={(e) => setS({ ...s, brandName: e.target.value })} /></F>
          <F l="Tagline"><input className="ai" value={s.tagline} onChange={(e) => setS({ ...s, tagline: e.target.value })} /></F>
          <div className="sm:col-span-2"><F l="Footer blurb"><textarea rows={2} className="ai" value={s.footerBlurb} onChange={(e) => setS({ ...s, footerBlurb: e.target.value })} /></F></div>
          <F l="Instagram"><input className="ai" value={s.socialInstagram} onChange={(e) => setS({ ...s, socialInstagram: e.target.value })} /></F>
          <F l="Facebook"><input className="ai" value={s.socialFacebook} onChange={(e) => setS({ ...s, socialFacebook: e.target.value })} /></F>
          <F l="Twitter / X"><input className="ai" value={s.socialTwitter} onChange={(e) => setS({ ...s, socialTwitter: e.target.value })} /></F>
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-display text-xl">Pricing & checkout</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <F l="Currency code"><input className="ai" value={s.currency} onChange={(e) => setS({ ...s, currency: e.target.value })} /></F>
          <F l="Symbol"><input className="ai" value={s.currencySymbol} onChange={(e) => setS({ ...s, currencySymbol: e.target.value })} /></F>
          <F l="Tax rate (0–1)"><input type="number" step="0.01" className="ai" value={s.taxRate} onChange={(e) => setS({ ...s, taxRate: +e.target.value })} /></F>
          <F l="Delivery fee (₵)"><input type="number" step="0.5" className="ai" value={s.deliveryFee} onChange={(e) => setS({ ...s, deliveryFee: +e.target.value })} /></F>
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="text-display text-xl">Payment methods</h3>
        <ul className="mt-4 space-y-2">
          {s.paymentMethods.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
              <div>
                <p className="font-semibold">{p.label}</p>
                <p className="text-xs text-slate-500">{p.id}</p>
              </div>
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={p.enabled} onChange={(e) => setS({ ...s, paymentMethods: s.paymentMethods.map((x) => x.id === p.id ? { ...x, enabled: e.target.checked } : x) })} /> Enabled</label>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6">
        <h3 className="text-display text-xl">Admin password</h3>
        <p className="mt-1 text-xs text-slate-500">Mock auth — for production-grade login with Google sign-in, enable Lovable Cloud.</p>
        <div className="mt-3 max-w-sm">
          <F l="Password"><input type="text" className="ai" value={pwd} onChange={(e) => setPwd(e.target.value)} /></F>
        </div>
      </Card>
      <style>{`.ai{width:100%;border:1px solid #e2e8f0;background:#fff;border-radius:0.75rem;padding:0.625rem 0.875rem;font-size:0.875rem;outline:none}`}</style>
    </>
  );
}

function F({ l, children }: { l: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{l}</span><div className="mt-1">{children}</div></label>;
}
