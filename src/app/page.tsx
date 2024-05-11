"use client";

import Avatar from "@/components/Avatar";
import PassCode from "@/components/PassCode";

async function validate(code: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return code === "hello";
}

export default function Home() {
  return (
    <main className="min-h-full grid gap-4 place-content-center">
      <div className="flex flex-col items-center gap-6">
        <Avatar />
        <PassCode validate={validate} />
        <h1 className="text-lg">
          Type <i>hello</i> to enter
        </h1>
      </div>
    </main>
  );
}
