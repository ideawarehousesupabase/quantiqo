import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const s = status.toLowerCase();
  const tone =
    s.includes("active") || s.includes("verified") || s.includes("compliant") || s.includes("settled") || s.includes("success") || s.includes("confirmed")
      ? "bg-success/15 text-success border-success/30"
      : s.includes("pending") || s.includes("review") || s.includes("under") || s.includes("planning") || s.includes("tracking") || s.includes("idle") || s.includes("approved") || s.includes("mitigating") || s.includes("investigating")
      ? "bg-warning/15 text-warning border-warning/30"
      : s.includes("inactive") || s.includes("high") || s.includes("open") || s.includes("risk") || s.includes("leave")
      ? "bg-destructive/15 text-destructive border-destructive/30"
      : "bg-muted text-muted-foreground border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        tone,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}
