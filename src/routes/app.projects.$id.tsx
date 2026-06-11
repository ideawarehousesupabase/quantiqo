import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { projects, humans, agents } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, CheckCircle2, ShieldCheck, AlertTriangle, Receipt } from "lucide-react";
import { TabBtn } from "./app.workforce";

export const Route = createFileRoute("/app/projects/$id")({
  head: () => ({ meta: [{ title: "Project — Quantum Settlement" }] }),
  component: ProjectDetail,
});

const activity = [
  { type: "task", icon: CheckCircle2, tone: "text-primary bg-primary/10", text: "Atlas-7 completed Invoice Reconciliation #4821", time: "2h ago" },
  { type: "verif", icon: ShieldCheck, tone: "text-primary bg-primary/10", text: "Verification completed for TX-7712 (score 98%)", time: "3h ago" },
  { type: "settle", icon: Receipt, tone: "text-success bg-success/10", text: "Settlement STL-2041 generated for £8,420.00", time: "5h ago" },
  { type: "risk", icon: AlertTriangle, tone: "text-destructive bg-destructive/10", text: "Risk R-02 raised by Sarah Patel", time: "Yesterday" },
];

function ProjectDetail() {
  const { id } = useParams({ from: "/app/projects/$id" });
  const project = projects.find((p) => p.id === id);
  const [tab, setTab] = useState<"overview" | "team" | "activity">("overview");

  if (!project) {
    return (
      <div className="space-y-4">
        <Link to="/app/projects" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
        <div>Project not found.</div>
      </div>
    );
  }

  const teamHumans = humans.filter((h) => h.project === project.name);
  const teamAgents = agents.filter((a) => a.project === project.name);

  return (
    <div className="space-y-6">
      <Link to="/app/projects" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Project</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{project.name}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={project.status} />
          <StatusBadge status={project.compliance} />
        </div>
      </div>

      <div className="inline-flex rounded-md border border-border bg-card p-1">
        <TabBtn active={tab === "overview"} onClick={() => setTab("overview")}>Overview</TabBtn>
        <TabBtn active={tab === "team"} onClick={() => setTab("team")}>Team</TabBtn>
        <TabBtn active={tab === "activity"} onClick={() => setTab("activity")}>Activity</TabBtn>
      </div>

      {tab === "overview" && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card title="Timeline" value={project.timeline} />
          <Card title="Status" value={project.status} />
          <Card title="Team Size" value={`${project.team} contributors`} />
          <Card title="AI Agents" value={`${project.agents} agents`} />
        </div>
      )}

      {tab === "team" && (
        <div className="grid lg:grid-cols-2 gap-4">
          <SectionCard title="Human Contributors">
            <ul className="divide-y divide-border">
              {teamHumans.map((h) => (
                <li key={h.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium">{h.name}</div>
                    <div className="text-xs text-muted-foreground">{h.department}</div>
                  </div>
                  <StatusBadge status={h.status} />
                </li>
              ))}
              {teamHumans.length === 0 && <li className="py-6 text-sm text-muted-foreground text-center">No human contributors assigned.</li>}
            </ul>
          </SectionCard>
          <SectionCard title="AI Agents">
            <ul className="divide-y divide-border">
              {teamAgents.map((a) => (
                <li key={a.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium font-mono">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.type}</div>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
              {teamAgents.length === 0 && <li className="py-6 text-sm text-muted-foreground text-center">No AI agents assigned.</li>}
            </ul>
          </SectionCard>
        </div>
      )}

      {tab === "activity" && (
        <div className="rounded-xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3 p-4">
                <div className={`grid place-items-center h-9 w-9 rounded-md ${a.tone}`}><a.icon className="h-4 w-4" /></div>
                <div className="flex-1">
                  <div className="text-sm">{a.text}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}
