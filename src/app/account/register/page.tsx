"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/store/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, user, hydrated } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to account dashboard
  if (hydrated && user) {
    router.replace("/account");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters in length.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = register({
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      setLoading(false);

      if (res.success) {
        router.push("/account");
      } else {
        setError(res.error || "Failed to create account. Please try again.");
      }
    }, 400);
  };

  return (
    <div className="bg-ivory py-16 lg:py-24">
      <Container size="narrow">
        <div className="border border-line bg-warm/60 p-8 sm:p-12 lg:p-14">
          {/* Header */}
          <div className="text-center">
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Join the House
            </p>
            <h1 className="mt-2 font-serif text-[2.25rem] text-ink sm:text-[2.75rem]">
              Create Your Account
            </h1>
            <p className="mt-3 font-sans text-[0.875rem] text-stone">
              Register to track acquisitions, store verified delivery addresses, and
              receive private collector previews.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="first-name"
                  className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                >
                  First Name *
                </label>
                <input
                  id="first-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Éléonore"
                  className="border border-line bg-ivory px-4 py-3.5 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-champagne focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="last-name"
                  className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                >
                  Last Name *
                </label>
                <input
                  id="last-name"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Laurent"
                  className="border border-line bg-ivory px-4 py-3.5 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-champagne focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
              >
                Email Address *
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
              <label
                htmlFor="phone"
                className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
              >
                Telephone (Optional for Courier Updates)
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (415) 555-0182"
                className="border border-line bg-ivory px-4 py-3.5 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-champagne focus:outline-none transition-colors"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full border border-line bg-ivory px-4 py-3.5 pr-10 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-champagne focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-ink transition-colors"
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

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="confirm-password"
                  className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="border border-line bg-ivory px-4 py-3.5 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-champagne focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 font-sans text-[0.8125rem] text-stone cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 size-4 accent-ink"
              />
              <span>
                I agree to the{" "}
                <Link href="/pages/terms" target="_blank" className="underline text-ink">
                  Terms &amp; Conditions
                </Link>{" "}
                and acknowledge the{" "}
                <Link href="/pages/privacy" target="_blank" className="underline text-ink">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

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
                  <span>Create Collector Account</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 border-t border-line pt-6 text-center">
            <p className="font-sans text-[0.8125rem] text-stone">
              Already have an account?{" "}
              <Link
                href="/account/login"
                className="font-medium text-ink underline hover:text-champagne transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 font-sans text-[0.6875rem] tracking-luxe text-taupe uppercase">
            <ShieldCheck className="size-3.5 text-champagne" />
            <span>256-Bit Encrypted Registration</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
