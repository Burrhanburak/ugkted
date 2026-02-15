"use client";

import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";

const steps = [
  { path: "/onboarding/scan", label: "Scan" },
  { path: "/onboarding/select-package", label: "Package" },
  { path: "/onboarding/form", label: "Details" },
  { path: "/onboarding/summary", label: "Summary" },
];

function StepIndicator() {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) => pathname === step.path);
  const currentStep = currentStepIndex === -1 ? 0 : currentStepIndex;
  const totalSteps = steps.length;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-0">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={index}
              type="button"
              disabled={index > currentStep}
              className={cn(
                "flex items-center justify-center rounded-full transition-all duration-150 ease-in-out",
                isActive
                  ? "h-4 w-7 cursor-default"
                  : "size-4",
                index > currentStep && "cursor-not-allowed"
              )}
              aria-label={`Step ${index + 1} of ${totalSteps}`}
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={cn(
                  "rounded-full transition-all",
                  isActive
                    ? "h-2 w-5 bg-foreground"
                    : isCompleted
                    ? "size-2 bg-foreground"
                    : "size-2 bg-foreground/30"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      {children}
      <StepIndicator />
    </div>
  );
}
