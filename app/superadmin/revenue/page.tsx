"use client";

import { useEffect, useMemo, useState } from "react";

type RevenuePoint = {
  month: string;
  creator: number;
  brand: number;
};

type CommissionRow = {
  id: string;
  sourceType: "Brand" | "Creator";
  source: string;
  campaign: string;
  gross: number;
  rate: number;
  commission: number;
  status: "Paid" | "Pending";
};

type ChartPoint = {
  x: number;
  y: number;
};

const monthlyRevenue: RevenuePoint[] = [
  { month: "Jan", creator: 18.4, brand: 26.1 },
  { month: "Feb", creator: 21.2, brand: 29.8 },
  { month: "Mar", creator: 19.9, brand: 28.6 },
  { month: "Apr", creator: 24.4, brand: 33.2 },
  { month: "May", creator: 26.1, brand: 36.5 },
  { month: "Jun", creator: 27.8, brand: 39.4 },
  { month: "Jul", creator: 31.3, brand: 42.7 },
  { month: "Aug", creator: 29.6, brand: 40.9 },
  { month: "Sep", creator: 33.5, brand: 45.8 },
  { month: "Oct", creator: 35.9, brand: 49.6 },
  { month: "Nov", creator: 38.1, brand: 52.3 },
  { month: "Dec", creator: 41.4, brand: 56.8 },
];

const commissionRows: CommissionRow[] = [
  {
    id: "CM-101",
    sourceType: "Brand",
    source: "GlowCo",
    campaign: "Summer Product Drop",
    gross: 43800,
    rate: 11,
    commission: 4818,
    status: "Paid",
  },
  {
    id: "CM-102",
    sourceType: "Creator",
    source: "Sarah Johnson",
    campaign: "Beauty UGC Package",
    gross: 19400,
    rate: 8,
    commission: 1552,
    status: "Pending",
  },
  {
    id: "CM-103",
    sourceType: "Brand",
    source: "TechGear",
    campaign: "Creator Tech Sprint",
    gross: 32750,
    rate: 10,
    commission: 3275,
    status: "Paid",
  },
  {
    id: "CM-104",
    sourceType: "Creator",
    source: "Mike Roy",
    campaign: "Tech Review Bundle",
    gross: 16700,
    rate: 8,
    commission: 1336,
    status: "Paid",
  },
  {
    id: "CM-105",
    sourceType: "Brand",
    source: "UrbanFuel",
    campaign: "Lifestyle Retargeting",
    gross: 29800,
    rate: 10,
    commission: 2980,
    status: "Pending",
  },
  {
    id: "CM-106",
    sourceType: "Creator",
    source: "Jannat Karim",
    campaign: "Fashion Launch Reel",
    gross: 22800,
    rate: 9,
    commission: 2052,
    status: "Paid",
  },
];

const WIDTH = 980;
const HEIGHT = 360;
const PADDING_X = 42;
const PADDING_TOP = 28;
const PADDING_BOTTOM = 46;

function buildPoints(values: number[]) {
  const min = Math.min(...values) * 0.88;
  const max = Math.max(...values) * 1.08;
  const chartHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const chartWidth = WIDTH - PADDING_X * 2;

  const points = values.map((value, index) => {
    const ratio = (value - min) / (max - min || 1);
    return {
      x: PADDING_X + (index * chartWidth) / Math.max(values.length - 1, 1),
      y: HEIGHT - PADDING_BOTTOM - ratio * chartHeight,
    };
  });

  return { points, min, max };
}

function linePath(points: ChartPoint[]) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    d += ` C ${controlX.toFixed(2)} ${current.y.toFixed(2)}, ${controlX.toFixed(2)} ${next.y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`;
  }

  return d;
}

