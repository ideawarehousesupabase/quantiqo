import { createFileRoute } from "@tanstack/react-router";
import { compliance } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { FileCheck2, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/compliance")({
  head: () => ({ meta: [{ title: "Compliance Center — Quantum Settlement" }] }),
  component: Compliance,
});

const reports = [
  { name: "Audit Report", desc: "Comprehensive audit trail summary for the last 30 days." },
  { name: "Quantum Readiness Report", desc: "Detailed quantum posture and migration readiness." },
  { name: "Risk Assessment Report", desc: "Aggregated risk exposure across RAID-Q entries." },
];

function Compliance() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {compliance.map((c) => (
          <div key={c.framework} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="grid place-items-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="mt-4 font-semibold">{c.framework}</div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Coverage</span>
                <span className="font-medium text-foreground">{c.coverage}%</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${c.coverage}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="p-5 border-b border-border">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Reports</div>
          <div className="font-semibold">Available reports</div>
        </div>
        <ul className="divide-y divide-border">
          {reports.map((r) => (
            <li key={r.name} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.desc}</div>
              </div>
              <button
                onClick={() => toast.success(`${r.name} download started (mock)`)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-accent transition"
              >
                <Download className="h-4 w-4" /> Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
