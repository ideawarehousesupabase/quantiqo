import { createFileRoute } from "@tanstack/react-router";
import { identities } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Bot, User as UserIcon, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/identity")({
  head: () => ({ meta: [{ title: "Digital Identity — Quantum Settlement" }] }),
  component: Identity,
});

function Identity() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 flex items-start gap-4">
        <div className="grid place-items-center h-10 w-10 rounded-md bg-primary/15 text-primary"><ShieldCheck className="h-5 w-5" /></div>
        <div>
          <div className="font-semibold">PQC-ID Digital Identity</div>
          <div className="text-sm text-muted-foreground">Every contributor — human or AI agent — is issued a quantum-verified identity for secure participation across your workforce.</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {identities.map((id) => {
          const isAgent = id.type === "AI Agent";
          return (
            <div key={id.id} className="rounded-xl border border-border bg-card p-5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className={`grid place-items-center h-11 w-11 rounded-md ${isAgent ? "bg-chart-2/15 text-chart-2" : "bg-primary/15 text-primary"}`}>
                  {isAgent ? <Bot className="h-5 w-5" /> : <UserIcon className="h-5 w-5" />}
                </div>
                {id.status === "Verified" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] text-primary">
                    <ShieldCheck className="h-3 w-3" /> Quantum Verified
                  </span>
                )}
              </div>
              <div className="mt-4">
                <div className="font-semibold">{id.name}</div>
                <div className="text-xs font-mono text-muted-foreground mt-1">{id.id}</div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{id.type}</span>
                <StatusBadge status={id.status} />
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">Created {id.created}</div>
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
