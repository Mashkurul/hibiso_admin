"use client";

import { useMemo, useState } from "react";

type WorkflowStage = "Draft" | "In Review" | "Scheduled" | "Published";
type PublishState = "Draft" | "Review" | "Scheduled" | "Published" | "Paused";
type Channel = "Instagram" | "TikTok" | "YouTube" | "Facebook";
type AssetType = "Video" | "Image" | "UGC Pack" | "Script";

type WorkflowItem = {
  id: string;
  title: string;
  brand: string;
  creator: string;
  dueDate: string;
  stage: WorkflowStage;
};

type PublishRow = {
  id: string;
  content: string;
  brand: string;
  creator: string;
  channel: Channel;
  state: PublishState;
  scheduledAt: string;
};

type AssetItem = {
  id: string;
  name: string;
  type: AssetType;
  owner: string;
  size: string;
  updatedAt: string;
};

const workflowItems: WorkflowItem[] = [
  { id: "WF-01", title: "Glow Serum Teaser", brand: "GlowCo", creator: "Sarah", dueDate: "2026-04-12", stage: "Draft" },
  { id: "WF-02", title: "TechGear Unboxing Cut", brand: "TechGear", creator: "Mike", dueDate: "2026-04-10", stage: "In Review" },
  { id: "WF-03", title: "EcoStay Resort Reel", brand: "EcoStay", creator: "Emma", dueDate: "2026-04-14", stage: "Scheduled" },
  { id: "WF-04", title: "UrbanFuel Gym Story", brand: "UrbanFuel", creator: "Jannat", dueDate: "2026-04-08", stage: "Published" },
  { id: "WF-05", title: "SunStyle Try-On Story", brand: "SunStyle", creator: "Tanvir", dueDate: "2026-04-15", stage: "Draft" },
  { id: "WF-06", title: "GlowCo Before/After", brand: "GlowCo", creator: "Sarah", dueDate: "2026-04-11", stage: "In Review" },
];

const publishRows: PublishRow[] = [
  { id: "PB-1001", content: "Glow Serum Teaser", brand: "GlowCo", creator: "Sarah Johnson", channel: "Instagram", state: "Review", scheduledAt: "2026-04-14 10:30" },
  { id: "PB-1002", content: "Tech Creator Sprint", brand: "TechGear", creator: "Mike Roy", channel: "YouTube", state: "Scheduled", scheduledAt: "2026-04-16 18:00" },
  { id: "PB-1003", content: "EcoStay Experience Reel", brand: "EcoStay", creator: "Emma Wilson", channel: "TikTok", state: "Published", scheduledAt: "2026-04-08 21:00" },
  { id: "PB-1004", content: "UrbanFuel Gym Story", brand: "UrbanFuel", creator: "Jannat Karim", channel: "Instagram", state: "Paused", scheduledAt: "2026-04-11 09:15" },
  { id: "PB-1005", content: "SunStyle Spring Drop", brand: "SunStyle", creator: "Tanvir Ahmed", channel: "Facebook", state: "Draft", scheduledAt: "2026-04-18 13:45" },
];

const assetItems: AssetItem[] = [
  { id: "AS-201", name: "Glow_Broll_Master.mp4", type: "Video", owner: "GlowCo", size: "184 MB", updatedAt: "2026-04-07" },
  { id: "AS-202", name: "TechGear_Hook_Variants.zip", type: "UGC Pack", owner: "TechGear", size: "46 MB", updatedAt: "2026-04-06" },
  { id: "AS-203", name: "EcoStay_ShotList.pdf", type: "Script", owner: "EcoStay", size: "2.3 MB", updatedAt: "2026-04-05" },
  { id: "AS-204", name: "UrbanFuel_Thumbnail_03.png", type: "Image", owner: "UrbanFuel", size: "1.4 MB", updatedAt: "2026-04-07" },
  { id: "AS-205", name: "SunStyle_Creative_Kit.zip", type: "UGC Pack", owner: "SunStyle", size: "72 MB", updatedAt: "2026-04-04" },
  { id: "AS-206", name: "Glow_Storyboard_v2.pdf", type: "Script", owner: "GlowCo", size: "3.1 MB", updatedAt: "2026-04-06" },
];

