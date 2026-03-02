"use client";

import { useMemo, useState } from "react";

type PayoutStatus = "Pending" | "Processing" | "Paid" | "Failed";
type AccountType = "Brand" | "Creator";

type PayoutRequest = {
  id: string;
  accountType: AccountType;
  accountName: string;
  accountEmail: string;
  amount: number;
  requestedAt: string;
  method: string;
  status: PayoutStatus;
};

type Settlement = {
  id: string;
  campaign: string;
  brand: string;
  creator: string;
  gross: number;
  platformFee: number;
  netPayout: number;
  settlementState: "Open" | "Settled";
  settledAt: string;
};

const initialPayouts: PayoutRequest[] = [
  {
    id: "PO-8011",
    accountType: "Creator",
    accountName: "Sarah Johnson",
    accountEmail: "sarah@creatormail.com",
    amount: 4200,
    requestedAt: "2026-04-07 10:20",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    id: "PO-8012",
    accountType: "Brand",
    accountName: "GlowCo",
    accountEmail: "hello@glowco.com",
    amount: 8600,
    requestedAt: "2026-04-06 15:40",
    method: "SEPA",
    status: "Processing",
  },
  {
    id: "PO-8013",
    accountType: "Creator",
    accountName: "Mike Roy",
    accountEmail: "mike@creatormail.com",
    amount: 2950,
    requestedAt: "2026-04-05 09:05",
    method: "Payoneer",
    status: "Paid",
  },
  {
    id: "PO-8014",
    accountType: "Brand",
    accountName: "EcoStay",
    accountEmail: "team@ecostay.travel",
    amount: 5100,
    requestedAt: "2026-04-04 11:30",
    method: "Bank Transfer",
    status: "Failed",
  },
];

const settlements: Settlement[] = [
  {
    id: "ST-3001",
    campaign: "Glow Summer Launch",
    brand: "GlowCo",
    creator: "Sarah Johnson",
    gross: 32500,
    platformFee: 3575,
    netPayout: 28925,
    settlementState: "Open",
    settledAt: "-",
  },
  {
    id: "ST-3002",
    campaign: "Tech Creator Sprint",
    brand: "TechGear",
    creator: "Mike Roy",
    gross: 28750,
    platformFee: 3162,
    netPayout: 25588,
    settlementState: "Settled",
    settledAt: "2026-04-06",
  },
  {
    id: "ST-3003",
    campaign: "EcoStay Experience Reel",
    brand: "EcoStay",
    creator: "Emma Wilson",
    gross: 21400,
    platformFee: 2354,
    netPayout: 19046,
    settlementState: "Open",
    settledAt: "-",
  },
];

