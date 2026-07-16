import axios, { type AxiosError, type AxiosInstance } from "axios";

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
    // Same-origin relative path works on production and avoids CORS.
    return "/api/v1";
  }

  if (fromEnv) return fromEnv;

  return "https://treks.indiaholidaydestination.com/api/v1";
}

let client: AxiosInstance | null = null;

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
      const token = localStorage.getItem("ihd_access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const config = error.config as typeof error.config & { _retry?: boolean };
      if (!config || config._retry || !error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }
      return Promise.reject(error);
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
