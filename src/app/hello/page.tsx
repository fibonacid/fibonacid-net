"use client";

import { Button } from "@/components/Button";

export default function Hello() {
  return (
    <main className="min-h-full grid gap-4 place-content-center">
      <div className="text-center flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl">Hello yourself!</h1>
        <p>To be honest, I don't care a lot about this website</p>
        <Button onClick={() => alert("I'm sorry")}>I am dissapointed</Button>
      </div>
    </main>
  );
}
