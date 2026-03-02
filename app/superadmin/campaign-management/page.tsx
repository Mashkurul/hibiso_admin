"use client";

import { useEffect, useMemo, useState } from "react";

type CampaignStatus = "Active" | "Suspended";

type Campaign = {
  id: string;
  title: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  brandName: string;
  brandEmail: string;
  creatorName: string;
  creatorEmail: string;
  creatorHandle: string;
  status: CampaignStatus;
};

const initialCampaigns: Campaign[] = [
  {
    id: "CP-3101",
    title: "Glow Summer Launch",
    location: "Paris, France",
    budget: 32500,
    startDate: "2026-04-05",
    endDate: "2026-05-10",
    brandName: "GlowCo",
    brandEmail: "hello@glowco.com",
    creatorName: "Sarah Johnson",
    creatorEmail: "sarah@creatormail.com",
    creatorHandle: "@sarahvibes",
    status: "Active",
  },
  {
    id: "CP-3102",
    title: "Tech Creator Sprint",
    location: "Berlin, Germany",
    budget: 28750,
    startDate: "2026-04-12",
    endDate: "2026-05-22",
    brandName: "TechGear",
    brandEmail: "admin@techgear.io",
    creatorName: "Mike Roy",
    creatorEmail: "mike@creatormail.com",
    creatorHandle: "@miketech",
    status: "Active",
  },
  {
    id: "CP-3103",
    title: "Eco Stay Experience Reel",
    location: "Lisbon, Portugal",
    budget: 21400,
    startDate: "2026-03-20",
    endDate: "2026-04-30",
    brandName: "EcoStay",
    brandEmail: "team@ecostay.travel",
    creatorName: "Emma Wilson",
    creatorEmail: "emma@creatormail.com",
    creatorHandle: "@emmagoes",
    status: "Suspended",
  },
  {
    id: "CP-3104",
    title: "Urban Fuel Creator Push",
    location: "Madrid, Spain",
    budget: 35800,
    startDate: "2026-05-02",
    endDate: "2026-06-12",
    brandName: "UrbanFuel",
    brandEmail: "ops@urbanfuel.app",
    creatorName: "Jannat Karim",
    creatorEmail: "jannat@creatormail.com",
    creatorHandle: "@jannatstyle",
    status: "Active",
  },
];

