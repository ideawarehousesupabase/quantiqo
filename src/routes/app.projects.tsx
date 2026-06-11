import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Users, Bot, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/projects")({
  head: () => ({ meta: [{ title: "Projects — Quantum Settlement" }] }),
  component: Projects,
});

function Projects() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link
            key={p.id}
            to="/app/projects/$id"
            params={{ id: p.id }}
            className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:-translate-y-0.5 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Project</div>
                <div className="mt-1 font-semibold text-lg">{p.name}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={p.status} />
              <StatusBadge status={p.compliance} />
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" />{p.team}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Bot className="h-4 w-4" />{p.agents} agents</div>
              <div className="text-xs text-muted-foreground">{p.timeline}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
