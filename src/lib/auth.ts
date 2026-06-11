import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// Simple localStorage-based auth (prototype only)
export interface User {
  id: string;
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

const USERS_KEY = "qs.users";
const SESSION_KEY = "qs.session";

function readUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function register(input: Omit<User, "id">): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", input.email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { ok: false, error: "An account with this email already exists." };
    }
    
    const user: User = { ...input, id: crypto.randomUUID() };
    await setDoc(doc(db, "users", user.id), user);
    
    // Also save to localStorage to maintain local session continuity for prototype
    const users = readUsers();
    writeUsers([...users, user]);
    
    return { ok: true, user };
  } catch (error: any) {
    return { ok: false, error: error.message || "Failed to register" };
  }
}

export async function login(email: string, password: string): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email.toLowerCase()), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { ok: false, error: "Invalid email or password." };
    }
    
    const user = querySnapshot.docs[0].data() as User;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email }));
    window.dispatchEvent(new Event("qs-auth-change"));
    return { ok: true, user };
  } catch (error: any) {
    return { ok: false, error: error.message || "Failed to login" };
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("qs-auth-change"));
}

export function currentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null");
    if (!session) return null;
    const users = readUsers();
    return users.find((u) => u.id === session.id) ?? null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(SESSION_KEY);
}
