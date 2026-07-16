import axios, { type AxiosError, type AxiosInstance } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  process.env.API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:4000/api/v1";

let client: AxiosInstance | null = null;

export function getApiClient(): AxiosInstance {
  if (client) return client;
  client = axios.create({
    baseURL: API_URL,
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
      // Refresh flow can be wired when auth store is connected
      return Promise.reject(error);
    },
  );

  return client;
}

export function getApiBaseUrl() {
  return API_URL;
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
