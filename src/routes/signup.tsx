import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { register } from "@/lib/auth";
import { toast } from "sonner";
import { AuthLayout, Field, PasswordInput } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Quantum Settlement" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return toast.error("Passwords do not match.");
    setLoading(true);
    const res = await register({
      companyName: form.companyName.trim(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    setLoading(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Your registration request has been submitted successfully. Please wait for administrator approval before logging in.");
    navigate({ to: "/app/dashboard" });
  };

  return (
    <AuthLayout>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary">Create Account</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Start your workspace</h1>
      <p className="mt-2 text-sm text-muted-foreground">Set up your post-quantum settlement workspace.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="Company Name">
          <input required value={form.companyName} onChange={set("companyName")} className="auth-input" />
        </Field>
        <Field label="Full Name">
          <input required value={form.fullName} onChange={set("fullName")} className="auth-input" />
        </Field>
        <Field label="Email">
          <input type="email" required value={form.email} onChange={set("email")} className="auth-input" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Password">
            <PasswordInput value={form.password} onChange={set("password")} autoComplete="new-password" />
            <div className="text-xs text-muted-foreground mt-1.5">6 characters minimum</div>
          </Field>
          <Field label="Confirm Password">
            <PasswordInput value={form.confirm} onChange={set("confirm")} autoComplete="new-password" />
          </Field>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition shadow-glow disabled:opacity-60"
        >
          {loading ? "Creating..." : <>Create account <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>

      <div className="mt-6 text-sm text-muted-foreground">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </div>
    </AuthLayout>
  );
}
