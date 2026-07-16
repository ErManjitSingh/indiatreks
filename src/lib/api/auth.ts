import { apiPost } from "@/lib/api/client";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

const ACCESS_KEY = "ihd_access_token";
const REFRESH_KEY = "ihd_refresh_token";
const USER_KEY = "ihd_user";

export function saveSession(data: AuthResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, data.accessToken);
  localStorage.setItem(REFRESH_KEY, data.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export async function loginWithEmail(email: string, password: string) {
  const res = await apiPost<AuthResponse>("/auth/login", { email, password });
  saveSession(res.data);
  return res.data;
}

export async function logoutSession() {
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null;
  try {
    if (refreshToken) await apiPost("/auth/logout", { refreshToken });
  } catch {
    // ignore
  }
  clearSession();
}
