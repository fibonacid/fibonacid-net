"use client";

import Avatar from "@/components/Avatar";

export default function HelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full grid gap-4 place-content-center">
      <header className="z-10 absolute inset-x-5 top-5 flex gap-3 items-center">
        <Avatar className="w-10 h-10" />
        <h1 className="text-md text-white/50">fibonacid.net</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
