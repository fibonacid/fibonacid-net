"use client";

import Avatar from "@/components/Avatar";
import PassCode from "@/components/PassCode";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

async function validate(code: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return code === "hello";
}

export default function Home() {
  const router = useRouter();
  const onSuccess = useCallback(() => router.push("/hello"), [router]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-full grid gap-4 place-content-center"
    >
      <div className="flex flex-col items-center gap-6">
        <Avatar />
        <PassCode autoFocus validate={validate} onSuccess={onSuccess} />
        <h1 className="text-lg">
          Type <i>hello</i> to enter
        </h1>
      </div>
    </motion.main>
  );
}
