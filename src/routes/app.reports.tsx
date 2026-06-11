import { createFileRoute } from "@tanstack/react-router";
import { Users, Wallet, AlertTriangle, FileCheck2, Eye, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — Quantum Settlement" }] }),
  component: Reports,
});

const reports = [
  { name: "Workforce Report", desc: "Headcount, agent mix, utilisation and trends.", icon: Users },
  { name: "Settlement Report", desc: "Settled, pending and approved volumes by contributor.", icon: Wallet },
  { name: "RAID-Q Report", desc: "Risks, assumptions, issues and dependencies snapshot.", icon: AlertTriangle },
  { name: "Compliance Report", desc: "Coverage across NCSC, FCA, GDPR and ISO 27001.", icon: FileCheck2 },
];

function Reports() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {reports.map((r) => (
        <div key={r.name} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start gap-4">
            <div className="grid place-items-center h-11 w-11 rounded-md bg-primary/10 text-primary">
              <r.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{r.desc}</div>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => toast.message(`Viewing ${r.name} (mock)`)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-accent transition"
            >
              <Eye className="h-4 w-4" /> View
            </button>
            <button
              onClick={() => toast.success(`${r.name} exported (mock)`)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-glow"
            >
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
