"use client";

import { useMemo, useState } from "react";
import { StyledDropdown } from "../_components/StyledDropdown";

type SubmissionState = "Submitted" | "Under Review" | "Shortlisted" | "Rejected" | "Winner";

type Submission = {
  id: string;
  campaign: string;
  creator: string;
  title: string;
  submittedAt: string;
  score: number;
  state: SubmissionState;
};

const initialSubmissions: Submission[] = [
  {
    id: "SB-1101",
    campaign: "Glow Summer Contest",
    creator: "Sarah Johnson",
    title: "Summer Glow Routine",
    submittedAt: "2026-04-05 14:15",
    score: 88,
    state: "Under Review",
  },
  {
    id: "SB-1102",
    campaign: "Glow Summer Contest",
    creator: "Tanvir Ahmed",
    title: "Before After Reveal",
    submittedAt: "2026-04-04 11:42",
    score: 82,
    state: "Submitted",
  },
  {
    id: "SB-1103",
    campaign: "Tech Sprint Challenge",
    creator: "Mike Roy",
    title: "One-Minute Unboxing",
    submittedAt: "2026-04-06 09:30",
    score: 91,
    state: "Shortlisted",
  },
  {
    id: "SB-1104",
    campaign: "EcoStay Story Hunt",
    creator: "Emma Wilson",
    title: "Resort Story Walkthrough",
    submittedAt: "2026-04-07 17:10",
    score: 95,
    state: "Winner",
  },
  {
    id: "SB-1105",
    campaign: "Tech Sprint Challenge",
    creator: "Jannat Karim",
    title: "Desk Setup Reel",
    submittedAt: "2026-04-05 20:04",
    score: 64,
    state: "Rejected",
  },
  {
    id: "SB-1106",
    campaign: "EcoStay Story Hunt",
    creator: "Nadia Islam",
    title: "Poolside Experience Short",
    submittedAt: "2026-04-07 13:28",
    score: 86,
    state: "Under Review",
  },
];

const states: SubmissionState[] = [
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Winner",
  "Rejected",
];

const campaignOptions = (campaigns: string[]) =>
  campaigns.map((campaign) => ({ label: campaign, value: campaign }));