function money(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CampaignManagementPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [editCampaignId, setEditCampaignId] = useState<string | null>(null);
  const [deleteCampaignId, setDeleteCampaignId] = useState<string | null>(null);

  const [draftTitle, setDraftTitle] = useState("");
  const [draftLocation, setDraftLocation] = useState("");
  const [draftBudget, setDraftBudget] = useState(0);
  const [draftStartDate, setDraftStartDate] = useState("");
  const [draftEndDate, setDraftEndDate] = useState("");

  const activeCount = campaigns.filter((c) => c.status === "Active").length;
  const suspendedCount = campaigns.filter((c) => c.status === "Suspended").length;

  const editCampaign = useMemo(
    () => campaigns.find((c) => c.id === editCampaignId) ?? null,
    [campaigns, editCampaignId],
  );
  const deleteCampaign = useMemo(
    () => campaigns.find((c) => c.id === deleteCampaignId) ?? null,
    [campaigns, deleteCampaignId],
  );
  const hasOpenPopup = editCampaign !== null || deleteCampaign !== null;

  function updateCampaign(campaignId: string, patch: Partial<Campaign>) {
    setCampaigns((prev) => prev.map((c) => (c.id === campaignId ? { ...c, ...patch } : c)));
  }

  function openEdit(campaign: Campaign) {
    setEditCampaignId(campaign.id);
    setDraftTitle(campaign.title);
    setDraftLocation(campaign.location);
    setDraftBudget(campaign.budget);
    setDraftStartDate(campaign.startDate);
    setDraftEndDate(campaign.endDate);
  }

  function removeCampaign(campaignId: string) {
    setCampaigns((prev) => prev.filter((c) => c.id !== campaignId));
  }

  useEffect(() => {
    if (!hasOpenPopup) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasOpenPopup]);

  return (
    <>
      <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">


        <section className="grid gap-4 md:grid-cols-3">
          <StatusCard label="Active" value={activeCount} tone="green" icon={<CheckIcon />} />
          <StatusCard label="Suspended" value={suspendedCount} tone="red" icon={<PauseIcon />} />
          <StatusCard label="Total" value={campaigns.length} tone="amber" icon={<ListIcon />} />
        </section>

        <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
              <GridIcon className="text-[#4d72b9]" />
              Active Campaigns
            </h2>
            
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/5">
            <table className="min-w-full text-left">
              <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Timeline</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{campaign.title}</p>
                      <p className="text-xs text-slate-500">{campaign.id}</p>
                    </td>
                    <td className="px-4 py-3">{campaign.location}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{campaign.brandName}</p>
                      <p className="text-xs text-slate-500">{campaign.brandEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{campaign.creatorName}</p>
                      <p className="text-xs text-slate-500">{campaign.creatorHandle}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#2f7ef7]">
                      {money(campaign.budget)}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {campaign.startDate} to {campaign.endDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(campaign.status)}`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
              <ControlIcon className="text-[#4d72b9]" />
              Campaign Controls
            </h2>
            <span className="text-xs font-medium text-slate-500">
              
            </span>
          </div>

          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <article
                key={`${campaign.id}-controls`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 transition hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{campaign.title}</p>
                  <p className="text-xs text-slate-500">
                    {campaign.brandName} x {campaign.creatorName}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(campaign)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#bfd4ff] px-3 py-1.5 text-xs font-semibold text-[#4d72b9] transition hover:bg-[#ecf3ff]"
                  >
                    <EditIcon />
                    Edit Campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCampaign(campaign.id, { status: "Suspended" })}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#f1c2c2] px-3 py-1.5 text-xs font-semibold text-[#b54d4d] transition hover:bg-[#fff2f2]"
                  >
                    <PauseIcon />
                    Suspend
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteCampaignId(campaign.id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#f3c1c8] px-3 py-1.5 text-xs font-semibold text-[#bd4a59] transition hover:bg-[#fff1f3]"
                  >
                    <TrashIcon />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {editCampaign && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/40 p-4"
              onClick={() => setEditCampaignId(null)}
            >
              <div
                className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800">Edit Campaign</h3>
                  <button
                    type="button"
                    onClick={() => setEditCampaignId(null)}
                    className="rounded-lg px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100"
                  >
                    Close
                  </button>
                </div>

                <div className="grid gap-2 text-sm">
                  <label className="text-slate-600">Campaign Title</label>
                  <input
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
                  />

                  <label className="mt-1 text-slate-600">Location</label>
                  <input
                    value={draftLocation}
                    onChange={(e) => setDraftLocation(e.target.value)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
                  />

                  <label className="mt-1 text-slate-600">Budget (EUR)</label>
                  <input
                    type="number"
                    min={0}
                    value={draftBudget}
                    onChange={(e) => setDraftBudget(Number(e.target.value))}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
                  />

                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600">Start Date</label>
                      <input
                        type="date"
                        value={draftStartDate}
                        onChange={(e) => setDraftStartDate(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600">End Date</label>
                      <input
                        type="date"
                        value={draftEndDate}
                        onChange={(e) => setDraftEndDate(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditCampaignId(null)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateCampaign(editCampaign.id, {
                        title: draftTitle,
                        location: draftLocation,
                        budget: draftBudget,
                        startDate: draftStartDate,
                        endDate: draftEndDate,
                      });
                      setEditCampaignId(null);
                    }}
                    className="rounded-lg bg-[#2f7ef7] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {deleteCampaign && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/40 p-4"
              onClick={() => setDeleteCampaignId(null)}
            >
              <div
                className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800">Delete Campaign</h3>
                  <button
                    type="button"
                    onClick={() => setDeleteCampaignId(null)}
                    className="rounded-lg px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100"
                  >
                    Close
                  </button>
                </div>
                <p className="text-sm text-slate-600">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-800">{deleteCampaign.title}</span>?
                </p>
                <p className="mt-2 text-xs text-slate-500">This action cannot be undone.</p>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDeleteCampaignId(null)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removeCampaign(deleteCampaign.id);
                      setDeleteCampaignId(null);
                    }}
                    className="rounded-lg bg-[#dc4f63] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Delete Campaign
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function StatusCard({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: number;
  tone: "green" | "amber" | "red";
  icon: React.ReactNode;
}) {
  const iconTone =
    tone === "green"
      ? "border-[#cfe9d8] bg-[#eefaf2] text-[#2f8d53]"
      : tone === "amber"
        ? "border-[#f2dfbf] bg-[#fff6e9] text-[#a16b1f]"
        : "border-[#efc9cf] bg-[#fff2f4] text-[#b54d4d]";

  return (
    <article className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
      <div className="rounded-2xl border border-slate-200 bg-[#f8f9fb] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <span className={`rounded-lg border p-1.5 ${iconTone}`}>{icon}</span>
        </div>
        <p className="mt-1 text-3xl font-semibold text-slate-800">{value}</p>
      </div>
    </article>
  );
}

function iconWrap(path: React.ReactNode, className?: string) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      {path}
    </svg>
  );
}

function MegaphoneIcon({ className }: { className?: string }) {
  return iconWrap(
    <>
      <path d="M4 13V9l11-4v12L4 13Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 9h2.5a2.5 2.5 0 0 1 0 5H15" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 13.7 7.5 19h2l-1.2-4.7" stroke="currentColor" strokeWidth="1.8" />
    </>,
    className,
  );
}

function GridIcon({ className }: { className?: string }) {
  return iconWrap(
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
    </>,
    className,
  );
}

function ControlIcon({ className }: { className?: string }) {
  return iconWrap(
    <>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m19 12 1.3-.8-.8-2.2-1.6.2-.6-1 1-1.3-1.9-1.1-.9 1h-1l-.9-1-1.9 1.1 1 1.3-.6 1-1.6-.2-.8 2.2L5 12l-1.3.8.8 2.2 1.6-.2.6 1-1 1.3 1.9 1.1.9-1h1l.9 1 1.9-1.1-1-1.3.6-1 1.6.2.8-2.2L19 12Z" stroke="currentColor" strokeWidth="1.2" />
    </>,
    className,
  );
}

function CheckIcon() {
  return iconWrap(<path d="m6 12 4 4 8-8" stroke="currentColor" strokeWidth="1.8" />);
}

function PauseIcon() {
  return iconWrap(
    <>
      <rect x="7" y="6" width="3.5" height="12" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.5" y="6" width="3.5" height="12" rx="1" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function ListIcon() {
  return iconWrap(<path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.8" />);
}

function EditIcon() {
  return iconWrap(
    <>
      <path d="m4 15.5 9.8-9.8 2.5 2.5L6.5 18H4v-2.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m12.8 6.7 2.5 2.5" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function TrashIcon() {
  return iconWrap(
    <>
      <path d="M5 7h14M9 7V5h6v2M8 10v7M12 10v7M16 10v7M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="1.7" />
    </>,
  );
}

function statusClass(status: CampaignStatus) {
  if (status === "Active") return "bg-[#def5e5] text-[#2d8f4d]";
  return "bg-[#fff2f2] text-[#b54d4d]";
}