function areaPath(points: ChartPoint[]) {
  if (points.length === 0) return "";
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath(points)} L ${last.x.toFixed(2)} ${(HEIGHT - PADDING_BOTTOM).toFixed(2)} L ${first.x.toFixed(2)} ${(HEIGHT - PADDING_BOTTOM).toFixed(2)} Z`;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function currencyCompact(value: number) {
  const rounded = Math.round(value);

  if (rounded >= 1_000_000) {
    const m = (rounded / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `€${m}M`;
  }

  if (rounded >= 1_000) {
    const k = (rounded / 1_000).toFixed(1).replace(/\.0$/, "");
    return `€${k}K`;
  }

  return `€${rounded}`;
}

export default function RevenuePage() {
  const [activeIndex, setActiveIndex] = useState<number>(monthlyRevenue.length - 1);
  const [revealed, setRevealed] = useState(false);
  const [reportRowId, setReportRowId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!reportRowId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [reportRowId]);

  const creatorValues = useMemo(() => monthlyRevenue.map((m) => m.creator), []);
  const brandValues = useMemo(() => monthlyRevenue.map((m) => m.brand), []);
  const combinedValues = useMemo(
    () => monthlyRevenue.map((m) => Math.max(m.creator, m.brand)),
    [],
  );

  const creatorResult = useMemo(() => buildPoints(creatorValues), [creatorValues]);
  const brandResult = useMemo(() => buildPoints(brandValues), [brandValues]);
  const yScale = useMemo(() => buildPoints(combinedValues), [combinedValues]);

  const yTicks = useMemo(() => {
    const rows = 5;
    const out: { y: number; value: number }[] = [];
    for (let i = 0; i <= rows; i += 1) {
      const ratio = i / rows;
      const y = PADDING_TOP + ratio * (HEIGHT - PADDING_TOP - PADDING_BOTTOM);
      const value = yScale.max - ratio * (yScale.max - yScale.min);
      out.push({ y, value });
    }
    return out;
  }, [yScale.max, yScale.min]);

  const activeMonth = monthlyRevenue[activeIndex];
  const activeBrandPoint = brandResult.points[activeIndex];
  const activeCreatorPoint = creatorResult.points[activeIndex];

  const totalBrandCommission = commissionRows
    .filter((row) => row.sourceType === "Brand")
    .reduce((sum, row) => sum + row.commission, 0);
  const totalCreatorCommission = commissionRows
    .filter((row) => row.sourceType === "Creator")
    .reduce((sum, row) => sum + row.commission, 0);
  const totalCommission = totalBrandCommission + totalCreatorCommission;
  const selectedReportRow = useMemo(
    () => commissionRows.find((row) => row.id === reportRowId) ?? null,
    [reportRowId],
  );

  function downloadCampaignReport(row: CommissionRow) {
    const generatedAt = new Date().toLocaleString();
    const reportText = [
      "HIBISO SUPERADMIN - CAMPAIGN COMMISSION REPORT",
      "--------------------------------------------",
      `Report ID: ${row.id}`,
      `Generated At: ${generatedAt}`,
      "",
      "CAMPAIGN DETAILS",
      `Campaign: ${row.campaign}`,
      `Source Type: ${row.sourceType}`,
      `Source Name: ${row.source}`,
      "",
      "FINANCIAL SUMMARY",
      `Gross Amount: ${currency(row.gross)}`,
      `Commission Rate: ${row.rate}%`,
      `Commission Amount: ${currency(row.commission)}`,
      `Payout Status: ${row.status}`,
      "",
      "NOTES",
      "This report is auto-generated from the admin commission ledger.",
    ].join("\n");

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const fileUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const safeCampaign = row.campaign.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    anchor.href = fileUrl;
    anchor.download = `commission-report-${row.id}-${safeCampaign}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(fileUrl);
  }

  return (
    <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">


      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Total Commission"
          value={currencyCompact(totalCommission)}
          subtitle="Combined brand + creator share"
          tone="blue"
        />
        <SummaryCard
          label="Brand Commission"
          value={currencyCompact(totalBrandCommission)}
          subtitle="From brand campaign billing"
          tone="amber"
        />
        <SummaryCard
          label="Creator Commission"
          value={currencyCompact(totalCreatorCommission)}
          subtitle="From creator package fees"
          tone="rose"
        />
      </section>

      <section className="relative rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Commission Trend</h2>
            <p className="text-sm text-slate-500">
              Smooth comparison of brand and creator commission flow.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4901d]" />
              Brand
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e55b77]" />
              Creator
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(255,255,255,0.85),rgba(247,247,248,0.55))] p-3">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-[280px] w-full md:h-[340px]"
            onMouseLeave={() => setActiveIndex(monthlyRevenue.length - 1)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const relativeX = ((event.clientX - rect.left) / rect.width) * WIDTH;
              let nearest = 0;
              let nearestDistance = Number.POSITIVE_INFINITY;

              brandResult.points.forEach((point, index) => {
                const distance = Math.abs(point.x - relativeX);
                if (distance < nearestDistance) {
                  nearestDistance = distance;
                  nearest = index;
                }
              });

              setActiveIndex(nearest);
            }}
          >
            <defs>
              <linearGradient id="brandLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c97814" />
                <stop offset="55%" stopColor="#e4901d" />
                <stop offset="100%" stopColor="#f06f58" />
              </linearGradient>
              <linearGradient id="creatorLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#cd3f73" />
                <stop offset="55%" stopColor="#e55b77" />
                <stop offset="100%" stopColor="#f4a37d" />
              </linearGradient>
              <linearGradient id="brandArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#efb06e" stopOpacity="0.42" />
                <stop offset="75%" stopColor="#efb06e" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#efb06e" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="creatorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ee87a3" stopOpacity="0.34" />
                <stop offset="75%" stopColor="#ee87a3" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ee87a3" stopOpacity="0" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-30%" width="140%" height="170%">
                <feGaussianBlur stdDeviation="3.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {yTicks.map((tick, index) => (
              <g key={index}>
                <line
                  x1={PADDING_X}
                  x2={WIDTH - PADDING_X}
                  y1={tick.y}
                  y2={tick.y}
                  stroke="#ddd8d1"
                  strokeOpacity="0.7"
                  strokeDasharray="4 8"
                />
                <text
                  x={PADDING_X - 12}
                  y={tick.y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[11px]"
                >
                  {currencyCompact(tick.value * 1000)}
                </text>
              </g>
            ))}

            <path
              d={areaPath(brandResult.points)}
              fill="url(#brandArea)"
              opacity={revealed ? 1 : 0}
              style={{ transition: "opacity 700ms ease 180ms" }}
            />
            <path
              d={areaPath(creatorResult.points)}
              fill="url(#creatorArea)"
              opacity={revealed ? 1 : 0}
              style={{ transition: "opacity 700ms ease 260ms" }}
            />

            <path
              d={linePath(brandResult.points)}
              fill="none"
              stroke="url(#brandLine)"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#softGlow)"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: revealed ? 0 : 1,
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <path
              d={linePath(creatorResult.points)}
              fill="none"
              stroke="url(#creatorLine)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: revealed ? 0 : 1,
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1) 120ms",
              }}
            />

            <line
              x1={activeBrandPoint.x}
              x2={activeBrandPoint.x}
              y1={PADDING_TOP}
              y2={HEIGHT - PADDING_BOTTOM}
              stroke="#cabfb0"
              strokeDasharray="4 7"
            />

            <circle cx={activeBrandPoint.x} cy={activeBrandPoint.y} r="5.8" fill="#e4901d" />
            <circle
              cx={activeBrandPoint.x}
              cy={activeBrandPoint.y}
              r="12"
              fill="#e4901d"
              fillOpacity="0.22"
            />

            <circle cx={activeCreatorPoint.x} cy={activeCreatorPoint.y} r="5.6" fill="#e55b77" />
            <circle
              cx={activeCreatorPoint.x}
              cy={activeCreatorPoint.y}
              r="11.5"
              fill="#e55b77"
              fillOpacity="0.2"
            />
          </svg>

          <div
            className="pointer-events-none absolute -translate-x-1/2 rounded-xl border border-[#ebdbcb] bg-[linear-gradient(180deg,#fffdfb,#fff7ef)] px-3 py-2 shadow-[0_16px_30px_rgba(169,119,52,0.18)]"
            style={{
              left: `${(activeBrandPoint.x / WIDTH) * 100}%`,
              top: `${Math.max(((Math.min(activeBrandPoint.y, activeCreatorPoint.y) - 60) / HEIGHT) * 100, 2)}%`,
            }}
          >
            <p className="text-[11px] font-semibold tracking-wide text-slate-700">{activeMonth.month}</p>
            <p className="mt-1 text-xs font-semibold text-[#ca7a16]">
              Brand: {currency(activeMonth.brand * 1000)}
            </p>
            <p className="text-xs font-semibold text-[#cf4f74]">
              Creator: {currency(activeMonth.creator * 1000)}
            </p>
            <p className="mt-1 border-t border-[#f0e6d9] pt-1 text-xs font-bold text-slate-700">
              Total: {currency((activeMonth.brand + activeMonth.creator) * 1000)}
            </p>
          </div>

          <div className="mt-2 grid grid-cols-12 text-center text-xs font-medium text-slate-400">
            {monthlyRevenue.map((point, index) => (
              <span
                key={point.month}
                className={index === activeIndex ? "text-slate-700" : ""}
              >
                {point.month}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">All Commission Records</h2>
          <span className="rounded-full bg-[#e8f0ff] px-3 py-1 text-xs font-semibold text-[#4f6faa]">
            {commissionRows.length} Entries
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-black/5">
          <table className="min-w-full text-left">
            <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">
                  <span className="inline-flex items-center gap-1">
                    <EuroIcon />
                    Gross
                  </span>
                </th>
                <th className="px-4 py-3">Rate</th>
                <th className="px-4 py-3">
                  <span className="inline-flex items-center gap-1">
                    <EuroIcon />
                    Commission
                  </span>
                </th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {commissionRows.map((row) => (
                <tr key={row.id} className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]">
                  <td className="px-4 py-3 font-semibold">{row.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{row.source}</p>
                    <p className="text-xs text-slate-500">{row.sourceType}</p>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setReportRowId(row.id)}
                      className="rounded-lg border border-[#bfd4ff] px-2.5 py-1 text-left text-sm font-semibold text-[#3c66ab] transition hover:bg-[#ecf3ff]"
                    >
                      {row.campaign}
                    </button>
                  </td>
                  <td className="px-4 py-3">{currency(row.gross)}</td>
                  <td className="px-4 py-3">{row.rate}%</td>
                  <td className="px-4 py-3 font-semibold text-[#2f7ef7]">
                    {currency(row.commission)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        row.status === "Paid"
                          ? "bg-[#def5e5] text-[#2d8f4d]"
                          : "bg-[#fff6e8] text-[#b4721f]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedReportRow && (
          <div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-24 md:absolute md:inset-0 md:z-20 md:items-center md:overflow-visible md:rounded-3xl md:p-4 md:pt-4"
            onClick={() => setReportRowId(null)}
          >
            <div
              className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Campaign Report</h3>
                  <p className="text-xs text-slate-500">Report ID: {selectedReportRow.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReportRowId(null)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-100"
                >
                  <CloseIcon />
                  Close
                </button>
              </div>

              <div className="grid gap-3 rounded-xl border border-black/5 bg-[#f8f9fb] p-4 text-sm md:grid-cols-2">
                <ReportLine label="Campaign" value={selectedReportRow.campaign} />
                <ReportLine
                  label="Source"
                  value={`${selectedReportRow.source} (${selectedReportRow.sourceType})`}
                />
                <ReportLine label="Gross Amount" value={currency(selectedReportRow.gross)} />
                <ReportLine label="Commission Rate" value={`${selectedReportRow.rate}%`} />
                <ReportLine label="Commission" value={currency(selectedReportRow.commission)} />
                <ReportLine label="Status" value={selectedReportRow.status} />
              </div>

              <div className="mt-4 rounded-xl border border-black/5 bg-white p-4">
                <p className="text-sm font-semibold text-slate-800">Campaign Insight</p>
                <p className="mt-2 text-sm text-slate-600">
                  This campaign generated a gross billing of{" "}
                  <span className="font-semibold text-slate-800">
                    {currency(selectedReportRow.gross)}
                  </span>{" "}
                  with a platform commission of{" "}
                  <span className="font-semibold text-[#2f7ef7]">
                    {currency(selectedReportRow.commission)}
                  </span>
                  . The configured commission rate is{" "}
                  <span className="font-semibold text-slate-800">{selectedReportRow.rate}%</span>.
                </p>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportRowId(null)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => downloadCampaignReport(selectedReportRow)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f7ef7] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <DownloadIcon />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  subtitle,
  tone,
}: {
  label: string;
  value: string;
  subtitle: string;
  tone: "blue" | "amber" | "rose";
}) {
  void tone;

  return (
    <article className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
      <div className="rounded-2xl border border-slate-200 bg-[#f8f9fb] p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
    </article>
  );
}

function EuroIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.5 6.5A6 6 0 0 0 7.8 9.5M7.8 14.5A6 6 0 0 0 16.5 17.5M6 10.5h7M6 13.5h7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
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

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ReportLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-slate-700">
      <span className="font-semibold text-slate-800">{label}:</span> {value}
    </p>
  );
}
