"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  getStoredUser,
  loginWithEmail,
  logoutSession,
  type AuthUser,
} from "@/lib/api/auth";
import { cn } from "@/lib/utils";

type LoginTab = "email" | "google" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<LoginTab>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  async function onEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await loginWithEmail(email.trim(), password);
      setUser(session.user);
      router.push("/");
      router.refresh();
    } catch (err) {
      const message =
        err && typeof err === "object" && "response" in err
          ? String(
              (err as { response?: { data?: { message?: string } } }).response?.data
                ?.message ?? "Login failed. Check email and password.",
            )
          : "Login failed. Check email and password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function onLogout() {
    await logoutSession();
    setUser(null);
  }

  return (
    <section className="bg-[#F7F8F6] py-14 md:py-20">
      <Container className="max-w-md">
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-6 shadow-sm md:p-8">
          {user ? (
            <div className="space-y-4">
              <h1 className="font-heading text-2xl font-bold text-[#1A1A1A]">
                Signed in
              </h1>
              <p className="text-sm text-muted-foreground">
                Logged in as <span className="font-semibold text-[#1A1A1A]">{user.email}</span>
                {user.role ? ` (${user.role})` : ""}.
              </p>
              <div className="flex gap-2">
                <Button type="button" variant="primary" className="flex-1" asChild>
                  <Link href="/">Go to website</Link>
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-bold text-[#1A1A1A]">Welcome back</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Login to manage bookings and wishlist on {siteConfig.shortName}.
              </p>

              <div className="mt-5 flex gap-1 rounded-xl border border-[#e8ece6] bg-[#F7F8F6] p-1">
                {(
                  [
                    ["email", "Email"],
                    ["google", "Google"],
                    ["otp", "OTP"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={cn(
                      "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition",
                      tab === id
                        ? "bg-white text-[#2D5A27] shadow-sm"
                        : "text-muted-foreground hover:text-[#1A1A1A]",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tab === "email" ? (
                <form className="mt-6 space-y-4" onSubmit={onEmailLogin}>
                  <label className="block space-y-1.5 text-sm">
                    <span className="font-medium text-[#333]">Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      autoComplete="email"
                      className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-[#333]">Password</span>
                      <button
                        type="button"
                        className="text-xs font-semibold text-[#2D5A27] hover:underline"
                        onClick={() =>
                          alert("Password reset will be available once auth is connected.")
                        }
                      >
                        Forgot Password
                      </button>
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                  {error ? (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                  ) : null}
                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? "Signing in…" : "Login"}
                  </Button>
                </form>
              ) : null}

              {tab === "google" ? (
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Continue with Google. OAuth connects in a later release — this is a UI placeholder.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => alert("Google login coming soon.")}
                  >
                    Continue with Google
                  </Button>
                </div>
              ) : null}

              {tab === "otp" ? (
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    alert("OTP login UI only for now.");
                  }}
                >
                  <label className="block space-y-1.5 text-sm">
                    <span className="font-medium text-[#333]">Mobile number</span>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm">
                    <span className="font-medium text-[#333]">OTP</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="6-digit code"
                      className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1">
                      Send OTP
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1">
                      Verify & Login
                    </Button>
                  </div>
                </form>
              ) : null}

              <p className="mt-4 text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link href="/treks" className="font-semibold text-[#2D5A27] hover:underline">
                  Explore treks
                </Link>
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
