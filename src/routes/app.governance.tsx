import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { raidq } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus } from "lucide-react";
import { TabBtn, DataTable, Modal } from "./app.workforce";
import { toast } from "sonner";

const tabs = ["Risks", "Assumptions", "Issues", "Dependencies"] as const;
type Tab = typeof tabs[number];

export const Route = createFileRoute("/app/governance")({
  head: () => ({ meta: [{ title: "RAID-Q Governance — Quantum Settlement" }] }),
  component: Governance,
});

function Governance() {
  const [tab, setTab] = useState<Tab>("Risks");
  const [data, setData] = useState(() => ({ ...raidq }));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", priority: "Medium", status: "Open" });

  const add = () => {
    if (!form.title.trim()) return toast.error("Title required");
    const prefix = tab[0];
    const id = `${prefix}-${String(data[tab].length + 1).padStart(2, "0")}`;
    setData((d) => ({ ...d, [tab]: [{ id, ...form, created: new Date().toISOString().slice(0, 10) }, ...d[tab]] }));
    setOpen(false);
    setForm({ title: "", priority: "Medium", status: "Open" });
    toast.success(`${tab.slice(0, -1)} added`);
  };

  const rows = data[tab];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-border bg-card p-1 flex-wrap">
          {tabs.map((t) => <TabBtn key={t} active={tab === t} onClick={() => setTab(t)}>{t}</TabBtn>)}
        </div>
        <button onClick={() => setOpen(true)} className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-glow">
          <Plus className="h-4 w-4" /> Add {tab.slice(0, -1)}
        </button>
      </div>

      <DataTable
        headers={["ID", "Title", "Priority", "Status", "Created"]}
        rows={rows.map((r) => [
          <span className="font-mono text-xs">{r.id}</span>,
          <span className="font-medium">{r.title}</span>,
          <StatusBadge status={r.priority} />,
          <StatusBadge status={r.status} />,
          <span className="text-muted-foreground text-xs">{r.created}</span>,
        ])}
      />

      {open && (
        <Modal title={`Add ${tab.slice(0, -1)}`} onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <input className="auth-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <select className="auth-input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
            <select className="auth-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Open</option><option>Mitigating</option><option>Investigating</option><option>Tracking</option><option>Confirmed</option>
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-md border border-border">Cancel</button>
              <button onClick={add} className="px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground font-medium">Add</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
