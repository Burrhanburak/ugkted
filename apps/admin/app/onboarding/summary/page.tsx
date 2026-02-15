"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/ui/button";

function SummaryContent() {
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package") || "starter";

  const packageNames: Record<string, string> = {
    starter: "Starter",
    "commerce-suite": "Commerce Suite",
    "marketplace-suite": "Marketplace Suite",
    custom: "Custom",
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-md space-y-6 text-center"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-500/20">
            <CheckCircle2 className="size-12 text-emerald-500" />
          </div>
        </div>

        <div>
          <h1 className="mb-2 text-2xl font-bold">You&apos;re All Set!</h1>
          <p className="text-muted-foreground">
            Thank you for completing the onboarding process.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <h2 className="mb-4 font-semibold">Summary</h2>
          <div className="space-y-3 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selected Package</span>
              <span className="font-medium">
                {packageNames[selectedPackage] || selectedPackage}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-emerald-500">Submitted</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Our team will review your submission and get back to you within 24-48
          hours.
        </p>

        <Button asChild className="w-full rounded-xl">
          <Link href="/">Go to Dashboard</Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default function OnboardingSummaryPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}
