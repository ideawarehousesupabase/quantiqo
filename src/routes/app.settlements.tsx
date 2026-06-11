import { createFileRoute } from "@tanstack/react-router";
import { settlements } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { KpiCard } from "@/components/KpiCard";
import { Wallet, Clock, CheckCircle2 } from "lucide-react";
import { DataTable } from "./app.workforce";

export const Route = createFileRoute("/app/settlements")({
  head: () => ({ meta: [{ title: "Settlement Center — Quantum Settlement" }] }),
  component: Settlements,
});

function Settlements() {
  const total = settlements.length;
  const pending = settlements.filter((s) => s.status === "Pending").length;
  const settled = settlements.filter((s) => s.status === "Settled").length;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <KpiCard label="Total Settlements" value={total} icon={Wallet} />
        <KpiCard label="Pending Settlements" value={pending} icon={Clock} />
        <KpiCard label="Completed Settlements" value={settled} icon={CheckCircle2} />
      </div>

      <DataTable
        headers={["Settlement ID", "Contributor", "Type", "Amount", "Status"]}
        rows={settlements.map((s) => [
          <span className="font-mono text-xs">{s.id}</span>,
          s.contributor,
          <span className="text-muted-foreground text-xs">{s.type}</span>,
          <span className="font-medium">£{s.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>,
          <StatusBadge status={s.status} />,
        ])}
      />
    </div>
  );
}
