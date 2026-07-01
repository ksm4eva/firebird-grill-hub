import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DiamondAdminGate, DcCard, DcHeader, DcInput, DcButton } from "@/components/diamond/DiamondAdminShell";
import { useDiamond, setDiamondPassword, getDiamondPassword } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond/admin/settings")({
  component: () => <DiamondAdminGate><SettingsPage /></DiamondAdminGate>,
});

function SettingsPage() {
  const { reset } = useDiamond();
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");

  function savePwd() {
    if (pwd.length < 6) { setMsg("Password must be at least 6 characters."); return; }
    setDiamondPassword(pwd);
    setPwd("");
    setMsg("Password updated.");
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <>
      <DcHeader title="Settings" subtitle="Admin password and data reset." />

      <DcCard className="mb-6">
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Change admin password</h3>
        <p className="mt-2 text-xs text-[var(--dc-graphite)]">Current password is stored in your browser only. Enable Lovable Cloud for real accounts.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_auto] sm:items-end">
          <DcInput label="New password" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder={`Current: ${getDiamondPassword()}`} />
          <DcButton onClick={savePwd}>Save</DcButton>
        </div>
        {msg && <p className="mt-3 text-xs text-[var(--dc-aqua)]">{msg}</p>}
      </DcCard>

      <DcCard>
        <h3 className="font-[family-name:var(--dc-serif)] text-xl italic">Reset data</h3>
        <p className="mt-2 text-xs text-[var(--dc-graphite)]">Restore all content (apartments, amenities, gallery, testimonials, content, bookings) to the original seed.</p>
        <div className="mt-4">
          <DcButton variant="danger" onClick={() => { if (confirm("Reset ALL Diamond City data to defaults?")) reset(); }}>Reset all data</DcButton>
        </div>
      </DcCard>
    </>
  );
}
