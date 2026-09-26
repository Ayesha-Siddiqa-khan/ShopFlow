"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";

function SearchParamsReader({ onParam }: { onParam: (param: string) => void }) {
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom");
  useEffect(() => {
    if (redirectedFrom && redirectedFrom !== "/login") {
      onParam(redirectedFrom);
    }
  }, [redirectedFrom, onParam]);
  return null;
}

export default function LoginPage() {
  const [redirectedFrom, setRedirectedFrom] = useState("/account");
  const [email, setEmail] = useState("proeditorpakistanifeeling@gmail.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e?: React.FormEvent | React.MouseEvent) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    setLoading(true);

    const cleanEmail = email.trim() || "proeditorpakistanifeeling@gmail.com";
    const userName = cleanEmail.split("@")[0].replace(/[._-]/g, " ");
    const formattedName = userName
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const userSession = {
      email: cleanEmail,
      name: formattedName || "Pro Editor",
      role: cleanEmail.toLowerCase().includes("admin") ? "admin" : "customer",
      loggedInAt: new Date().toISOString(),
    };

    // Set cookie for middleware and localStorage for client state
    const cookieValue = encodeURIComponent(JSON.stringify(userSession));
    document.cookie = `shopflow_user=${cookieValue}; path=/; max-age=2592000; SameSite=Lax`;
    try {
      localStorage.setItem("shopflow_user", JSON.stringify(userSession));
    } catch {}

    setSuccessMsg(`Welcome back, ${userSession.name}! Redirecting...`);

    // Guaranteed instant full-page browser redirect
    const targetUrl = redirectedFrom && redirectedFrom !== "/login" ? redirectedFrom : "/account";
    window.location.href = targetUrl;
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <Suspense fallback={null}>
        <SearchParamsReader onParam={setRedirectedFrom} />
      </Suspense>

      <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-neutral-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mx-auto text-white shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-integral text-2xl text-black">
            WELCOME BACK
          </h1>
          <p className="text-xs text-neutral-500">
            Sign in to access your orders, saved addresses, and preferences.
          </p>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 p-3 text-xs bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-medium animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="proeditorpakistanifeeling@gmail.com"
              className="w-full px-4 py-3 bg-[#F0F0F0] border-none rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-black uppercase tracking-wider">
                Password
              </label>
              <Link href="#" className="text-xs text-neutral-500 hover:text-black hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#F0F0F0] border-none rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-black hover:bg-neutral-800 text-white rounded-full font-semibold text-sm transition-all shadow-md mt-2 cursor-pointer"
          >
            <span>{loading ? "Redirecting to Account..." : "Sign In to Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-neutral-100 text-xs text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-black hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
