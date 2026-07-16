import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

/**
 * Browser: always use same-origin `/api/v1` (nginx proxies to Express) — no CORS.
 * Server: use env absolute URL, falling back to the live site API.
 */
function resolveApiBaseUrl(): string {
  const fromEnv = (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    ""
  ).replace(/\/$/, "");

  if (typeof window !== "undefined") {
    return "/api/v1";
  }

  if (fromEnv) return fromEnv;

  return "https://treks.indiaholidaydestination.com/api/v1";
}

const ACCESS_KEY = "ihd_access_token";
const REFRESH_KEY = "ihd_refresh_token";
const USER_KEY = "ihd_user";

let client: AxiosInstance | null = null;
let refreshPromise: Promise<string | null> | null = null;

function readAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

function readRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

function persistAccessToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, token);
}

function clearAuthStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = readRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await axios.post<ApiSuccess<{ accessToken: string; refreshToken?: string; user?: unknown }>>(
      `${resolveApiBaseUrl()}/auth/refresh`,
      { refreshToken },
      {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        withCredentials: true,
        timeout: 20000,
      },
    );
    const nextAccess = res.data?.data?.accessToken;
    const nextRefresh = res.data?.data?.refreshToken;
    if (!nextAccess) return null;
    persistAccessToken(nextAccess);
    if (nextRefresh && typeof window !== "undefined") {
      localStorage.setItem(REFRESH_KEY, nextRefresh);
    }
    if (res.data?.data?.user && typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(res.data.data.user));
    }
    return nextAccess;
  } catch {
    clearAuthStorage();
    return null;
  }
}

function queueRefresh() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export function getApiClient(): AxiosInstance {
  if (client) return client;
  client = axios.create({
    baseURL: resolveApiBaseUrl(),
    timeout: 20000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true,
  });

  client.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = readAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const config = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
      const status = error.response?.status;
      const url = String(config?.url ?? "");
      const isAuthRoute = url.includes("/auth/login") || url.includes("/auth/refresh") || url.includes("/auth/register");

      if (!config || config._retry || status !== 401 || isAuthRoute || typeof window === "undefined") {
        return Promise.reject(error);
      }

      config._retry = true;
      const nextToken = await queueRefresh();
      if (!nextToken) {
        if (window.location.pathname.startsWith("/admin")) {
          window.location.href = "/login?next=/admin";
        }
        return Promise.reject(error);
      }

      config.headers.Authorization = `Bearer ${nextToken}`;
      return client!.request(config);
    },
  );

  return client;
}

export function getApiBaseUrl() {
  return resolveApiBaseUrl();
}

export type ApiSuccess<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    [key: string]: unknown;
  };
};

export async function apiGet<T>(url: string, params?: Record<string, unknown>): Promise<ApiSuccess<T>> {
  const res = await getApiClient().get<ApiSuccess<T>>(url, { params });
  return res.data;
}

export async function apiPost<T>(url: string, body?: unknown): Promise<ApiSuccess<T>> {
  const res = await getApiClient().post<ApiSuccess<T>>(url, body);
  return res.data;
}

export async function apiPatch<T>(url: string, body?: unknown): Promise<ApiSuccess<T>> {
  const res = await getApiClient().patch<ApiSuccess<T>>(url, body);
  return res.data;
}

export async function apiPut<T>(url: string, body?: unknown): Promise<ApiSuccess<T>> {
  const res = await getApiClient().put<ApiSuccess<T>>(url, body);
  return res.data;
}

export async function apiDelete<T = null>(url: string): Promise<ApiSuccess<T>> {
  const res = await getApiClient().delete<ApiSuccess<T>>(url);
  return res.data;
}
