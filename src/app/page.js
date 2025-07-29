"use client";

import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { isSignedIn } = useUser(); // ✅ Hook used correctly here
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <>
      {/* Redirect if signed in */}
      <SignedIn>
        {/* No UI needed here – effect handles redirect */}
      </SignedIn>

      {/* Not signed in? Show landing page */}
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 to-slate-100 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Personal Finance Visualiser</h1>
          <p className="text-xl mb-6">Track your spending, budgets, and gain insights.</p>

          {!showSignIn ? (
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          ) : (
            <div className="w-full max-w-sm mx-auto mt-6">
              <SignIn routing="hash" />
            </div>
          )}
        </div>
      </SignedOut>
    </>
  );
}
