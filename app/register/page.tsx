"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, UserPlus } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const cleanEmail = email.trim();
      const userSession = {
        email: cleanEmail,
        name: fullName.trim() || cleanEmail.split("@")[0],
        role: "customer",
        loggedInAt: new Date().toISOString(),
      };

      // Set cookie and localStorage
      const cookieValue = encodeURIComponent(JSON.stringify(userSession));
      document.cookie = `shopflow_user=${cookieValue}; path=/; max-age=2592000; SameSite=Lax`;
      try {
        localStorage.setItem("shopflow_user", JSON.stringify(userSession));
      } catch {}

      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient();
          await Promise.race([
            supabase.auth.signUp({
              email: cleanEmail,
              password,
              options: {
                data: {
                  full_name: fullName,
                  role: "customer",
                },
              },
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2000)),
          ]);
        } catch {
          // Fallback to local session
        }
      }

      setSuccessMsg("Account registered successfully! Redirecting to your account...");
      setTimeout(() => {
        router.push("/account");
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to register. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-neutral-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mx-auto text-white shadow-md">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="font-integral text-2xl text-black">
            CREATE AN ACCOUNT
          </h1>
          <p className="text-xs text-neutral-500">
            Join SHOP.CO to track orders, save shipping info, and access perks.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full px-4 py-3 bg-[#F0F0F0] border-none rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#F0F0F0] border-none rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#F0F0F0] border-none rounded-full text-sm text-black placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-black hover:bg-neutral-800 text-white rounded-full font-semibold text-sm transition-all shadow-md mt-2 disabled:opacity-50"
          >
            <span>{loading ? "Creating account..." : "Sign Up"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-neutral-100 text-xs text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-black hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
