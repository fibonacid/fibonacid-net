"use client";

import { ChangeEventHandler, useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";

export default function PassCode() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const nextValue = e.target.value;
      flushSync(() => {
        setValue(nextValue);
      });
      if (nextValue === "hello") {
        router.push(`/${nextValue}`);
      }
    },
    [router],
  );

  return (
    <input
      type="password"
      placeholder="Type hello to enter"
      className="focus:ring-neutral-700 bg-neutral-950 text-neutral-50 rounded-sm border-none text-center"
      onChange={handleChange}
      value={value}
    />
  );
}
