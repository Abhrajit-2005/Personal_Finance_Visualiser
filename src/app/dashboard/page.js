"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Home from "@/components/Dashboard"; // your big home component

export default function DashboardPage() {
    return (
        <>
            <SignedIn>
                <Home />
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}
