import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { tasks } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable } from "./app.workforce";

export const Route = createFileRoute("/app/tasks")({
  head: () => ({ meta: [{ title: "Task Verification — Quantum Settlement" }] }),
  component: Tasks,
});

function Tasks() {
  const [selected, setSelected] = useState<typeof tasks[number] | null>(null);

  return (
    <div className="space-y-6">
      <DataTable
        headers={["Task", "Assigned To", "Type", "Status", ""]}
        rows={tasks.map((t, i) => [
          <div key={`task-${i}`}>
            <div className="font-medium">{t.name}</div>
            <div className="text-xs font-mono text-muted-foreground">{t.id}</div>
          </div>,
          t.assignee,
          t.type,
          <StatusBadge key={`status-${i}`} status={t.status} />,
          <button key={`view-${i}`} onClick={() => setSelected(t)} className="text-primary text-xs hover:underline">View</button>,
        ])}
      />

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-glow">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Task Detail</div>
            <div className="mt-1 font-semibold text-lg">{selected.name}</div>
            <div className="text-xs font-mono text-muted-foreground">{selected.id}</div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Info label="Assigned To" value={selected.assignee} />
              <Info label="Type" value={selected.type} />
              <Info label="Status" value={<StatusBadge status={selected.status} />} />
              <Info label="Verification Score" value={`${selected.score}%`} />
              <Info label="Verification Timestamp" value={selected.timestamp} />
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelected(null)} className="px-3 py-2 text-sm rounded-md border border-border hover:bg-accent">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-1">{value}</div>
    </div>
  );
}
