import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { InteractiveRevenueChart } from "./_components/InteractiveRevenueChart";

const statCards = [
  {
    label: "Total Brands",
    value: "47",
    href: "/superadmin/brands",
    icon: <BagIcon />,
    iconBg: "bg-[#ecf2e7]",
    iconColor: "text-[#7f9a70]",
  },
  {
    label: "Total Creators",
    value: "312",
    href: "/superadmin/creators",
    icon: <UsersIcon />,
    iconBg: "bg-[#f8f2e6]",
    iconColor: "text-[#da8b1d]",
  },
  {
    label: "Revenue",
    value: "€284k",
    href: "/superadmin/revenue",
    icon: <DollarIcon />,
    iconBg: "bg-[#fae9ea]",
    iconColor: "text-[#e95568]",
  },
  {
    label: "Active Contests",
    value: "5",
    href: "/superadmin/campaign-management",
    icon: <TrophyIcon />,
    iconBg: "bg-[#fff3ed]",
    iconColor: "text-[#ea7448]",
  },
];

const approvals = [
  {
    title: "Summer Vlog",
    subtitle: "Sarah J. - GlowCo",
    image: "/harry-kessell-eE2trMn-6a0-unsplash.jpg",
  },
  {
    title: "Product Unboxing",
    subtitle: "Mike R. - TechGear",
    image: "/james-ting-6N2mSJsKTtA-unsplash.jpg",
  },
  {
    title: "Resort Tour",
    subtitle: "Emma W. - EcoStay",
    image: "/marvin-castelino-0BJN4vE-ITU-unsplash.jpg",
  },
  {
    title: "Swimwear Haul",
    subtitle: "Jessica L. - SunStyle",
    image: "/harry-kessell-eE2trMn-6a0-unsplash.jpg",
  },
];

const flagged = [{ creator: "Creator 1" }, { creator: "Creator 2" }];

