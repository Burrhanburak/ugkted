"use client";

export function OpenAlertButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.alert("Hello from docs")}
    >
      Open alert
    </button>
  );
}
