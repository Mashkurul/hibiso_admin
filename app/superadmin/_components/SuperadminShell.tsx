"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SuperadminSidebar } from "./SuperadminSidebar";
import { TopNavbar } from "./TopNavbar";

export function SuperadminShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[#f0efed]">
      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 md:hidden ${
          isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden={!isSidebarOpen}
      />

      <div
        className={`fixed left-0 top-0 z-50 h-screen w-[248px] transition-transform duration-200 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SuperadminSidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      <div className="fixed left-0 top-0 z-30 hidden h-screen w-[248px] md:block">
        <SuperadminSidebar />
      </div>

      <div className="min-h-screen md:ml-[248px]">
        <TopNavbar onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 pb-8 sm:px-5 md:px-8">{children}</main>
      </div>
    </div>
  );
}