export default function ContentManagementPage() {
  const [rows, setRows] = useState<PublishRow[]>(publishRows);
  const [channelFilter, setChannelFilter] = useState<Channel | "All">("All");

  const filteredRows = useMemo(
    () => rows.filter((row) => (channelFilter === "All" ? true : row.channel === channelFilter)),
    [rows, channelFilter],
  );

  const metrics = useMemo(() => {
    const workflowDraft = workflowItems.filter((x) => x.stage === "Draft").length;
    const workflowReview = workflowItems.filter((x) => x.stage === "In Review").length;
    const scheduled = rows.filter((x) => x.state === "Scheduled").length;
    const published = rows.filter((x) => x.state === "Published").length;
    return { workflowDraft, workflowReview, scheduled, published };
  }, [rows]);

  function setState(id: string, state: PublishState) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, state } : row)));
  }

  return (
    <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">
 

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Draft Queue" value={metrics.workflowDraft} tone="slate" icon={<DraftIcon />} />
        <MetricCard label="In Review" value={metrics.workflowReview} tone="blue" icon={<ReviewIcon />} />
        <MetricCard label="Scheduled" value={metrics.scheduled} tone="amber" icon={<CalendarIcon />} />
        <MetricCard label="Published" value={metrics.published} tone="green" icon={<CheckIcon />} />
      </section>

      <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
            <PipelineIcon className="text-[#4d72b9]" />
            Workflow Board
          </h2>
          <span className="text-xs font-medium text-slate-500">Drag-and-drop ready structure</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <WorkflowColumn title="Draft" items={workflowItems.filter((x) => x.stage === "Draft")} />
          <WorkflowColumn title="In Review" items={workflowItems.filter((x) => x.stage === "In Review")} />
          <WorkflowColumn title="Scheduled" items={workflowItems.filter((x) => x.stage === "Scheduled")} />
          <WorkflowColumn title="Published" items={workflowItems.filter((x) => x.stage === "Published")} />
        </div>
      </section>

      <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
            <BroadcastIcon className="text-[#4d72b9]" />
            Publishing State Monitor
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Channel:</span>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value as Channel | "All")}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none"
            >
              <option>All</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>YouTube</option>
              <option>Facebook</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-black/5">
          <table className="min-w-full text-left">
            <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Scheduled</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {filteredRows.map((row) => (
                <tr key={row.id} className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{row.content}</p>
                    <p className="text-xs text-slate-500">{row.id}</p>
                  </td>
                  <td className="px-4 py-3">{row.brand}</td>
                  <td className="px-4 py-3">{row.creator}</td>
                  <td className="px-4 py-3">{row.channel}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stateClass(row.state)}`}>
                      {row.state}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{row.scheduledAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setState(row.id, "Published")}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#bce6c8] px-2.5 py-1 text-xs font-semibold text-[#2d8f4d] transition hover:bg-[#eefcf2]"
                      >
                        <CheckIcon />
                        Publish
                      </button>
                      <button
                        type="button"
                        onClick={() => setState(row.id, "Paused")}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#f1c2c2] px-2.5 py-1 text-xs font-semibold text-[#b54d4d] transition hover:bg-[#fff2f2]"
                      >
                        <PauseIcon />
                        Pause
                      </button>
                    </div>
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
            <AssetsIcon className="text-[#4d72b9]" />
            Asset Library
          </h2>
          <span className="rounded-full bg-[#e8f0ff] px-3 py-1 text-xs font-semibold text-[#4f6faa]">
            {assetItems.length} Assets
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {assetItems.map((asset) => (
            <article
              key={asset.id}
              className="rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 transition hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">{asset.name}</p>
                <span className="rounded-full bg-[#edf3ff] px-2 py-0.5 text-[11px] font-semibold text-[#4d72b9]">
                  {asset.type}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Owner: {asset.owner}</p>
              <p className="mt-1 text-xs text-slate-500">Size: {asset.size}</p>
              <p className="mt-1 text-xs text-slate-500">Updated: {asset.updatedAt}</p>
              <div className="mt-3 flex gap-2">
                <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#bfd4ff] px-2.5 py-1 text-xs font-semibold text-[#4d72b9] transition hover:bg-[#ecf3ff]">
                  <ViewIcon />
                  View
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                  <DownloadIcon />
                  Download
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#f3c1c8] px-2.5 py-1 text-xs font-semibold text-[#bd4a59] transition hover:bg-[#fff1f3]">
                  <ArchiveIcon />
                  Archive
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value, tone, icon }: { label: string; value: number; tone: "slate" | "blue" | "amber" | "green"; icon: React.ReactNode; }) {
  const iconToneClass =
    tone === "slate"
      ? "border-slate-200 bg-white text-slate-500"
      : tone === "blue"
        ? "border-[#cfe1ff] bg-[#edf4ff] text-[#3c66ab]"
        : tone === "amber"
          ? "border-[#f2dfbf] bg-[#fff6e9] text-[#a16b1f]"
          : "border-[#cfe9d8] bg-[#eefaf2] text-[#2f8d53]";

  return (
    <article className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
      <div className="rounded-2xl border border-slate-200 bg-[#f8f9fb] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <span className={`rounded-lg border p-1.5 ${iconToneClass}`}>{icon}</span>
        </div>
        <p className="mt-1 text-3xl font-semibold text-slate-800">{value}</p>
      </div>
    </article>
  );
}

function WorkflowColumn({ title, items }: { title: WorkflowStage; items: WorkflowItem[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[#f8f9fb] p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500">{items.length}</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-black/5 bg-white p-3">
            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
            <p className="mt-1 text-xs text-slate-500">{item.brand} x {item.creator}</p>
            <p className="mt-1 text-[11px] text-slate-400">Due: {item.dueDate}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function stateClass(state: PublishState) {
  if (state === "Published") return "bg-[#def5e5] text-[#2d8f4d]";
  if (state === "Scheduled") return "bg-[#fff6e8] text-[#b4721f]";
  if (state === "Review") return "bg-[#e8f0ff] text-[#4f6faa]";
  if (state === "Paused") return "bg-[#fff2f2] text-[#b54d4d]";
  return "bg-[#f3f4f6] text-[#5f6b7a]";
}

function iconWrap(path: React.ReactNode, className?: string) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      {path}
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return iconWrap(
    <>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    </>,
    className,
  );
}

function PipelineIcon({ className }: { className?: string }) {
  return iconWrap(
    <>
      <rect x="3" y="6" width="5" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="10" y="9" width="5" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="17" y="4" width="4" height="14" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
    </>,
    className,
  );
}

function BroadcastIcon({ className }: { className?: string }) {
  return iconWrap(
    <>
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M16.5 7.5a6.4 6.4 0 0 1 0 9" stroke="currentColor" strokeWidth="1.8" />
    </>,
    className,
  );
}

function AssetsIcon({ className }: { className?: string }) {
  return iconWrap(
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.8" />
    </>,
    className,
  );
}

function DraftIcon() {
  return iconWrap(<path d="M6 7h12M6 12h9M6 17h7" stroke="currentColor" strokeWidth="1.8" />);
}

function ReviewIcon() {
  return iconWrap(
    <>
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function CalendarIcon() {
  return iconWrap(
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" />
    </>,
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

function ViewIcon() {
  return iconWrap(
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function DownloadIcon() {
  return iconWrap(
    <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" />,
  );
}

function ArchiveIcon() {
  return iconWrap(
    <>
      <rect x="3" y="5" width="18" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 10h14v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9ZM9 14h6" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}
