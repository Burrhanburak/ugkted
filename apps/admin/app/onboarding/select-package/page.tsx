"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building,
  BriefcaseBusiness,
  ShoppingCart,
  Wrench,
  CheckCircle2,
  Undo2,
} from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { Pill } from "@repo/ui/components/ui/pill";
import { cn } from "@repo/ui/lib/utils";

interface Plan {
  id: number;
  name: string;
  description: string;
  setupPrice: number;
  monthlyPrice: number;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for small businesses getting started",
    setupPrice: 2500,
    monthlyPrice: 199,
    icon: <Building className="size-5" />,
  },
  {
    id: 2,
    name: "Commerce Suite",
    description: "For businesses with e-commerce needs",
    setupPrice: 5000,
    monthlyPrice: 399,
    icon: <BriefcaseBusiness className="size-5" />,
  },
  {
    id: 3,
    name: "Marketplace Suite",
    description: "Multi-vendor marketplace solution",
    setupPrice: 10000,
    monthlyPrice: 799,
    icon: <ShoppingCart className="size-5" />,
  },
  {
    id: 4,
    name: "Custom",
    description: "Tailored solution for your specific needs",
    setupPrice: 0,
    monthlyPrice: 0,
    icon: <Wrench className="size-5" />,
  },
];

const formatPrice = (price: number): string => {
  if (price === 0) return "Scope-based";
  return `$${price.toLocaleString()}`;
};

export default function SelectPackagePage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleContinue = () => {
    if (selectedPlan) {
      router.push(`/onboarding/form?package=${selectedPlan.name.toLowerCase().replace(" ", "-")}`);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
      {/* Package Selection */}
      {!selectedPlan && (
        <div className="flex w-full flex-col gap-4">
          <div className="mb-4 text-center">
            <h1 className="mb-2 text-2xl font-bold">Choose Your Package</h1>
            <p className="text-sm text-muted-foreground">
              Select the package that best fits your needs
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Pill variant="secondary" className="text-xs">
                <CheckCircle2 className="size-3 text-emerald-500" />
                One-time Custom build
              </Pill>
              <Pill variant="secondary" className="text-xs">
                <CheckCircle2 className="size-3 text-emerald-500" />
                Ongoing operation
              </Pill>
              <Pill variant="secondary" className="text-xs">
                <CheckCircle2 className="size-3 text-emerald-500" />
                Full ownership
              </Pill>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[340px] space-y-2">
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: plan.id * 0.1 }}
                onClick={() => setSelectedPlan(plan)}
                className="mx-auto flex w-full transform items-center justify-between rounded-2xl border bg-card px-5 py-3 transition-all duration-200 hover:scale-[1.01] hover:border-primary/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex shrink-0 items-center justify-center rounded-md border-2 border-primary bg-primary p-1.5 text-primary-foreground">
                    {plan.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <p className="text-lg font-semibold">{plan.name}</p>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {formatPrice(plan.setupPrice)}
                  </p>
                  {plan.setupPrice > 0 && (
                    <p className="text-xs text-muted-foreground">one-time</p>
                  )}
                  {plan.monthlyPrice > 0 && (
                    <p className="mt-1 text-xs text-foreground/70">
                      ${plan.monthlyPrice}/mo
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Package Details */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto w-full max-w-lg overflow-hidden rounded-xl bg-card p-5"
        >
          <button
            onClick={() => setSelectedPlan(null)}
            className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <Undo2 className="h-4 w-4" /> Go back
          </button>

          <div className="text-center">
            <h2 className="mb-2 text-xl font-bold">{selectedPlan.name}</h2>

            <div className="mb-2 text-2xl font-bold text-primary">
              {formatPrice(selectedPlan.setupPrice)}
              {selectedPlan.setupPrice > 0 && (
                <span className="ml-2 text-sm text-primary/80">
                  one-time setup
                </span>
              )}
            </div>

            {selectedPlan.monthlyPrice > 0 && (
              <div className="mb-2 text-lg text-muted-foreground">
                ${selectedPlan.monthlyPrice}/month
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              {selectedPlan.description}
            </p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              Custom-built system · You own it · Operated monthly
            </p>
          </div>

          {/* Continue Button */}
          <div className="mt-6">
            <p className="mb-2 text-center text-xs text-muted-foreground">
              Next: Tell us about your business — no payment yet
            </p>
            <Button onClick={handleContinue} className="w-full rounded-xl">
              Continue to onboarding
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