export default function ContestsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [campaignFilter, setCampaignFilter] = useState<string>("All");

  const campaigns = useMemo(
    () => ["All", ...Array.from(new Set(submissions.map((item) => item.campaign)))],
    [submissions],
  );

  const filteredSubmissions = useMemo(
    () =>
      submissions.filter((item) =>
        campaignFilter === "All" ? true : item.campaign === campaignFilter,
      ),
    [campaignFilter, submissions],
  );

  const shortlist = useMemo(
    () =>
      submissions
        .filter((item) => item.state === "Shortlisted" || item.state === "Winner")
        .sort((a, b) => b.score - a.score),
    [submissions],
  );

  const metrics = useMemo(() => {
    const total = submissions.length;
    const reviewing = submissions.filter((s) => s.state === "Under Review").length;
    const shortlisted = submissions.filter((s) => s.state === "Shortlisted").length;
    const winners = submissions.filter((s) => s.state === "Winner").length;
    return { total, reviewing, shortlisted, winners };
  }, [submissions]);

  function updateState(id: string, next: SubmissionState) {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, state: next } : s)));
  }

  return (
    <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">
 

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Submissions" value={metrics.total} icon={<TotalIcon />} tone="blue" />
        <StatCard label="Under Review" value={metrics.reviewing} icon={<ReviewIcon />} tone="amber" />
        <StatCard label="Shortlisted" value={metrics.shortlisted} icon={<StarIcon />} tone="violet" />
        <StatCard label="Winners" value={metrics.winners} icon={<AwardIcon />} tone="green" />
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
            <PipelineIcon />
            Contest Pipeline
          </h2>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            Workflow Snapshot
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {states.map((state) => {
            const items = submissions.filter((s) => s.state === state);
            return (
              <div key={state} className="rounded-2xl border border-slate-200 bg-[#f8f9fb] p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">{state}</h3>
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                    {items.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {items.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-xs text-slate-400">
                      No entries
                    </p>
                  )}
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-xl border border-black/5 bg-white p-2.5 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                    >
                      <p className="text-xs font-semibold text-slate-700">{item.creator}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{item.title}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{item.campaign}</p>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
            <StarIcon />
            Shortlist Entries
          </h2>
          <span className="text-xs font-medium text-slate-500">Highest scoring entries</span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {shortlist.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 transition hover:bg-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">{entry.creator}</p>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  Score {entry.score}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600">{entry.title}</p>
              <p className="mt-1 text-xs text-slate-500">{entry.campaign}</p>

              <div className="mt-3 flex gap-2">
                {entry.state !== "Winner" && (
                  <button
                    type="button"
                    onClick={() => updateState(entry.id, "Winner")}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <AwardIcon />
                    Mark Winner
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => updateState(entry.id, "Under Review")}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <UndoIcon />
                  Remove Shortlist
                </button>
              </div>
            </article>
          ))}
          {shortlist.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
              No shortlisted entries yet.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
            <TrackIcon />
            Submission Tracker
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Campaign:</span>
            <StyledDropdown
              value={campaignFilter}
              options={campaignOptions(campaigns)}
              onChange={setCampaignFilter}
              ariaLabel="Filter by campaign"
              className="w-[210px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-black/5">
          <table className="min-w-full text-left">
            <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Submission</th>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {filteredSubmissions.map((item) => (
                <tr key={item.id} className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.id} - {item.submittedAt}</p>
                  </td>
                  <td className="px-4 py-3">{item.campaign}</td>
                  <td className="px-4 py-3">{item.creator}</td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{item.score}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-slate-200 bg-[#f8f9fb] px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {item.state}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => updateState(item.id, "Under Review")}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        <ReviewIcon />
                        Review
                      </button>
                      <button
                        type="button"
                        onClick={() => updateState(item.id, "Shortlisted")}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <StarIcon />
                        Shortlist
                      </button>
                      <button
                        type="button"
                        onClick={() => updateState(item.id, "Rejected")}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <RejectIcon />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: "blue" | "amber" | "violet" | "green";
}) {
  const iconToneClass =
    tone === "blue"
      ? "border-[#cfe1ff] bg-[#edf4ff] text-[#3c66ab]"
      : tone === "amber"
        ? "border-[#f2dfbf] bg-[#fff6e9] text-[#a16b1f]"
        : tone === "violet"
          ? "border-[#dfd6ff] bg-[#f4f1ff] text-[#6d52bb]"
          : "border-[#cfe9d8] bg-[#eefaf2] text-[#2f8d53]";

  return (
    <article className="rounded-3xl border border-black/5 bg-white p-4 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${iconToneClass}`}>
          {icon}
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-1 text-[30px] font-semibold leading-none text-slate-800">{value}</p>
        </div>
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

function PipelineIcon() {
  return iconWrap(
    <>
      <rect x="3" y="6" width="5" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="10" y="9" width="5" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="17" y="4" width="4" height="14" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function TrackIcon() {
  return iconWrap(
    <>
      <path d="M4 19V5m0 14h16" stroke="currentColor" strokeWidth="1.8" />
      <path d="m7 15 4-4 3 2 4-5" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function StarIcon() {
  return iconWrap(
    <path
      d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />,
  );
}

function AwardIcon() {
  return iconWrap(
    <>
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9.5 13.5-1.5 7 4-2 4 2-1.5-7" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function UndoIcon() {
  return iconWrap(
    <>
      <path d="M9 8H5v4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 12a7 7 0 1 0 2-5" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function ReviewIcon() {
  return iconWrap(
    <>
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function RejectIcon() {
  return iconWrap(
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function TotalIcon() {
  return iconWrap(
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 9h8M8 13h8" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}