function eur(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function statusClass(status: PayoutStatus) {
  if (status === "Paid") return "bg-[#def5e5] text-[#2d8f4d]";
  if (status === "Processing") return "bg-[#e8f0ff] text-[#4f6faa]";
  if (status === "Pending") return "bg-[#fff6e8] text-[#b4721f]";
  return "bg-[#fff2f2] text-[#b54d4d]";
}

export default function PaymentsPage() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>(initialPayouts);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const activeRequest = useMemo(
    () => payouts.find((request) => request.id === activeRequestId) ?? null,
    [activeRequestId, payouts],
  );

  const totals = useMemo(() => {
    const pendingAmount = payouts
      .filter((item) => item.status === "Pending" || item.status === "Processing")
      .reduce((sum, item) => sum + item.amount, 0);
    const paidAmount = payouts
      .filter((item) => item.status === "Paid")
      .reduce((sum, item) => sum + item.amount, 0);
    const failedCount = payouts.filter((item) => item.status === "Failed").length;
    return {
      pendingAmount,
      paidAmount,
      failedCount,
      totalRequests: payouts.length,
    };
  }, [payouts]);

  function updatePayoutStatus(id: string, status: PayoutStatus) {
    setPayouts((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  return (
    <>
      <div className="space-y-5 rounded-3xl bg-[#f1f0ee] p-5 md:p-6">


        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Pending Amount" value={eur(totals.pendingAmount)} tone="amber" />
          <MetricCard label="Paid Amount" value={eur(totals.paidAmount)} tone="green" />
          <MetricCard label="Failed Requests" value={String(totals.failedCount)} tone="red" />
          <MetricCard label="Total Requests" value={String(totals.totalRequests)} tone="blue" />
        </section>

        <section className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Payout Requests</h2>
            <span className="rounded-full bg-[#e8f0ff] px-3 py-1 text-xs font-semibold text-[#4f6faa]">
              {payouts.length} Requests
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/5">
            <table className="min-w-full text-left">
              <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Request</th>
                  <th className="px-4 py-3">Account</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Requested At</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {payouts.map((request) => (
                  <tr
                    key={request.id}
                    className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]"
                  >
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setActiveRequestId(request.id)}
                        className="rounded-lg border border-[#bfd4ff] px-2.5 py-1 text-xs font-semibold text-[#4d72b9] transition hover:bg-[#ecf3ff]"
                      >
                        {request.id}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{request.accountName}</p>
                      <p className="text-xs text-slate-500">
                        {request.accountType} - {request.accountEmail}
                      </p>
                    </td>
                    <td className="px-4 py-3">{request.method}</td>
                    <td className="px-4 py-3 text-xs">{request.requestedAt}</td>
                    <td className="px-4 py-3 font-semibold text-[#2f7ef7]">{eur(request.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(request.status)}`}>
                        {request.status}
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
            <h2 className="text-xl font-semibold text-slate-800">Settlement Progress</h2>
            <span className="text-xs font-medium text-slate-500">
              Net payout after platform commission
            </span>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-black/5">
            <table className="min-w-full text-left">
              <thead className="bg-[#f5f6f8] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Gross</th>
                  <th className="px-4 py-3">Platform Fee</th>
                  <th className="px-4 py-3">Net Payout</th>
                  <th className="px-4 py-3">Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {settlements.map((item) => (
                  <tr key={item.id} className="text-sm text-slate-700 transition hover:bg-[#fbfbfc]">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{item.campaign}</p>
                      <p className="text-xs text-slate-500">{item.id}</p>
                    </td>
                    <td className="px-4 py-3">{item.brand}</td>
                    <td className="px-4 py-3">{item.creator}</td>
                    <td className="px-4 py-3">{eur(item.gross)}</td>
                    <td className="px-4 py-3 text-[#b05d1c]">{eur(item.platformFee)}</td>
                    <td className="px-4 py-3 font-semibold text-[#2f7ef7]">{eur(item.netPayout)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.settlementState === "Settled"
                            ? "bg-[#def5e5] text-[#2d8f4d]"
                            : "bg-[#fff6e8] text-[#b4721f]"
                        }`}
                      >
                        {item.settlementState}
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
            <h2 className="text-xl font-semibold text-slate-800">Payment Controls</h2>
            <span className="text-xs font-medium text-slate-500">
              Update request processing state
            </span>
          </div>
          <div className="space-y-3">
            {payouts.map((request) => (
              <article
                key={`${request.id}-ops`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#f8f9fb] p-4 transition hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {request.accountName} ({request.id})
                  </p>
                  <p className="text-xs text-slate-500">
                    {request.method} - {eur(request.amount)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updatePayoutStatus(request.id, "Processing")}
                    className="rounded-lg border border-[#bfd4ff] px-3 py-1.5 text-xs font-semibold text-[#4d72b9] transition hover:bg-[#ecf3ff]"
                  >
                    Mark Processing
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePayoutStatus(request.id, "Paid")}
                    className="rounded-lg border border-[#bce6c8] px-3 py-1.5 text-xs font-semibold text-[#2d8f4d] transition hover:bg-[#eefcf2]"
                  >
                    Mark Paid
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePayoutStatus(request.id, "Failed")}
                    className="rounded-lg border border-[#f1c2c2] px-3 py-1.5 text-xs font-semibold text-[#b54d4d] transition hover:bg-[#fff2f2]"
                  >
                    Mark Failed
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {activeRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-800">Payout Request Details</h3>
              <button
                type="button"
                onClick={() => setActiveRequestId(null)}
                className="rounded-lg px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>
            <div className="grid gap-2 rounded-xl border border-black/5 bg-[#f8f9fb] p-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-800">Request ID:</span> {activeRequest.id}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Account:</span> {activeRequest.accountName}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Type:</span> {activeRequest.accountType}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Email:</span> {activeRequest.accountEmail}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Method:</span> {activeRequest.method}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Amount:</span> {eur(activeRequest.amount)}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Status:</span> {activeRequest.status}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Requested At:</span> {activeRequest.requestedAt}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "amber" | "red" | "blue";
}) {
  void tone;

  return (
    <article className="rounded-3xl bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
      <div className="rounded-2xl border border-slate-200 bg-[#f8f9fb] p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
      </div>
    </article>
  );
}
