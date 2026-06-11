import { createFileRoute } from "@tanstack/react-router";
import { KpiCard } from "@/components/KpiCard";
import { kpis, workforceTrend, settlementTrend, recentActivity } from "@/lib/mock-data";
import { FolderKanban, Users, Bot, Wallet, ShieldCheck, CheckCircle2, AlertTriangle, Receipt } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Quantum Settlement" }] }),
  component: Dashboard,
});

const chartTip = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  },
  cursor: { stroke: "var(--border)" },
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <KpiCard label="Total Projects" value={kpis.totalProjects} icon={FolderKanban} delta="+3 this quarter" />
        <KpiCard label="Human Contributors" value={kpis.humanContributors} icon={Users} delta="+8 this month" />
        <KpiCard label="AI Agents" value={kpis.aiAgents} icon={Bot} delta="+9 this month" />
        <KpiCard label="Active Settlements" value={kpis.activeSettlements} icon={Wallet} />
        <KpiCard label="Compliance Score" value={`${kpis.complianceScore}%`} icon={ShieldCheck} delta="+4 pts QoQ" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Workforce Activity Trend" subtitle="Humans vs AI agents (last 6 months)">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={workforceTrend}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip {...chartTip} />
              <Area type="monotone" dataKey="humans" stroke="var(--color-chart-1)" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="agents" stroke="var(--color-chart-2)" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Settlement Trend" subtitle="Monthly settled volume (GBP)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={settlementTrend}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} />
              <Tooltip {...chartTip} formatter={(v: number) => [`£${v.toLocaleString()}`, "Settled"]} />
              <Line type="monotone" dataKey="value" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--color-chart-1)" }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="p-5 border-b border-border">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Activity</div>
          <div className="font-semibold">Recent Activity</div>
        </div>
        <ul className="divide-y divide-border">
          {recentActivity.map((a) => {
            const Icon =
              a.type === "task" ? CheckCircle2 :
              a.type === "settlement" ? Receipt :
              a.type === "risk" ? AlertTriangle : ShieldCheck;
            const tone =
              a.type === "risk" ? "text-destructive bg-destructive/10" :
              a.type === "settlement" ? "text-success bg-success/10" :
              "text-primary bg-primary/10";
            return (
              <li key={a.id} className="flex items-start gap-3 p-4 hover:bg-accent/30 transition">
                <div className={`grid place-items-center h-9 w-9 rounded-md ${tone} shrink-0`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm"><span className="font-medium">{a.actor}</span> {a.text}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{subtitle}</div>
          <div className="font-semibold">{title}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
