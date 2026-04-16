import type { ReactNode } from "react";

type Props = { children: ReactNode };

/** Liste ve içerik sayfalarında Nur Star tarzı gradient çerçeve — tutarlı üst düzen. */
export function ContentLayoutShell({ children }: Props) {
  return (
    <div className="flex min-h-svh w-full items-stretch justify-center bg-background text-primary">
      <section className="relative mx-2.5 mb-6 mt-2.5 flex w-full flex-1 flex-col  lg:mx-4 lg:mb-10">
        {children}
      </section>
    </div>
  );
}