export default function OverviewPage() {
  return (
    <div className="rounded-3xl bg-[#f1f0ee] p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="block">
            <article className="rounded-2xl bg-white/70 p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="text-[28px] font-semibold leading-none text-slate-800">
                    {card.value}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:items-start xl:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <section className="self-start rounded-3xl bg-white/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] md:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-[24px] font-semibold text-slate-800 md:text-[26px]">
                Revenue Overview
              </h2>
              <span className="rounded-full bg-[#d8f0df] px-3 py-1 text-xs font-semibold text-[#2b9354]">
                +18% VS LAST MONTH
              </span>
            </div>
            <InteractiveRevenueChart />
          </section>

          <section className="rounded-3xl bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)]">
            <h3 className="text-lg font-semibold text-slate-800">Platform Health</h3>
            <div className="mt-4 space-y-3">
              <HealthRow
                label="User Growth"
                value="+12%"
                barClass="bg-[#2db255]"
                width="w-[76%]"
                valueClass="text-[#2db255]"
              />
              <HealthRow
                label="Content Volume"
                value="+24%"
                barClass="bg-[#de8c1e]"
                width="w-[86%]"
                valueClass="text-[#de8c1e]"
              />
              <HealthRow
                label="Avg Response"
                value="2.4h"
                barClass="bg-[#8ea178]"
                width="w-[92%]"
                valueClass="text-[#6a7f52]"
              />
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-3xl bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)]">
            <Link
              href="/superadmin/contests"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#dd8a1d] to-[#e76e59] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.01]"
            >
              <span className="inline-flex items-center gap-2">
                <CheckIcon />
                Approve All Pending
              </span>
            </Link>
            <Link
              href="/superadmin/contests"
              className="mt-3 block w-full rounded-full border border-[#8cb3ff] px-5 py-3 text-center text-sm font-semibold text-slate-400 transition-all duration-200 hover:border-[#6ea1ff] hover:bg-[#f4f8ff] hover:text-slate-600"
            >
              More Settings
            </Link>
            <Link
              href="/superadmin/contests"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#d8dbe2] px-5 py-3 text-sm font-semibold text-slate-500 transition-all duration-200 hover:border-[#c1c8d4] hover:bg-[#f5f7fb] hover:text-slate-700"
            >
              Export Details
            </Link>
          </section>

          <section className="rounded-3xl bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)]">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#e65163]">
              <AlertIcon /> Flagged Content
            </h3>
            <div className="mt-4 space-y-3">
              {flagged.map((item, index) => (
                <article
                  key={index}
                  className="rounded-2xl border border-[#f3d2d7] bg-[#fff4f6] p-3 transition-all duration-200 hover:border-[#efbcc5] hover:bg-[#fff8f9]"
                >
                  <div className="flex gap-3">
                    <div className="h-14 w-14 rounded-lg bg-slate-300" />
                    <div>
                      <p className="text-[11px] font-bold text-[#e65163]">COPYRIGHT CLAIM</p>
                      <p className="mt-1 text-sm text-slate-700">{item.creator}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Review</span> &nbsp; Dismiss
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="mt-5 rounded-3xl bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-[30px] font-semibold text-slate-800">Content Approvals</h2>
          <span className="rounded-full bg-[#f3e8a9] px-3 py-1 text-xs font-semibold text-[#a07f1a]">
            4 PENDING
          </span>
        </div>
        <div className="space-y-3">
          {approvals.map((item) => (
            <Link key={item.title} href="/superadmin/content-management" className="block">
              <article className="flex items-center justify-between rounded-2xl bg-[#f6f7f8] p-3 transition-all duration-200 hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-white/70">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-slate-800">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b9e9c7] bg-[#ecfbf1] text-[#2db255] transition-transform duration-200 hover:scale-110">
                    <CheckIcon />
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f4c5cb] bg-[#fff1f3] text-[#e65163] transition-transform duration-200 hover:scale-110">
                    <CloseIcon />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function HealthRow({
  label,
  value,
  barClass,
  width,
  valueClass,
}: {
  label: string;
  value: string;
  barClass: string;
  width: string;
  valueClass: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className={`font-semibold ${valueClass}`}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#dde2de]">
        <div className={`h-1.5 rounded-full ${barClass} ${width}`} />
      </div>
    </div>
  );
}

function iconWrap(path: ReactNode) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {path}
    </svg>
  );
}

function BagIcon() {
  return iconWrap(
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 8V6.8A1.8 1.8 0 0 1 9.8 5h4.4A1.8 1.8 0 0 1 16 6.8V8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </>,
  );
}

function UsersIcon() {
  return iconWrap(
    <>
      <circle cx="9" cy="9" r="2.7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.6 18a4.4 4.4 0 0 1 8.8 0" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="9.6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </>,
  );
}

function DollarIcon() {
  return iconWrap(
    <>
      <path d="M12 4.5v15" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M16 7.8c0-1.4-1.7-2.3-4-2.3s-4 1-4 2.3 1.7 2.3 4 2.3 4 1 4 2.3-1.7 2.3-4 2.3-4-1-4-2.3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </>,
  );
}

function TrophyIcon() {
  return iconWrap(
    <>
      <path d="M7.5 5.5h9V8a4.5 4.5 0 0 1-9 0V5.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 17.5h5M12 12.5v5M8.5 20h7" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M7.5 7H5.2a2.5 2.5 0 0 0 2.3 2.5M16.5 7h2.3a2.5 2.5 0 0 1-2.3 2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </>,
  );
}

function CheckIcon() {
  return iconWrap(<path d="m6 12 4 4 8-8" stroke="currentColor" strokeWidth="1.8" />);
}

function CloseIcon() {
  return iconWrap(
    <>
      <path d="m8 8 8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function AlertIcon() {
  return iconWrap(
    <>
      <path d="M12 4.8 4.8 18h14.4L12 4.8Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 9v4.6M12 16.2h.01" stroke="currentColor" strokeWidth="1.7" />
    </>,
  );
}
