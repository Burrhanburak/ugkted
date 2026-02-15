"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Search, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Pill } from "@repo/ui/components/ui/pill";
import { cn } from "@repo/ui/lib/utils";

export default function OnboardingScanPage() {
  const router = useRouter();
  const [choice, setChoice] = useState<"yes" | "no" | "">("");
  const [domain, setDomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate scan or skip
    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/onboarding/select-package");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">Quick Website Check</h1>
          <p className="text-sm text-muted-foreground">
            Optional scan to show what&apos;s missing and how we can fix it
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Pill variant="secondary" className="text-xs">
              <Search className="size-3 text-primary" />
              SEO check
            </Pill>
            <Pill variant="secondary" className="text-xs">
              <Globe className="size-3 text-primary" />
              Presence signals
            </Pill>
            <Pill variant="secondary" className="text-xs">
              <Sparkles className="size-3 text-primary" />
              AI summary
            </Pill>
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border bg-card p-5"
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Do you already have a website?
            </h2>
            <p className="text-sm text-muted-foreground">
              If yes, we can scan it in seconds. If no, we will build from zero.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Choose one</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all",
                      choice === "yes"
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "hover:border-muted-foreground/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="has_website"
                      value="yes"
                      checked={choice === "yes"}
                      onChange={() => setChoice("yes")}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                        choice === "yes"
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {choice === "yes" && (
                        <div className="size-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span>Yes, I have a website</span>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all",
                      choice === "no"
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "hover:border-muted-foreground/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="has_website"
                      value="no"
                      checked={choice === "no"}
                      onChange={() => setChoice("no")}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                        choice === "no"
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {choice === "no" && (
                        <div className="size-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span>No, I do not</span>
                  </label>
                </div>
              </div>

              {choice === "yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="domain">Website (optional)</Label>
                  <Input
                    id="domain"
                    name="domain"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    autoComplete="url"
                    className="rounded-xl"
                  />
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={!choice || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Continue"}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                <Link
                  href="/onboarding/select-package"
                  className="transition-colors hover:text-foreground"
                >
                  Skip this step
                </Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
