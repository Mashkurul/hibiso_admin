import type { ReactNode } from "react";
import { SuperadminSidebar } from "./_components/SuperadminSidebar";
import { TopNavbar } from "./_components/TopNavbar";

export default function SuperadminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0efed]">
      <div className="fixed left-0 top-0 z-30 h-screen w-[248px]">
        <SuperadminSidebar />
      </div>
      <div className="ml-[248px] min-h-screen bg-[#f0efed]">
        <TopNavbar />
        <main className="px-5 pb-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
