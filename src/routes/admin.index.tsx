import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { adminLogin } from "@/lib/auth";
import { toast } from "sonner";
import { AuthLayout, Field } from "./login";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Login — Quantum Settlement" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await adminLogin(email.trim(), password);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Admin access granted.");
    navigate({ to: "/admin/dashboard" });
  };

  return (
    <AuthLayout>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary flex items-center gap-2">
        <ShieldAlert className="h-3 w-3" /> Administration
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Admin Portal</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to manage workspace access.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="Email">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
        </Field>
        <Field label="Password">
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
        </Field>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition shadow-glow disabled:opacity-60"
        >
          {loading ? "Authenticating..." : <>Access Admin <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>
      
      <div className="mt-6 text-sm text-muted-foreground">
        <Link to="/login" className="text-primary hover:underline">Return to User Login</Link>
      </div>
    </AuthLayout>
  );
}
