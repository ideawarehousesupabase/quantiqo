import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { humans as initialHumans, agents as initialAgents } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Bot, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/workforce")({
  head: () => ({ meta: [{ title: "Workforce — Quantum Settlement" }] }),
  component: Workforce,
});

function Workforce() {
  const [tab, setTab] = useState<"humans" | "agents">("humans");
  const [humans, setHumans] = useState(initialHumans);
  const [agents] = useState(initialAgents);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", department: "", project: "", status: "Active" });

  const [selectedHuman, setSelectedHuman] = useState<typeof humans[number] | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[number] | null>(null);

  const addHuman = () => {
    if (!form.name.trim()) return toast.error("Name required");
    setHumans((h) => [{ id: crypto.randomUUID(), ...form }, ...h]);
    setOpen(false);
    setForm({ name: "", department: "", project: "", status: "Active" });
    toast.success("Contributor added");
  };

  const filteredHumans = humans.filter((h) => h.name.toLowerCase().includes(q.toLowerCase()));
  const filteredAgents = agents.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-border bg-card p-1">
          <TabBtn active={tab === "humans"} onClick={() => setTab("humans")} icon={<UserIcon className="h-4 w-4" />}>Human Contributors</TabBtn>
          <TabBtn active={tab === "agents"} onClick={() => setTab("agents")} icon={<Bot className="h-4 w-4" />}>AI Agents</TabBtn>
        </div>
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search workforce..."
            className="auth-input pl-9 w-64"
          />
        </div>
        {tab === "humans" && (
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-glow">
            <Plus className="h-4 w-4" /> Add Contributor
          </button>
        )}
      </div>

      {tab === "humans" ? (
        <DataTable
          headers={["Name", "Department", "Assigned Project", "Status", ""]}
          rows={filteredHumans.map((h, i) => [
            <span key={`name-${i}`} className="font-medium">{h.name}</span>,
            h.department,
            h.project,
            <StatusBadge key={`status-${i}`} status={h.status} />,
            <button key={`view-${i}`} onClick={() => setSelectedHuman(h)} className="text-primary text-xs hover:underline">View</button>,
          ])}
        />
      ) : (
        <DataTable
          headers={["Agent Name", "Agent Type", "Assigned Project", "Status", ""]}
          rows={filteredAgents.map((a, i) => [
            <span key={`name-${i}`} className="font-medium font-mono">{a.name}</span>,
            a.type,
            a.project,
            <StatusBadge key={`status-${i}`} status={a.status} />,
            <button key={`view-${i}`} onClick={() => setSelectedAgent(a)} className="text-primary text-xs hover:underline">View</button>,
          ])}
        />
      )}

      {selectedHuman && (
        <Modal title="Contributor Details" onClose={() => setSelectedHuman(null)}>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Name</div>
              <div className="font-medium text-lg">{selectedHuman.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Department</div>
                <div>{selectedHuman.department}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Assigned Project</div>
                <div>{selectedHuman.project}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Status</div>
                <div className="mt-1"><StatusBadge status={selectedHuman.status} /></div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedHuman(null)} className="px-3 py-2 text-sm rounded-md border border-border hover:bg-accent">Close</button>
            </div>
          </div>
        </Modal>
      )}

      {selectedAgent && (
        <Modal title="Agent Details" onClose={() => setSelectedAgent(null)}>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Name</div>
              <div className="font-mono font-medium text-lg">{selectedAgent.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Type</div>
                <div>{selectedAgent.type}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Assigned Project</div>
                <div>{selectedAgent.project}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Status</div>
                <div className="mt-1"><StatusBadge status={selectedAgent.status} /></div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedAgent(null)} className="px-3 py-2 text-sm rounded-md border border-border hover:bg-accent">Close</button>
            </div>
          </div>
        </Modal>
      )}

      {open && (
        <Modal title="Add Human Contributor" onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <input className="auth-input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="auth-input" placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <input className="auth-input" placeholder="Assigned project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
            <select className="auth-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Active</option><option>On Leave</option><option>Inactive</option>
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-md border border-border">Cancel</button>
              <button onClick={addHuman} className="px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground font-medium">Add</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function TabBtn({ active, onClick, children, icon }: { active: boolean; onClick: () => void; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
    >
      {icon}{children}
    </button>
  );
}

export function DataTable({ headers, rows }: { headers: React.ReactNode[]; rows: React.ReactNode[][] }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {headers.map((h, i) => (
                <th key={i} className="text-left px-4 py-3 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={headers.length} className="px-4 py-12 text-center text-muted-foreground">No records found</td></tr>
            ) : rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/20 transition">
                {row.map((c, j) => <td key={j} className="px-4 py-3 align-middle">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-glow">
        <div className="font-semibold mb-4">{title}</div>
        {children}
      </div>
      <style>{`
        .auth-input { width: 100%; background: var(--input); border: 1px solid var(--border); border-radius: .5rem; padding: .55rem .8rem; font-size: .9rem; color: var(--foreground); outline: none; }
        .auth-input:focus { border-color: var(--primary); }
      `}</style>
    </div>
  );
}
