"use client";

import { useMemo, useState } from "react";

type Region = "Europe" | "North America" | "Asia";
type ModerationMode = "Balanced" | "Strict" | "Custom";

type SettingsState = {
  workspaceName: string;
  timezone: string;
  defaultCurrency: "EUR" | "USD";
  activeRegion: Region;
  maintenanceMode: boolean;
  autoPayouts: boolean;
  require2FA: boolean;
  weeklySummary: boolean;
  incidentAlerts: boolean;
  moderationMode: ModerationMode;
  maxUploadMb: number;
  sessionTimeoutMin: number;
};

const defaultSettings: SettingsState = {
  workspaceName: "Hibi Superadmin Workspace",
  timezone: "UTC+06:00 (Asia/Dhaka)",
  defaultCurrency: "EUR",
  activeRegion: "Europe",
  maintenanceMode: false,
  autoPayouts: true,
  require2FA: true,
  weeklySummary: true,
  incidentAlerts: true,
  moderationMode: "Balanced",
  maxUploadMb: 250,
  sessionTimeoutMin: 45,
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#88a8e8] focus:ring-2 focus:ring-[#dbe8ff]";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saveNotice, setSaveNotice] = useState<string>("");

  const configHealth = useMemo(() => {
    const totalFlags = 5;
    let enabled = 0;
    if (settings.autoPayouts) enabled += 1;
    if (settings.require2FA) enabled += 1;
    if (settings.weeklySummary) enabled += 1;
    if (settings.incidentAlerts) enabled += 1;
    if (!settings.maintenanceMode) enabled += 1;
    return Math.round((enabled / totalFlags) * 100);
  }, [settings]);

  function patch(partial: Partial<SettingsState>) {
    setSettings((prev) => ({ ...prev, ...partial }));
    setSaveNotice("");
  }

  function saveAll() {
    setSaveNotice("Settings saved successfully.");
  }

  function resetAll() {
    setSettings(defaultSettings);
    setSaveNotice("Settings reset to defaults.");
  }

  return (
    <div className="rounded-[28px] bg-[#f1f0ee] p-5 md:p-6">
 

      <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Workspace Controls</h2>
              <Badge tone="blue" text="Core" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm text-slate-600">
                Workspace Name
                <input
                  value={settings.workspaceName}
                  onChange={(e) => patch({ workspaceName: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="text-sm text-slate-600">
                Timezone
                <select
                  value={settings.timezone}
                  onChange={(e) => patch({ timezone: e.target.value })}
                  className={fieldClass}
                >
                  <option>UTC+06:00 (Asia/Dhaka)</option>
                  <option>UTC+01:00 (Europe/Berlin)</option>
                  <option>UTC+00:00 (Europe/London)</option>
                  <option>UTC-05:00 (America/New_York)</option>
                </select>
              </label>
              <label className="text-sm text-slate-600">
                Default Currency
                <select
                  value={settings.defaultCurrency}
                  onChange={(e) => patch({ defaultCurrency: e.target.value as "EUR" | "USD" })}
                  className={fieldClass}
                >
                  <option>EUR</option>
                  <option>USD</option>
                </select>
              </label>
              <label className="text-sm text-slate-600">
                Active Region
                <select
                  value={settings.activeRegion}
                  onChange={(e) => patch({ activeRegion: e.target.value as Region })}
                  className={fieldClass}
                >
                  <option>Europe</option>
                  <option>North America</option>
                  <option>Asia</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Global Platform Behavior</h2>
              <Badge tone="amber" text="Policy" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm text-slate-600">
                Moderation Mode
                <select
                  value={settings.moderationMode}
                  onChange={(e) => patch({ moderationMode: e.target.value as ModerationMode })}
                  className={fieldClass}
                >
                  <option>Balanced</option>
                  <option>Strict</option>
                  <option>Custom</option>
                </select>
              </label>
              <label className="text-sm text-slate-600">
                Max Upload Size (MB)
                <input
                  type="number"
                  min={50}
                  max={1024}
                  value={settings.maxUploadMb}
                  onChange={(e) => patch({ maxUploadMb: Number(e.target.value) })}
                  className={fieldClass}
                />
              </label>
              <label className="text-sm text-slate-600">
                Session Timeout (Minutes)
                <input
                  type="number"
                  min={10}
                  max={240}
                  value={settings.sessionTimeoutMin}
                  onChange={(e) => patch({ sessionTimeoutMin: Number(e.target.value) })}
                  className={fieldClass}
                />
              </label>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Admin Preferences</h2>
              <Badge tone="green" text="Live" />
            </div>
            <div className="space-y-2.5">
              <ToggleRow
                label="Require 2FA For Admin Login"
                caption="Mandatory second-factor authentication for all admin accounts."
                checked={settings.require2FA}
                onChange={(checked) => patch({ require2FA: checked })}
              />
              <ToggleRow
                label="Enable Auto Payouts"
                caption="Automatically process qualified payout requests every cycle."
                checked={settings.autoPayouts}
                onChange={(checked) => patch({ autoPayouts: checked })}
              />
              <ToggleRow
                label="Weekly Performance Summary"
                caption="Send weekly digest emails for revenue and operation KPIs."
                checked={settings.weeklySummary}
                onChange={(checked) => patch({ weeklySummary: checked })}
              />
              <ToggleRow
                label="Critical Incident Alerts"
                caption="Push immediate alerts for platform incidents and anomalies."
                checked={settings.incidentAlerts}
                onChange={(checked) => patch({ incidentAlerts: checked })}
              />
              <ToggleRow
                label="Maintenance Mode"
                caption="Temporarily restrict platform access for system operations."
                checked={settings.maintenanceMode}
                onChange={(checked) => patch({ maintenanceMode: checked })}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-black/5 bg-white/85 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold text-slate-800">Save Configuration</h2>
            <p className="mt-2 text-xs text-slate-500">
              Publish changes globally for all admin operations and user-facing behavior.
            </p>
            {saveNotice && (
              <p className="mt-3 rounded-xl border border-[#d9f1e2] bg-[#effcf3] px-3 py-2 text-xs font-semibold text-[#2d8f4d]">
                {saveNotice}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={saveAll}
                className="rounded-xl bg-[linear-gradient(135deg,#2f7ef7,#5b9bff)] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(47,126,247,0.28)] transition hover:brightness-105"
              >
                Save All Changes
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Reset Defaults
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Badge({ text, tone }: { text: string; tone: "blue" | "amber" | "green" }) {
  void tone;
  return (
    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
      {text}
    </span>
  );
}

function ToggleRow({
  label,
  caption,
  checked,
  onChange,
}: {
  label: string;
  caption: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-2xl border border-black/5 bg-[linear-gradient(180deg,#fbfbfc,#f4f6f9)] px-3.5 py-3 text-left transition hover:border-slate-200 hover:bg-white"
    >
      <span className="pr-3">
        <span className="block text-sm font-medium text-slate-700">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{caption}</span>
      </span>
      <span
        className={`inline-flex h-6 w-11 items-center rounded-full p-1 transition ${
          checked ? "bg-[#2f7ef7]" : "bg-slate-300"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
