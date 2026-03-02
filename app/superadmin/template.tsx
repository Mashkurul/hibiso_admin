"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function SuperadminTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-open">
      {children}
    </div>
  );
}
