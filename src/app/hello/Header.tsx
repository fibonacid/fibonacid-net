"use client";

import Avatar from "@/components/Avatar";

export function Header() {
  return (
    <header className="z-10 absolute inset-x-5 top-5 flex gap-3 items-center">
      <Avatar className="w-10 h-10" />
      <h1 className="text-md text-white/50">fibonacid.net</h1>
    </header>
  );
}
