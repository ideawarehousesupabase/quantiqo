import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, CheckCircle2, Wallet, AlertTriangle, Activity,
  FileCheck2, ScrollText, ArrowRight, Atom, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quantum Settlement — Workforce Governance for the AI Economy" },
      { name: "description", content: "Manage human contributors and AI agents through secure verification, settlement tracking, governance, and audit visibility." },
      { property: "og:title", content: "Quantum Settlement" },
      { property: "og:description", content: "Quantum-Safe Workforce Governance for the AI Economy." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: ShieldCheck, title: "PQC-ID Digital Identity", desc: "Quantum-verified identity for every human and AI agent in your workforce." },
  { icon: CheckCircle2, title: "Task Verification", desc: "Cryptographic proof of outputs from autonomous agents and human contributors." },
  { icon: Wallet, title: "Settlement Tracking", desc: "Real-time visibility into micro-settlements across hybrid workforces." },
  { icon: AlertTriangle, title: "RAID-Q Governance", desc: "Risks, assumptions, issues and dependencies — quantum-aware." },
  { icon: Activity, title: "Quantum Posture", desc: "Continuous readiness scoring across encryption, audit and compliance." },
  { icon: FileCheck2, title: "Compliance Visibility", desc: "Unified view of NCSC, FCA, GDPR, and ISO 27001 posture." },
  { icon: ScrollText, title: "Audit Transparency", desc: "Immutable trail of every actor, action, and decision in your stack." },
];

const steps = [
  { n: "01", title: "Create Workforce", desc: "Onboard humans and AI agents with quantum-verified identities." },
  { n: "02", title: "Assign Work", desc: "Distribute projects and tasks across hybrid teams." },
  { n: "03", title: "Verify Outputs", desc: "Cryptographic verification of every deliverable." },
  { n: "04", title: "Track Settlements", desc: "Auditable micro-settlements with full governance." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-8 w-8 rounded-md bg-primary/15 text-primary">
              <Atom className="h-4 w-4" />
            </div>
            <div className="font-semibold tracking-tight">Quantum Settlement</div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Platform</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#footer" className="hover:text-foreground">Company</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm px-3 py-2 text-muted-foreground hover:text-foreground">Sign In</Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 lg:pt-28 lg:pb-36">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-6">
            <Sparkles className="h-3 w-3" /> UK's First Post-Quantum Settlement Platform
          </div>
          <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            Quantum-Safe <span className="gradient-text">Workforce Governance</span> for the AI Economy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Manage human contributors and AI agents through secure verification, settlement tracking,
            governance, and audit visibility — built for the post-quantum era.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition shadow-glow"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-card/50 hover:bg-card transition font-medium"
            >
              Sign In
            </Link>
          </div>

          {/* Hero card */}
          <div className="mt-16 grid lg:grid-cols-3 gap-4 max-w-5xl">
            {[
              { label: "PQC-ID Verification", value: "99.9%" },
              { label: "Settlement Latency", value: "<200ms" },
              { label: "Quantum Posture", value: "87 / 100" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card/60 backdrop-blur p-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{m.label}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight gradient-text">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary">Platform</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">One platform. Every contributor. Verified.</h2>
            <p className="mt-3 text-muted-foreground">Seven capability pillars that bring agentic work under enterprise governance.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group relative rounded-xl border border-border bg-card p-6 transition hover:border-primary/40 hover:-translate-y-0.5">
                <div className="grid place-items-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border/60 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary">Workflow</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">How it works</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={s.n} className="relative rounded-xl border border-border bg-card p-6">
                <div className="font-mono text-xs text-primary">{s.n}</div>
                <div className="mt-3 text-lg font-semibold">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2.5 h-px w-5 bg-primary/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready for the post-quantum era?</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Bring AI agents and human teams under one verifiable, settled, governed workforce.</p>
          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition shadow-glow"
          >
            Create your workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid place-items-center h-7 w-7 rounded-md bg-primary/15 text-primary"><Atom className="h-4 w-4" /></div>
              <div className="font-semibold">Quantum Settlement</div>
            </div>
            <p className="mt-3 text-muted-foreground">Post-quantum settlement & agentic governance, built for the UK and beyond.</p>
          </div>
          <div>
            <div className="font-medium mb-3">Platform</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#how" className="hover:text-foreground">How it works</a></li>
              <li><Link to="/signup" className="hover:text-foreground">Get started</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>About</li><li>Contact</li><li>Careers</li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3">Legal</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Privacy</li><li>Terms</li><li>Security</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Quantum Settlement Ltd. All rights reserved.</div>
            <div className="font-mono uppercase tracking-[0.18em]">Post-Quantum · Agentic · Audit-Ready</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
