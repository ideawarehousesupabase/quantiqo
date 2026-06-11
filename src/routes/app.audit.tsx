import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { auditTrail, projects } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable } from "./app.workforce";

export const Route = createFileRoute("/app/audit")({
  head: () => ({ meta: [{ title: "Audit Trail — Quantum Settlement" }] }),
  component: Audit,
});

function Audit() {
  const [date, setDate] = useState("");
  const [project, setProject] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    return auditTrail.filter((r) =>
      (!date || r.timestamp.startsWith(date)) &&
      (!project || r.project === project) &&
      (!type || (type === "Human" ? !/-\d/.test(r.actor) && r.actor !== "System" && r.actor !== "Finance Bot" && r.actor !== "Verifier"
                                  : /-\d/.test(r.actor) || r.actor === "Finance Bot" || r.actor === "Verifier" || r.actor === "System")),
    );
  }, [date, project, type]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 grid sm:grid-cols-3 gap-3">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="auth-input" />
        <select value={project} onChange={(e) => setProject(e.target.value)} className="auth-input">
          <option value="">All projects</option>
          {projects.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="auth-input">
          <option value="">All contributor types</option>
          <option>Human</option>
          <option>AI Agent</option>
        </select>
      </div>

      <DataTable
        headers={["Timestamp", "Actor", "Project", "Action", "Status"]}
        rows={filtered.map((r, i) => [
          <span key={`ts-${i}`} className="font-mono text-xs text-muted-foreground">{r.timestamp}</span>,
          <span key={`actor-${i}`} className="font-medium">{r.actor}</span>,
          <span key={`project-${i}`} className="text-muted-foreground">{r.project}</span>,
          r.action,
          <StatusBadge key={`status-${i}`} status={r.status} />,
        ])}
      />

      <style>{`
        .auth-input { width: 100%; background: var(--input); border: 1px solid var(--border); border-radius: .5rem; padding: .55rem .8rem; font-size: .9rem; color: var(--foreground); outline: none; }
        .auth-input:focus { border-color: var(--primary); }
      `}</style>
    </div>
  );
}
