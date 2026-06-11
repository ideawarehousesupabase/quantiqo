import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  className,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card transition hover:border-primary/40",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          {delta && <div className="mt-1 text-xs text-success">{delta}</div>}
        </div>
        {Icon && (
          <div className="grid place-items-center h-9 w-9 rounded-md bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
    </div>
  );
}
