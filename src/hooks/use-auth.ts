import { useEffect, useState } from "react";
import { currentUser, type User } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => currentUser());

  useEffect(() => {
    const update = () => setUser(currentUser());
    update();
    window.addEventListener("qs-auth-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("qs-auth-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return { user, isAuthenticated: !!user };
}
