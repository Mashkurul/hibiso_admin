"use client";

import { useEffect, useMemo, useState } from "react";

const chartData = [
  { month: "Jan", value: 178 },
  { month: "Feb", value: 192 },
  { month: "Mar", value: 185 },
  { month: "Apr", value: 214 },
  { month: "May", value: 203 },
  { month: "Jun", value: 224 },
];

const WIDTH = 820;
const HEIGHT = 280;
const PADDING_X = 30;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 46;

type ChartPoint = {
  month: string;
  value: number;
  x: number;
  y: number;
};

function buildPoints() {
  const values = chartData.map((d) => d.value);
  const min = Math.min(...values) - 16;
  const max = Math.max(...values) + 16;
  const chartHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const chartWidth = WIDTH - PADDING_X * 2;

  return chartData.map((point, index) => {
    const ratio = (point.value - min) / (max - min || 1);
    return {
      ...point,
      x: PADDING_X + (index * chartWidth) / Math.max(chartData.length - 1, 1),
      y: HEIGHT - PADDING_BOTTOM - ratio * chartHeight,
    };
  });
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

function gridLines() {
  const rowCount = 4;
  const lines: number[] = [];
  for (let i = 0; i <= rowCount; i += 1) {
    lines.push(PADDING_TOP + (i * (HEIGHT - PADDING_TOP - PADDING_BOTTOM)) / rowCount);
  }
  return lines;
}

export function InteractiveRevenueChart() {
  const points = useMemo(() => buildPoints(), []);
  const rows = useMemo(() => gridLines(), []);
  const [activeIndex, setActiveIndex] = useState<number>(chartData.length - 1);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const activePoint = points[activeIndex];

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(255,255,255,0.88),rgba(247,247,248,0.6))] p-2.5">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-[210px] w-full md:h-[225px]"
          onMouseLeave={() => setActiveIndex(chartData.length - 1)}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const relativeX = ((event.clientX - rect.left) / rect.width) * WIDTH;
            let nearest = 0;
            let nearestDistance = Number.POSITIVE_INFINITY;

            points.forEach((point, index) => {
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
            <linearGradient id="overviewRevenueArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#efb06e" stopOpacity="0.42" />
              <stop offset="75%" stopColor="#efb06e" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#efb06e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="overviewRevenueLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c97814" />
              <stop offset="55%" stopColor="#e4901d" />
              <stop offset="100%" stopColor="#f06f58" />
            </linearGradient>
            <filter id="overviewGlow" x="-20%" y="-30%" width="140%" height="170%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {rows.map((y, idx) => (
            <line
              key={idx}
              x1={PADDING_X}
              y1={y}
              x2={WIDTH - PADDING_X}
              y2={y}
              stroke="#ddd8d1"
              strokeOpacity="0.72"
              strokeDasharray="4 8"
            />
          ))}

          <path
            d={areaPath(points)}
            fill="url(#overviewRevenueArea)"
            opacity={revealed ? 1 : 0}
            style={{ transition: "opacity 700ms ease 120ms" }}
          />
          <path
            d={linePath(points)}
            fill="none"
            stroke="url(#overviewRevenueLine)"
            strokeWidth="3.1"
            strokeLinecap="round"
            filter="url(#overviewGlow)"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: revealed ? 0 : 1,
              transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          <line
            x1={activePoint.x}
            x2={activePoint.x}
            y1={PADDING_TOP}
            y2={HEIGHT - PADDING_BOTTOM}
            stroke="#cabfb0"
            strokeDasharray="4 7"
          />
          <circle cx={activePoint.x} cy={activePoint.y} r="5.8" fill="#e4901d" />
          <circle cx={activePoint.x} cy={activePoint.y} r="12" fill="#e4901d" fillOpacity="0.22" />
        </svg>

        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-xl border border-[#ebdbcb] bg-[linear-gradient(180deg,#fffdfb,#fff7ef)] px-3 py-2 shadow-[0_16px_30px_rgba(169,119,52,0.18)]"
          style={{
            left: `${(activePoint.x / WIDTH) * 100}%`,
            top: `${Math.max(((activePoint.y - 54) / HEIGHT) * 100, 2)}%`,
          }}
        >
          <p className="text-[11px] font-semibold tracking-wide text-slate-700">{activePoint.month}</p>
          <p className="mt-1 text-xs font-semibold text-[#ca7a16]">EUR {activePoint.value}k</p>
        </div>

        <div className="mt-2 grid grid-cols-6 text-center text-xs font-medium text-slate-400">
          {chartData.map((point, index) => (
            <span key={point.month} className={index === activeIndex ? "text-slate-700" : ""}>
              {point.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
