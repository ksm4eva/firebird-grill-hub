// Mock admin auth using localStorage. NOT production — enable Lovable Cloud for real auth.
const KEY = "firebird_admin_session";
const PWD_KEY = "firebird_admin_password";
const DEFAULT_PWD = "firebird2026";

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PWD;
  return localStorage.getItem(PWD_KEY) ?? DEFAULT_PWD;
}

export function setAdminPassword(pwd: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PWD_KEY, pwd);
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}

export function adminLogin(pwd: string): boolean {
  if (pwd !== getAdminPassword()) return false;
  localStorage.setItem(KEY, "1");
  return true;
}

export function adminLogout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
