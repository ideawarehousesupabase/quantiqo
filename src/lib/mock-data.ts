export const kpis = {
  totalProjects: 24,
  humanContributors: 142,
  aiAgents: 58,
  activeSettlements: 37,
  complianceScore: 92,
};

export const workforceTrend = [
  { month: "Jan", humans: 110, agents: 24 },
  { month: "Feb", humans: 118, agents: 30 },
  { month: "Mar", humans: 122, agents: 36 },
  { month: "Apr", humans: 128, agents: 41 },
  { month: "May", humans: 134, agents: 49 },
  { month: "Jun", humans: 142, agents: 58 },
];

export const settlementTrend = [
  { month: "Jan", value: 124000 },
  { month: "Feb", value: 158000 },
  { month: "Mar", value: 171500 },
  { month: "Apr", value: 192000 },
  { month: "May", value: 218400 },
  { month: "Jun", value: 247800 },
];

export const recentActivity = [
  { id: "a1", type: "task", actor: "Agent Atlas-7", text: "completed task Invoice Reconciliation #4821", time: "2m ago" },
  { id: "a2", type: "settlement", actor: "System", text: "Settlement STL-2041 generated for £8,420.00", time: "14m ago" },
  { id: "a3", type: "risk", actor: "Sarah Patel", text: "logged a new HIGH risk in RAID-Q for Project Helios", time: "1h ago" },
  { id: "a4", type: "verification", actor: "Verifier", text: "verified output for Task TX-7712 (score 98%)", time: "2h ago" },
  { id: "a5", type: "task", actor: "Agent Orion-3", text: "completed task Contract Drafting #2210", time: "4h ago" },
  { id: "a6", type: "settlement", actor: "Finance Bot", text: "approved 12 pending settlements", time: "Yesterday" },
];

export const humans = [
  { id: "h1", name: "Sarah Patel", department: "Finance", project: "Helios", status: "Active" },
  { id: "h2", name: "James O'Connor", department: "Engineering", project: "Aurora", status: "Active" },
  { id: "h3", name: "Mei Tanaka", department: "Compliance", project: "Helios", status: "On Leave" },
  { id: "h4", name: "Daniel Schmidt", department: "Operations", project: "Vega", status: "Active" },
  { id: "h5", name: "Aisha Bello", department: "Legal", project: "Aurora", status: "Active" },
  { id: "h6", name: "Marco Rossi", department: "Risk", project: "Polaris", status: "Inactive" },
];

export const agents = [
  { id: "ag1", name: "Atlas-7", type: "Financial Reconciler", project: "Helios", status: "Active" },
  { id: "ag2", name: "Orion-3", type: "Contract Drafting", project: "Aurora", status: "Active" },
  { id: "ag3", name: "Vega-1", type: "Compliance Analyst", project: "Vega", status: "Idle" },
  { id: "ag4", name: "Lyra-9", type: "Risk Scoring", project: "Polaris", status: "Active" },
  { id: "ag5", name: "Nova-2", type: "Data Verification", project: "Helios", status: "Active" },
];

export const projects = [
  { id: "p1", name: "Helios", description: "Q3 settlement modernization across EMEA banking partners.", status: "Active", team: 24, agents: 6, compliance: "Compliant", timeline: "Jan 2026 – Dec 2026" },
  { id: "p2", name: "Aurora", description: "AI-assisted legal contract reconciliation workflow.", status: "Active", team: 18, agents: 4, compliance: "In Review", timeline: "Mar 2026 – Sep 2026" },
  { id: "p3", name: "Vega", description: "NCSC 2035 quantum-readiness migration program.", status: "Planning", team: 9, agents: 2, compliance: "Pending", timeline: "Q2 2026 – Q4 2027" },
  { id: "p4", name: "Polaris", description: "Defense supplier audit transparency rollout.", status: "Active", team: 12, agents: 5, compliance: "Compliant", timeline: "Feb 2026 – Nov 2026" },
];

export const identities = [
  { id: "PQC-ID-0001", name: "Sarah Patel", type: "Human", status: "Verified", created: "2026-01-14" },
  { id: "PQC-ID-0002", name: "Atlas-7", type: "AI Agent", status: "Verified", created: "2026-01-22" },
  { id: "PQC-ID-0003", name: "James O'Connor", type: "Human", status: "Verified", created: "2026-02-03" },
  { id: "PQC-ID-0004", name: "Orion-3", type: "AI Agent", status: "Verified", created: "2026-02-18" },
  { id: "PQC-ID-0005", name: "Mei Tanaka", type: "Human", status: "Pending", created: "2026-03-09" },
  { id: "PQC-ID-0006", name: "Lyra-9", type: "AI Agent", status: "Verified", created: "2026-03-21" },
];

