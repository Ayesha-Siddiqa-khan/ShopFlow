"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setSubscribed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-1/2">
      <div className="bg-black text-white rounded-[2rem] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
        <h2 className="font-integral text-2xl sm:text-4xl max-w-lg leading-tight">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>

        <div className="w-full sm:w-auto flex flex-col gap-3 max-w-sm">
          {subscribed ? (
            <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                <Check className="w-4 h-4" />
                <span>You&apos;re on the list!</span>
              </div>
              <p className="text-xs text-neutral-300">
                Check <span className="text-white font-semibold">{email}</span> for your 20% off welcome code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="Enter your email address"
                  className="w-full bg-white text-black pl-12 pr-4 py-3 rounded-full text-sm outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-400"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 pl-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-3 rounded-full text-sm hover:bg-neutral-200 transition-colors shadow-sm"
              >
                Subscribe to Newsletter
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
