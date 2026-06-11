import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { isAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/login" });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-sm font-mono uppercase tracking-[0.18em] text-muted-foreground">Loading workspace…</div>
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
