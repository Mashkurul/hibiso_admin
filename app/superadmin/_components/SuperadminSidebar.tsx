"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  { href: "/superadmin", label: "Overview", icon: <GridIcon /> },
  { href: "/superadmin/brands", label: "Brands", icon: <BriefcaseIcon /> },
  { href: "/superadmin/creators", label: "Creators", icon: <UsersIcon /> },
  { href: "/superadmin/revenue", label: "Revenue", icon: <DollarIcon /> },
  {
    href: "/superadmin/campaign-management",
    label: "Campaign Management",
    icon: <MegaphoneIcon />,
  },
  { href: "/superadmin/contests", label: "Contests", icon: <TrophyIcon /> },
  {
    href: "/superadmin/content-management",
    label: "Content Management",
    icon: <FolderIcon />,
  },
  { href: "/superadmin/payments", label: "Payments", icon: <CardIcon /> },
  { href: "/superadmin/settings", label: "Settings", icon: <GearIcon /> },
];

export function SuperadminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[248px] flex-col border-r border-white/10 bg-[#232221] text-slate-300">
      <div className="px-5 pt-6">
        <Link href="/superadmin" onClick={onNavigate} className="block">
          <div className="relative h-16 w-[132px]">
            <Image src="/hibiso_logo.svg" alt="Hibiso logo" fill className="object-contain object-left" priority />
          </div>
        </Link>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">
          Admin Workspace
        </p>
        <div className="mt-3 h-px w-full bg-white/12" />
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto px-3">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#f5a531] to-[#ea6e57] text-white"
                      : "text-slate-400 hover:bg-white/6 hover:text-slate-100"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-3 py-5">
        <button
          type="button"
          onClick={onNavigate}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <SignOutIcon />
          <span>Sign Out</span>
        </button>
        <p className="mt-4 px-3 text-[11px] text-slate-500">Solar Powered Creativity</p>
      </div>
    </aside>
  );
}

function iconWrapper(path: ReactNode) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {path}
    </svg>
  );
}

function GridIcon() {
  return iconWrapper(
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function BriefcaseIcon() {
  return iconWrapper(
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V5.7A1.7 1.7 0 0 1 9.7 4h4.6A1.7 1.7 0 0 1 16 5.7V7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function UsersIcon() {
  return iconWrapper(
    <>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 18a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14.5 18a4 4 0 0 1 5.5-3.7" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function DollarIcon() {
  return iconWrapper(
    <>
      <path d="M12 3v18" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 7.5c0-1.9-1.8-3-4.5-3S7.5 5.6 7.5 7.5 9.3 10.5 12 10.5s4.5 1.1 4.5 3-1.8 3-4.5 3-4.5-1.1-4.5-3" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function MegaphoneIcon() {
  return iconWrapper(
    <>
      <path d="M4 13V9l11-4v12L4 13Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 9h2.5a2.5 2.5 0 0 1 0 5H15" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 13.7 7.5 19h2l-1.2-4.7" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function TrophyIcon() {
  return iconWrapper(
    <>
      <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 16h6M12 12v4M8 20h8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 6H4a3 3 0 0 0 3 3M17 6h3a3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function FolderIcon() {
  return iconWrapper(
    <>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function CardIcon() {
  return iconWrapper(
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    </>,
  );
}

function GearIcon() {
  return iconWrapper(
    <>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m19 12 1.7-1-1-3-2 .2-.9-1.5 1-1.7-2.7-1.6-1.2 1.3h-1.8L10.9 2 8.2 3.6l1 1.7-.9 1.5-2-.2-1 3L7 12l-1.7 1 1 3 2-.2.9 1.5-1 1.7 2.7 1.6 1.2-1.3h1.8l1.2 1.3 2.7-1.6-1-1.7.9-1.5 2 .2 1-3Z" stroke="currentColor" strokeWidth="1.2" />
    </>,
  );
}

function SignOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4-4-4-4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 12H10" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