export const tasks = [
  { id: "TX-7712", name: "Invoice Reconciliation #4821", assignee: "Atlas-7", type: "Automated", status: "Verified", score: 98, timestamp: "2026-06-10 14:22" },
  { id: "TX-7713", name: "Contract Clause Review", assignee: "Orion-3", type: "Automated", status: "Under Verification", score: 91, timestamp: "2026-06-10 13:08" },
  { id: "TX-7714", name: "GDPR Data Map Audit", assignee: "Mei Tanaka", type: "Manual", status: "Pending", score: 0, timestamp: "2026-06-10 12:40" },
  { id: "TX-7715", name: "Risk Score Recompute", assignee: "Lyra-9", type: "Automated", status: "Verified", score: 96, timestamp: "2026-06-10 11:15" },
  { id: "TX-7716", name: "Vendor Onboarding KYC", assignee: "Sarah Patel", type: "Manual", status: "Under Verification", score: 88, timestamp: "2026-06-10 10:02" },
];

export const settlements = [
  { id: "STL-2041", contributor: "Atlas-7", type: "AI Agent", amount: 8420.0, status: "Settled" },
  { id: "STL-2042", contributor: "Sarah Patel", type: "Human", amount: 3120.5, status: "Approved" },
  { id: "STL-2043", contributor: "Orion-3", type: "AI Agent", amount: 5640.0, status: "Pending" },
  { id: "STL-2044", contributor: "James O'Connor", type: "Human", amount: 4280.0, status: "Settled" },
  { id: "STL-2045", contributor: "Lyra-9", type: "AI Agent", amount: 2110.75, status: "Pending" },
  { id: "STL-2046", contributor: "Mei Tanaka", type: "Human", amount: 3960.0, status: "Approved" },
];

export const raidq = {
  Risks: [
    { id: "R-01", title: "HNDL exposure on legacy TLS endpoints", priority: "High", status: "Open", created: "2026-05-04" },
    { id: "R-02", title: "Vendor PQC migration lag", priority: "Medium", status: "Mitigating", created: "2026-05-18" },
  ],
  Assumptions: [
    { id: "A-01", title: "NCSC 2035 migration window remains stable", priority: "Medium", status: "Confirmed", created: "2026-04-12" },
  ],
  Issues: [
    { id: "I-01", title: "Agent Vega-1 latency spike >400ms", priority: "High", status: "Investigating", created: "2026-06-08" },
  ],
  Dependencies: [
    { id: "D-01", title: "Treasury settlement API rollout", priority: "High", status: "Tracking", created: "2026-03-30" },
  ],
} as Record<string, { id: string; title: string; priority: string; status: string; created: string }[]>;

export const posture = {
  score: 87,
  breakdown: [
    { label: "Encryption Readiness", value: 92 },
    { label: "Compliance Readiness", value: 88 },
    { label: "Audit Readiness", value: 84 },
    { label: "Risk Exposure", value: 22, inverse: true },
  ],
  trend: [
    { week: "W1", score: 71 },
    { week: "W2", score: 74 },
    { week: "W3", score: 78 },
    { week: "W4", score: 80 },
    { week: "W5", score: 83 },
    { week: "W6", score: 87 },
  ],
};

export const compliance = [
  { framework: "NCSC 2035", status: "In Review", coverage: 78 },
  { framework: "FCA", status: "Compliant", coverage: 96 },
  { framework: "GDPR", status: "Compliant", coverage: 94 },
  { framework: "ISO 27001", status: "Pending", coverage: 62 },
];

export const auditTrail = [
  { timestamp: "2026-06-10 14:22", actor: "Atlas-7", project: "Helios", action: "Completed task TX-7712", status: "Success" },
  { timestamp: "2026-06-10 14:18", actor: "Finance Bot", project: "Aurora", action: "Approved settlement STL-2041", status: "Success" },
  { timestamp: "2026-06-10 13:55", actor: "Sarah Patel", project: "Vega", action: "Created risk R-03", status: "Success" },
  { timestamp: "2026-06-10 13:08", actor: "Verifier", project: "Helios", action: "Verified output TX-7712", status: "Success" },
  { timestamp: "2026-06-10 12:31", actor: "Orion-3", project: "Polaris", action: "Submitted contract draft", status: "Pending" },
  { timestamp: "2026-06-10 11:15", actor: "Lyra-9", project: "Polaris", action: "Recomputed risk score", status: "Success" },
  { timestamp: "2026-06-10 10:02", actor: "Mei Tanaka", project: "Helios", action: "Started GDPR audit", status: "Pending" },
  { timestamp: "2026-06-09 18:44", actor: "System", project: "Vega", action: "Quantum posture recalculated", status: "Success" },
];
