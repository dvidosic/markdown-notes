"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabaseClient } from "../lib/supabaseClient";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await supabaseClient.auth.signOut();
      router.push("/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/notes"
          className="text-lg font-semibold tracking-tight text-slate-800"
        >
          Markdown Notes
        </Link>

        <nav className="flex items-center gap-3 text-sm text-slate-800">
          {isAuthPage ? (
            <>
              <Link
                href="/login"
                className="rounded-full border border-slate-300 px-3 py-1.5 text-slate-800 hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-slate-900 px-3 py-1.5 text-white hover:bg-black"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

