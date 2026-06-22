import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, FolderKanban, ShieldCheck, CheckCircle2,
  Wallet, AlertTriangle, Activity, FileCheck2, ScrollText, BarChart3,
  LogOut, Menu, X, Atom, Sun, Moon, KeyRound, Eye, EyeOff,
} from "lucide-react";
import { logout, changePassword } from "@/lib/auth";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/workforce", label: "Workforce", icon: Users },
  { to: "/app/projects", label: "Projects", icon: FolderKanban },
  { to: "/app/identity", label: "Digital Identity", icon: ShieldCheck },
  { to: "/app/tasks", label: "Task Verification", icon: CheckCircle2 },
  { to: "/app/settlements", label: "Settlement Center", icon: Wallet },
  { to: "/app/governance", label: "RAID-Q Governance", icon: AlertTriangle },
  { to: "/app/posture", label: "Quantum Posture", icon: Activity },
  { to: "/app/compliance", label: "Compliance Center", icon: FileCheck2 },
  { to: "/app/audit", label: "Audit Trail", icon: ScrollText },
  { to: "/app/reports", label: "Reports", icon: BarChart3 },
] as const;

function ChangePasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      setNewPassword("");
      setConfirmPassword("");
      setShowNew(false);
      setShowConfirm(false);
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await changePassword(newPassword);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Password changed successfully.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-primary/15 text-primary grid place-items-center">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">Change Password</h2>
              <p className="text-xs text-muted-foreground">Enter your new password</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent transition text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">New Password</label>
            <div className="cp-password-wrapper">
              <input
                type={showNew ? "text" : "password"}
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="cp-input"
              />
              <button
                type="button"
                className="cp-toggle"
                onClick={() => setShowNew((v) => !v)}
                aria-label={showNew ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Confirm New Password</label>
            <div className="cp-password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="cp-input"
              />
              <button
                type="button"
                className="cp-toggle"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-accent transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition shadow-glow disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .cp-input {
          width: 100%;
          background: var(--input);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          padding-right: 2.75rem;
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .cp-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent);
        }
        .cp-password-wrapper {
          position: relative;
        }
        .cp-toggle {
          position: absolute;
          right: 0.625rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--muted-foreground);
          cursor: pointer;
          padding: 0.25rem;
          display: grid;
          place-items: center;
          border-radius: 0.25rem;
          transition: color .15s;
        }
        .cp-toggle:hover {
          color: var(--foreground);
        }
      `}</style>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("qs.theme") as "dark" | "light" | null) ?? "dark";
    setTheme(stored);
    document.documentElement.classList.toggle("light", stored === "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("qs.theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const title = nav.find((n) => pathname.startsWith(n.to))?.label ?? "Quantum Settlement";

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <Link to="/app/dashboard" className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
        <div className="grid place-items-center h-9 w-9 rounded-md bg-primary/15 text-primary">
          <Atom className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold tracking-tight text-sidebar-foreground">Quantum Settlement</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Post-Quantum · Agentic</div>
        </div>
      </Link>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/15 text-primary border-l-2 border-primary"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3 space-y-0.5">
        <button
          onClick={() => {
            setMobileOpen(false);
            setChangePasswordOpen(true);
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <KeyRound className="h-4 w-4" />
          Change Password
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-sidebar-border bg-sidebar">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-sidebar border-r border-sidebar-border">{SidebarContent}</aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card/40 backdrop-blur flex items-center gap-3 px-4 lg:px-6 sticky top-0 z-30">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex-1">
            <h1 className="text-sm lg:text-base font-semibold tracking-tight">{title}</h1>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              {user?.companyName ?? "Workspace"}
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary grid place-items-center text-xs font-semibold">
              {user?.fullName?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="text-xs leading-tight">
              <div className="font-medium">{user?.fullName ?? "User"}</div>
              <div className="text-muted-foreground">{user?.email}</div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto w-full">{children}</div>
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />
    </div>
  );
}
