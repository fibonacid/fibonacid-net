"use client";

import Avatar from "@/components/Avatar";
import PassCode from "@/components/PassCode";

export default function Home() {
  return (
    <main className="min-h-full grid gap-4 place-content-center">
      <div className="flex flex-col items-center gap-6">
        <Avatar />
        <PassCode
          validate={(code) => {
            return code === "hello";
          }}
        />
        <h1 className="text-lg">
          Type <i>hello</i> to enter
        </h1>
      </div>
    </main>
  );
}
