import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User, isAdminAuthenticated, adminLogout } from "@/lib/auth";
import { toast } from "sonner";
import { LogOut, Users, Check, X, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Quantum Settlement" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate({ to: "/admin" });
      return;
    }
    setReady(true);
    fetchPendingUsers();
  }, [navigate]);

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("status", "==", "Pending"));
      const snapshot = await getDocs(q);
      const fetchedUsers = snapshot.docs.map(doc => doc.data() as User);
      setUsers(fetchedUsers);
    } catch (error: any) {
      toast.error("Failed to fetch pending users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await updateDoc(doc(db, "users", userId), { status: "Approved" });
      toast.success("User approved successfully.");
      setUsers(users.filter(u => u.id !== userId));
    } catch (error: any) {
      toast.error("Failed to approve user: " + error.message);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await updateDoc(doc(db, "users", userId), { status: "Rejected" });
      toast.success("User rejected successfully.");
      setUsers(users.filter(u => u.id !== userId));
    } catch (error: any) {
      toast.error("Failed to reject user: " + error.message);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate({ to: "/admin" });
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
          <div className="grid place-items-center h-9 w-9 rounded-md bg-destructive/15 text-destructive">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold tracking-tight text-sidebar-foreground">Admin Portal</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Quantum Settlement</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm bg-primary/15 text-primary border-l-2 border-primary">
            <Users className="h-4 w-4 shrink-0" />
            <span>Pending Approvals</span>
          </div>
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card/40 backdrop-blur flex items-center gap-3 px-4 lg:px-6 sticky top-0 z-30">
          <h1 className="text-sm lg:text-base font-semibold tracking-tight">Pending Approvals</h1>
        </header>
        <main className="flex-1 overflow-x-hidden p-4 lg:p-8">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">User Registration Requests</h2>
                <p className="text-sm text-muted-foreground mt-1">Review and manage pending access requests for the workspace.</p>
              </div>
            </div>
            
            <div className="rounded-md border border-border bg-card overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider">Full Name</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider">Company Name</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">Loading pending requests...</td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground flex flex-col items-center">
                          <Check className="h-8 w-8 mb-3 text-muted-foreground/50" />
                          <div>No pending user registrations.</div>
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors last:border-0">
                          <td className="px-6 py-4 font-medium">{u.fullName}</td>
                          <td className="px-6 py-4">{u.companyName}</td>
                          <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-500/20">
                              {u.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApprove(u.id)}
                                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-500 hover:bg-emerald-500/20 transition-colors"
                              >
                                <Check className="h-3.5 w-3.5" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(u.id)}
                                className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
                              >
                                <X className="h-3.5 w-3.5" />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
