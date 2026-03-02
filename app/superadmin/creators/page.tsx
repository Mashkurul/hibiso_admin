"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CreatorStatus = "Active" | "Suspended";
type CreatorPlan = "Basic" | "Pro" | "Elite" | "Agency";

type Creator = {
  id: string;
  name: string;
  niche: string;
  manager: string;
  email: string;
  followers: string;
  completedCampaigns: number;
  purchasedPlan: CreatorPlan;
  status: CreatorStatus;
  initials: string;
  accent: string;
};

const initialCreators: Creator[] = [
  {
    id: "CR-2101",
    name: "Sarah Johnson",
    niche: "Beauty & Lifestyle",
    manager: "Nafisa Rahman",
    email: "sarah@creatormail.com",
    followers: "124K",
    completedCampaigns: 22,
    purchasedPlan: "Elite",
    status: "Active",
    initials: "SJ",
    accent: "from-[#f88ea0] to-[#f2b36e]",
  },
  {
    id: "CR-2102",
    name: "Mike Roy",
    niche: "Tech Review",
    manager: "Sabbir Islam",
    email: "mike@creatormail.com",
    followers: "89K",
    completedCampaigns: 14,
    purchasedPlan: "Pro",
    status: "Active",
    initials: "MR",
    accent: "from-[#7ea5ff] to-[#74d5ff]",
  },
  {
    id: "CR-2103",
    name: "Emma Wilson",
    niche: "Travel Vlog",
    manager: "Lamia Khan",
    email: "emma@creatormail.com",
    followers: "156K",
    completedCampaigns: 27,
    purchasedPlan: "Agency",
    status: "Suspended",
    initials: "EW",
    accent: "from-[#89c96d] to-[#b2da7d]",
  },
  {
    id: "CR-2104",
    name: "Tanvir Ahmed",
    niche: "Fitness",
    manager: "Rifat Hasan",
    email: "tanvir@creatormail.com",
    followers: "63K",
    completedCampaigns: 9,
    purchasedPlan: "Basic",
    status: "Active",
    initials: "TA",
    accent: "from-[#ffae70] to-[#ff8670]",
  },
  {
    id: "CR-2105",
    name: "Jannat Karim",
    niche: "Fashion",
    manager: "Nadim Chowdhury",
    email: "jannat@creatormail.com",
    followers: "201K",
    completedCampaigns: 31,
    purchasedPlan: "Elite",
    status: "Active",
    initials: "JK",
    accent: "from-[#928cff] to-[#c296ff]",
  },
];

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const profileSectionRef = useRef<HTMLElement | null>(null);

  const [selectedProfileCreatorId, setSelectedProfileCreatorId] = useState<string | null>(null);
  const [viewPlanCreatorId, setViewPlanCreatorId] = useState<string | null>(null);
  const [editPlanCreatorId, setEditPlanCreatorId] = useState<string | null>(null);
  const [statusCreatorId, setStatusCreatorId] = useState<string | null>(null);

  const [draftPlan, setDraftPlan] = useState<CreatorPlan>("Basic");
  const [draftStatus, setDraftStatus] = useState<CreatorStatus>("Active");

  const selectedProfileCreator = useMemo(
    () => creators.find((c) => c.id === selectedProfileCreatorId) ?? null,
    [creators, selectedProfileCreatorId],
  );
  const viewPlanCreator = useMemo(
    () => creators.find((c) => c.id === viewPlanCreatorId) ?? null,
    [creators, viewPlanCreatorId],
  );
  const editPlanCreator = useMemo(
    () => creators.find((c) => c.id === editPlanCreatorId) ?? null,
    [creators, editPlanCreatorId],
  );
  const statusCreator = useMemo(
    () => creators.find((c) => c.id === statusCreatorId) ?? null,
    [creators, statusCreatorId],
  );

  function updateCreator(creatorId: string, patch: Partial<Creator>) {
    setCreators((prev) => prev.map((c) => (c.id === creatorId ? { ...c, ...patch } : c)));
  }

  function openEditPlan(creator: Creator) {
    setEditPlanCreatorId(creator.id);
    setDraftPlan(creator.purchasedPlan);
  }

  function openStatusEditor(creator: Creator) {
    setStatusCreatorId(creator.id);
    setDraftStatus(creator.status);
  }

  function openProfileInSectionThree(creatorId: string) {
    profileSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
    setSelectedProfileCreatorId(creatorId);
  }

  useEffect(() => {
    if (!selectedProfileCreator) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProfileCreator]);

  return (
    <>
      <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">
        <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-semibold text-slate-800">Creator Management</h1>

            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <ExportIcon />
                Export Creators
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#dd8a1d] to-[#e76e59] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-105"
              >
                <PlusIcon />
                Add Creator
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
              <ShowAllIcon />
              Show All Creators
            </h2>
            <span className="rounded-full bg-[#e8f0ff] px-3 py-1 text-xs font-semibold text-[#4f6faa]">
              {creators.length} TOTAL
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/5">
            <table className="min-w-full text-left">
              <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Niche</th>
                  <th className="px-4 py-3">Manager</th>
                  <th className="px-4 py-3">Followers</th>
                  <th className="px-4 py-3">Campaigns</th>
                  <th className="px-4 py-3">Purchased Plan</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {creators.map((creator) => (
                  <tr
                    key={creator.id}
                    className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]"
                  >
                    <td className="px-4 py-3 font-semibold">{creator.name}</td>
                    <td className="px-4 py-3">{creator.niche}</td>
                    <td className="px-4 py-3">{creator.manager}</td>
                    <td className="px-4 py-3">{creator.followers}</td>
                    <td className="px-4 py-3">{creator.completedCampaigns}</td>
                    <td className="px-4 py-3">{creator.purchasedPlan}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(creator.status)}`}
                      >
                        {creator.status}
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
              <ManageIcon />
              Manage Creators
            </h2>
            <span className="text-xs font-medium text-slate-500">
              View profile, check plan, update plan, and change status
            </span>
          </div>

          <div className="space-y-3">
            {creators.map((creator) => (
              <article
                key={`${creator.id}-action`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 transition hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{creator.name}</p>
                  <p className="text-xs text-slate-500">{creator.email}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openProfileInSectionThree(creator.id)}
                    aria-label="View profile"
                    title="View profile"
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                  >
                    <ProfileIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewPlanCreatorId(creator.id)}
                    aria-label="View purchased plan"
                    title="View purchased plan"
                    className="rounded-lg border border-[#bfd4ff] p-2 text-[#4d72b9] transition hover:bg-[#ecf3ff]"
                  >
                    <EyeIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditPlan(creator)}
                    aria-label="Change purchased plan"
                    title="Change purchased plan"
                    className="rounded-lg border border-[#d3c8ff] p-2 text-[#6c4db6] transition hover:bg-[#f3efff]"
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => openStatusEditor(creator)}
                    aria-label="Change status"
                    title="Change status"
                    className="rounded-lg border border-[#f0d2ab] p-2 text-[#ba6f14] transition hover:bg-[#fff4e8]"
                  >
                    <StatusIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={profileSectionRef}
          className="relative rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
              <CardIcon />
              Creator Profiles
            </h2>
            <span className="text-xs font-medium text-slate-500">Quick creator card view</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {creators.map((creator) => (
              <button
                key={`${creator.id}-profile`}
                type="button"
                onClick={() => openProfileInSectionThree(creator.id)}
                className="rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_22px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white ${creator.accent}`}
                  >
                    {creator.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{creator.name}</p>
                    <p className="text-xs text-slate-500">{creator.id}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <p>
                    <span className="font-medium text-slate-700">Niche:</span> {creator.niche}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Manager:</span> {creator.manager}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Followers:</span>{" "}
                    {creator.followers}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Purchased Plan:</span>{" "}
                    {creator.purchasedPlan}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(creator.status)}`}
                  >
                    {creator.status}
                  </span>
                  <span className="rounded-lg border border-[#bfd4ff] px-2.5 py-1 text-xs font-semibold text-[#4d72b9]">
                    {creator.completedCampaigns} Campaigns
                  </span>
                </div>
              </button>
            ))}
          </div>

          {selectedProfileCreator && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/40 p-4"
              onClick={() => setSelectedProfileCreatorId(null)}
            >
              <div
                className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800">Creator Profile</h3>
                  <button
                    type="button"
                    onClick={() => setSelectedProfileCreatorId(null)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-100"
                  >
                    <XIcon />
                    Close
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white ${selectedProfileCreator.accent}`}
                  >
                    {selectedProfileCreator.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-800">
                      {selectedProfileCreator.name}
                    </p>
                    <p className="text-xs text-slate-500">{selectedProfileCreator.id}</p>
                  </div>
                </div>

                <DetailLine label="Niche" value={selectedProfileCreator.niche} />
                <DetailLine label="Manager" value={selectedProfileCreator.manager} />
                <DetailLine label="Email" value={selectedProfileCreator.email} />
                <DetailLine label="Followers" value={selectedProfileCreator.followers} />
                <DetailLine
                  label="Completed Campaigns"
                  value={String(selectedProfileCreator.completedCampaigns)}
                />
                <DetailLine label="Purchased Plan" value={selectedProfileCreator.purchasedPlan} />
                <DetailLine label="Status" value={selectedProfileCreator.status} />
              </div>
            </div>
          )}
        </section>
      </div>

      {viewPlanCreator && (
        <ModalFrame onClose={() => setViewPlanCreatorId(null)} title="Purchased Plan">
          <p className="text-sm text-slate-600">
            Creator: <span className="font-semibold text-slate-800">{viewPlanCreator.name}</span>
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#f6f7fb] p-3 text-sm text-slate-700">
            <PlanIcon />
            Purchased Plan:{" "}
            <span className="font-semibold text-slate-800">{viewPlanCreator.purchasedPlan}</span>
          </p>
        </ModalFrame>
      )}

      {editPlanCreator && (
        <ModalFrame onClose={() => setEditPlanCreatorId(null)} title="Change Purchased Plan">
          <p className="text-sm text-slate-600">
            Update plan for <span className="font-semibold text-slate-800">{editPlanCreator.name}</span>
          </p>
          <select
            value={draftPlan}
            onChange={(e) => setDraftPlan(e.target.value as CreatorPlan)}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
          >
            <option>Basic</option>
            <option>Pro</option>
            <option>Elite</option>
            <option>Agency</option>
          </select>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditPlanCreatorId(null)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              <XIcon />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                updateCreator(editPlanCreator.id, { purchasedPlan: draftPlan });
                setEditPlanCreatorId(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f7ef7] px-3 py-1.5 text-xs font-semibold text-white"
            >
              <SaveIcon />
              Save Plan
            </button>
          </div>
        </ModalFrame>
      )}

      {statusCreator && (
        <ModalFrame onClose={() => setStatusCreatorId(null)} title="Change Creator Status">
          <p className="text-sm text-slate-600">
            Set status for <span className="font-semibold text-slate-800">{statusCreator.name}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDraftStatus("Active")}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${draftStatus === "Active" ? "border-[#8ccfa0] bg-[#ecfbf1] text-[#2d8f4d]" : "border-slate-200 text-slate-600"}`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setDraftStatus("Suspended")}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${draftStatus === "Suspended" ? "border-[#f0b7b7] bg-[#fff2f2] text-[#b54d4d]" : "border-slate-200 text-slate-600"}`}
            >
              Suspended
            </button>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setStatusCreatorId(null)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              <XIcon />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                updateCreator(statusCreator.id, { status: draftStatus });
                setStatusCreatorId(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f7ef7] px-3 py-1.5 text-xs font-semibold text-white"
            >
              <SaveIcon />
              Save Status
            </button>
          </div>
        </ModalFrame>
      )}
    </>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="mt-2 text-sm text-slate-700">
      <span className="font-semibold text-slate-800">{label}:</span> {value}
    </p>
  );
}

function ModalFrame({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-100"
          >
            <XIcon />
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function statusClass(status: CreatorStatus) {
  if (status === "Active") return "bg-[#def5e5] text-[#2d8f4d]";
  return "bg-[#fff2f2] text-[#b54d4d]";
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m4 15.5 9.8-9.8 2.5 2.5L6.5 18H4v-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m12.8 6.7 2.5 2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v6l4 2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4v10m0 0 4-4m-4 4-4-4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4h11l3 3v13H5V4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 4v5h8V4M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ShowAllIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ManageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m19 12 1.3-.8-.8-2.2-1.6.2-.6-1 1-1.3-1.9-1.1-.9 1h-1l-.9-1-1.9 1.1 1 1.3-.6 1-1.6-.2-.8 2.2L5 12l-1.3.8.8 2.2 1.6-.2.6 1-1 1.3 1.9 1.1.9-1h1l.9 1 1.9-1.1-1-1.3.6-1 1.6.2.8-2.2L19 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 19a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
