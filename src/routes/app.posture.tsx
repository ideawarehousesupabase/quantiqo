import { createFileRoute } from "@tanstack/react-router";
import { posture } from "@/lib/mock-data";
import { ChartCard } from "./app.dashboard";
import {
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

export const Route = createFileRoute("/app/posture")({
  head: () => ({ meta: [{ title: "Quantum Posture — Quantum Settlement" }] }),
  component: Posture,
});

function Posture() {
  const data = [{ name: "score", value: posture.score, fill: "var(--color-chart-1)" }];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 relative overflow-hidden lg:col-span-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Quantum Posture Score</div>
          <div className="relative h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="75%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "var(--muted)" }} dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-5xl font-semibold tracking-tight gradient-text">{posture.score}</div>
                <div className="text-xs text-muted-foreground mt-1">/ 100</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">RAID-Q Secured · Audit Ready</div>
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
        </div>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {posture.breakdown.map((b) => {
            const displayValue = b.inverse ? 100 - b.value : b.value;
            return (
              <div key={b.label} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{b.label}</div>
                  <div className="text-sm font-semibold">{b.value}{b.inverse ? "%" : "%"}</div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${displayValue}%`,
                      background: b.inverse && b.value > 30
                        ? "linear-gradient(90deg, var(--destructive), var(--warning))"
                        : "linear-gradient(90deg, var(--primary), var(--primary-glow))",
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {b.inverse ? "Lower is better" : "Higher is better"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ChartCard title="Posture Trend" subtitle="Quantum readiness over last 6 weeks">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={posture.trend}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={11} />
            <YAxis domain={[60, 100]} stroke="var(--muted-foreground)" fontSize={11} />
            <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="score" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
