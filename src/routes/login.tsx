import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Atom, ArrowRight } from "lucide-react";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Quantum Settlement" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Welcome back");
    navigate({ to: "/app/dashboard" });
  };

  return (
    <AuthLayout>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary">Sign In</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to your Quantum Settlement workspace.</p>

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
          {loading ? "Signing in..." : <>Sign in <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>

      <div className="mt-6 text-sm text-muted-foreground">
        New to Quantum Settlement?{" "}
        <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
      </div>
    </AuthLayout>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:block grid-bg border-r border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col p-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid place-items-center h-9 w-9 rounded-md bg-primary/15 text-primary">
              <Atom className="h-5 w-5" />
            </div>
            <div className="font-semibold">Quantum Settlement</div>
          </Link>
          <div className="mt-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary">Post-Quantum Era</div>
            <div className="mt-3 text-3xl font-semibold tracking-tight leading-tight max-w-md">
              Settle. Verify. <span className="gradient-text">Govern.</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              The unified workspace for hybrid teams of humans and AI agents.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="grid place-items-center h-8 w-8 rounded-md bg-primary/15 text-primary"><Atom className="h-4 w-4" /></div>
            <div className="font-semibold">Quantum Settlement</div>
          </Link>
          {children}
        </div>
      </div>
      <style>{`
        .auth-input {
          width: 100%;
          background: var(--input);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.9rem;
          color: var(--foreground);
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .auth-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent);
        }
      `}</style>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}
