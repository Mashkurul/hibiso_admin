"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BrandStatus = "Active" | "Deactive";
type BrandPlan = "Starter" | "Growth" | "Pro" | "Enterprise";

type Brand = {
  id: string;
  name: string;
  industry: string;
  manager: string;
  email: string;
  campaigns: number;
  spend: string;
  status: BrandStatus;
  plan: BrandPlan;
  initials: string;
  accent: string;
};

const initialBrands: Brand[] = [
  {
    id: "BR-1021",
    name: "GlowCo",
    industry: "Beauty",
    manager: "Nadia Islam",
    email: "hello@glowco.com",
    campaigns: 12,
    spend: "$42,300",
    status: "Active",
    plan: "Pro",
    initials: "GC",
    accent: "from-[#f88ea0] to-[#f2b36e]",
  },
  {
    id: "BR-1022",
    name: "TechGear",
    industry: "Electronics",
    manager: "Rafi Ahmed",
    email: "admin@techgear.io",
    campaigns: 8,
    spend: "$29,120",
    status: "Deactive",
    plan: "Growth",
    initials: "TG",
    accent: "from-[#7ea5ff] to-[#74d5ff]",
  },
  {
    id: "BR-1023",
    name: "EcoStay",
    industry: "Travel",
    manager: "Sadia Khan",
    email: "team@ecostay.travel",
    campaigns: 6,
    spend: "$18,940",
    status: "Active",
    plan: "Starter",
    initials: "ES",
    accent: "from-[#89c96d] to-[#b2da7d]",
  },
  {
    id: "BR-1024",
    name: "SunStyle",
    industry: "Fashion",
    manager: "Imran Hossain",
    email: "brand@sunstyle.co",
    campaigns: 4,
    spend: "$11,380",
    status: "Deactive",
    plan: "Starter",
    initials: "SS",
    accent: "from-[#ffae70] to-[#ff8670]",
  },
  {
    id: "BR-1025",
    name: "UrbanFuel",
    industry: "Food",
    manager: "Tanvir Rahman",
    email: "ops@urbanfuel.app",
    campaigns: 10,
    spend: "$36,730",
    status: "Active",
    plan: "Enterprise",
    initials: "UF",
    accent: "from-[#928cff] to-[#c296ff]",
  },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const profileSectionRef = useRef<HTMLElement | null>(null);

  const [selectedProfileBrandId, setSelectedProfileBrandId] = useState<string | null>(null);

  const [viewPlanBrandId, setViewPlanBrandId] = useState<string | null>(null);
  const [editPlanBrandId, setEditPlanBrandId] = useState<string | null>(null);
  const [statusBrandId, setStatusBrandId] = useState<string | null>(null);

  const [draftPlan, setDraftPlan] = useState<BrandPlan>("Starter");
  const [draftStatus, setDraftStatus] = useState<BrandStatus>("Active");

  const selectedProfileBrand = useMemo(
    () => brands.find((b) => b.id === selectedProfileBrandId) ?? null,
    [brands, selectedProfileBrandId],
  );
  const viewPlanBrand = useMemo(
    () => brands.find((b) => b.id === viewPlanBrandId) ?? null,
    [brands, viewPlanBrandId],
  );
  const editPlanBrand = useMemo(
    () => brands.find((b) => b.id === editPlanBrandId) ?? null,
    [brands, editPlanBrandId],
  );
  const statusBrand = useMemo(
    () => brands.find((b) => b.id === statusBrandId) ?? null,
    [brands, statusBrandId],
  );

  function updateBrand(brandId: string, patch: Partial<Brand>) {
    setBrands((prev) => prev.map((b) => (b.id === brandId ? { ...b, ...patch } : b)));
  }

  function openEditPlan(brand: Brand) {
    setEditPlanBrandId(brand.id);
    setDraftPlan(brand.plan);
  }

  function openStatusEditor(brand: Brand) {
    setStatusBrandId(brand.id);
    setDraftStatus(brand.status);
  }

  function openProfileInSectionThree(brandId: string) {
    profileSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
    setSelectedProfileBrandId(brandId);
  }

  useEffect(() => {
    if (!selectedProfileBrand) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProfileBrand]);

  return (
    <>
      <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">
        <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-semibold text-slate-800">Brand Management</h1>
              <p className="mt-1 text-sm text-slate-600">
                Show all brands, manage actions, and review every brand profile in one place.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <ExportIcon />
                Export Brands
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#dd8a1d] to-[#e76e59] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-105"
              >
                <PlusIcon />
                Add Brand
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-800">
              <ShowAllIcon />
              Show All Brand
            </h2>
            <span className="rounded-full bg-[#e8f0ff] px-3 py-1 text-xs font-semibold text-[#4f6faa]">
              {brands.length} TOTAL
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/5">
            <table className="min-w-full text-left">
              <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Industry</th>
                  <th className="px-4 py-3">Manager</th>
                  <th className="px-4 py-3">Campaigns</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Spend</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {brands.map((brand) => (
                  <tr key={brand.id} className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]">
                    <td className="px-4 py-3 font-semibold">{brand.name}</td>
                    <td className="px-4 py-3">{brand.industry}</td>
                    <td className="px-4 py-3">{brand.manager}</td>
                    <td className="px-4 py-3">{brand.campaigns}</td>
                    <td className="px-4 py-3">{brand.plan}</td>
                    <td className="px-4 py-3">{brand.spend}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(brand.status)}`}>
                        {brand.status}
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
              Manage Brands
            </h2>
            <span className="text-xs font-medium text-slate-500">Update status, edit plan, or inspect details</span>
          </div>

          <div className="space-y-3">
            {brands.map((brand) => (
              <article
                key={`${brand.id}-action`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 transition hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{brand.name}</p>
                  <p className="text-xs text-slate-500">{brand.email}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openProfileInSectionThree(brand.id)}
                    aria-label="View profile"
                    title="View profile"
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                  >
                    <ProfileIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewPlanBrandId(brand.id)}
                    aria-label="View plan"
                    title="View plan"
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                  >
                    <EyeIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditPlan(brand)}
                    aria-label="Edit plan"
                    title="Edit plan"
                    className="rounded-lg border border-[#bfd4ff] p-2 text-[#4d72b9] transition hover:bg-[#ecf3ff]"
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => openStatusEditor(brand)}
                    aria-label="Change status"
                    title="Change status"
                    className="rounded-lg border border-[#f0d2ab] p-2 text-[#ba6f14] transition hover:bg-[#fff4e8]"
                  >
                    <StatusIcon />
                  </button>
                  <a
                    href="/superadmin/content-management"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#f3c1c8] px-3 py-1.5 text-xs font-medium text-[#bd4a59] transition hover:bg-[#fff1f3]"
                  >
                    <ContentIcon />
                    Review Content
                  </a>
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
              <ProfileIcon />
              Show All Brand Profile
            </h2>
            <span className="text-xs font-medium text-slate-500">Quick profile cards</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {brands.map((brand) => (
              <button
                key={`${brand.id}-profile`}
                type="button"
                onClick={() => openProfileInSectionThree(brand.id)}
                className="rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_22px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white ${brand.accent}`}
                  >
                    {brand.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{brand.name}</p>
                    <p className="text-xs text-slate-500">{brand.id}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <p>
                    <span className="font-medium text-slate-700">Industry:</span> {brand.industry}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Manager:</span> {brand.manager}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Email:</span> {brand.email}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(brand.status)}`}>
                    {brand.status}
                  </span>
                  <a
                    href="/superadmin/campaign-management"
                    className="rounded-lg border border-[#bfd4ff] px-2.5 py-1 text-xs font-semibold text-[#4d72b9] transition hover:bg-[#ecf3ff]"
                  >
                    {brand.campaigns} Campaigns
                  </a>
                </div>
              </button>
            ))}
          </div>

          {selectedProfileBrand && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/40 p-4"
              onClick={() => setSelectedProfileBrandId(null)}
            >
              <div
                className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800">Brand Details</h3>
                  <button
                    type="button"
                    onClick={() => setSelectedProfileBrandId(null)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-100"
                  >
                    <XIcon />
                    Close
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white ${selectedProfileBrand.accent}`}
                  >
                    {selectedProfileBrand.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-800">
                      {selectedProfileBrand.name}
                    </p>
                    <p className="text-xs text-slate-500">{selectedProfileBrand.id}</p>
                  </div>
                </div>

                <DetailLine label="Industry" value={selectedProfileBrand.industry} />
                <DetailLine label="Manager" value={selectedProfileBrand.manager} />
                <DetailLine label="Email" value={selectedProfileBrand.email} />
                <DetailLine label="Current Plan" value={selectedProfileBrand.plan} />
                <DetailLine label="Campaigns" value={String(selectedProfileBrand.campaigns)} />
                <DetailLine label="Total Spend" value={selectedProfileBrand.spend} />
                <DetailLine label="Status" value={selectedProfileBrand.status} />
              </div>
            </div>
          )}
        </section>
      </div>

      {viewPlanBrand && (
        <ModalFrame onClose={() => setViewPlanBrandId(null)} title="Current Plan">
          <p className="text-sm text-slate-600">Brand: <span className="font-semibold text-slate-800">{viewPlanBrand.name}</span></p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#f6f7fb] p-3 text-sm text-slate-700">
            <PlanIcon />
            Purchased Plan: <span className="font-semibold text-slate-800">{viewPlanBrand.plan}</span>
          </p>
        </ModalFrame>
      )}

      {editPlanBrand && (
        <ModalFrame onClose={() => setEditPlanBrandId(null)} title="Edit Plan">
          <p className="text-sm text-slate-600">Update plan for <span className="font-semibold text-slate-800">{editPlanBrand.name}</span></p>
          <select
            value={draftPlan}
            onChange={(e) => setDraftPlan(e.target.value as BrandPlan)}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
          >
            <option>Starter</option>
            <option>Growth</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </select>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditPlanBrandId(null)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              <XIcon />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                updateBrand(editPlanBrand.id, { plan: draftPlan });
                setEditPlanBrandId(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f7ef7] px-3 py-1.5 text-xs font-semibold text-white"
            >
              <SaveIcon />
              Save Plan
            </button>
          </div>
        </ModalFrame>
      )}

      {statusBrand && (
        <ModalFrame onClose={() => setStatusBrandId(null)} title="Change Status">
          <p className="text-sm text-slate-600">Set status for <span className="font-semibold text-slate-800">{statusBrand.name}</span></p>
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
              onClick={() => setDraftStatus("Deactive")}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${draftStatus === "Deactive" ? "border-[#f0b7b7] bg-[#fff2f2] text-[#b54d4d]" : "border-slate-200 text-slate-600"}`}
            >
              Deactive
            </button>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setStatusBrandId(null)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              <XIcon />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                updateBrand(statusBrand.id, { status: draftStatus });
                setStatusBrandId(null);
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

function statusClass(status: BrandStatus) {
  if (status === "Active") return "bg-[#def5e5] text-[#2d8f4d]";
  return "bg-[#fff2f2] text-[#b54d4d]";
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m4 15.5 9.8-9.8 2.5 2.5L6.5 18H4v-2.5Z" stroke="currentColor" strokeWidth="1.8" />
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
      <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" />
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

function ContentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" stroke="currentColor" strokeWidth="1.8" />
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
      <path d="m19 12 1.3-.8-.8-2.2-1.6.2-.6-1 1-1.3-1.9-1.1-.9 1h-1l-.9-1-1.9 1.1 1 1.3-.6 1-1.6-.2-.8 2.2L5 12l-1.3.8.8 2.2 1.6-.2.6 1-1 1.3 1.9 1.1.9-1h1l.9 1 1.9-1.1-1-1.3.6-1 1.6.2.8-2.2L19 12Z" stroke="currentColor" strokeWidth="1.2" />
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
