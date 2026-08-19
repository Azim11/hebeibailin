"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, hydrated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to account dashboard
  if (hydrated && user) {
    router.replace("/account");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const res = signIn(email, password);
      setLoading(false);
      if (res.success) {
        router.push("/account");
      } else {
        setError(res.error || "Failed to sign in. Please verify your credentials.");
      }
    }, 400);
  };

  const handleDemoSignIn = () => {
    setEmail("alexandra.vance@example.com");
    setPassword("password123");
    setError("");
    setLoading(true);

    setTimeout(() => {
      signIn("alexandra.vance@example.com", "password123");
      setLoading(false);
      router.push("/account");
    }, 400);
  };

  return (
    <div className="bg-ivory py-16 lg:py-24">
      <Container size="narrow">
        <div className="border border-line bg-warm/60 p-8 sm:p-12 lg:p-14">
          {/* Header */}
          <div className="text-center">
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Client Portal
            </p>
            <h1 className="mt-2 font-serif text-[2.25rem] text-ink sm:text-[2.75rem]">
              Sign In to Your Account
            </h1>
            <p className="mt-3 font-sans text-[0.875rem] text-stone">
              Access your order history, authenticated certificate dossier, and saved
              preferences.
            </p>
          </div>

          {/* 1-Click Demo Login Banner */}
          <div className="mt-8 border border-line bg-ivory p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 font-sans text-xs text-charcoal">
              <Sparkles className="size-4 text-champagne shrink-0" />
              <span>Testing the storefront? Use our preconfigured VIP collector account.</span>
            </div>
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="border border-ink bg-ink px-4 py-2 font-sans text-[0.6875rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
            >
              1-Click Demo Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxuryvault.com"
                className="border border-line bg-ivory px-4 py-3.5 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-champagne focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-line bg-ivory px-4 py-3.5 pr-12 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-champagne focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-taupe hover:text-ink transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <p className="border border-red-200 bg-red-50 p-3.5 font-sans text-xs text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 border border-ink bg-ink py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="size-4 animate-spin border-2 border-champagne border-t-transparent" />
              ) : (
                <>
                  <Lock className="size-3.5 text-champagne" />
                  <span>Sign In to Account</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 border-t border-line pt-6 text-center">
            <p className="font-sans text-[0.8125rem] text-stone">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/account/register"
                className="font-medium text-ink underline hover:text-champagne transition-colors"
              >
                Create an Account
              </Link>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 font-sans text-[0.6875rem] tracking-luxe text-taupe uppercase">
            <ShieldCheck className="size-3.5 text-champagne" />
            <span>256-Bit Encrypted Client Portal</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
