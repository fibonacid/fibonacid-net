"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";

const PASSCODE = "hello";

export default function PassCode() {
  const container = useRef<HTMLFieldSetElement>(null);
  const [values, setValues] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const moveFocus = useCallback((index: number) => {
    const input = container.current?.children[index] as
      | HTMLInputElement
      | undefined;
    input?.focus();
  }, []);

  return (
    <fieldset ref={container} className="flex gap-2">
      {PASSCODE.split("").map((_, index) => (
        <input
          key={index}
          className="w-12 h-12 text-4xl text-center bg-neutral-950 rounded-sm"
          value={values[index]}
          disabled={loading}
          onKeyDown={(e) => {
            // Handle arrow keys
            if (e.key === "ArrowRight") {
              return moveFocus(index + 1);
            }
            if (e.key === "ArrowLeft") {
              return moveFocus(index - 1);
            }
            if (e.key === "Backspace") {
              // Remove the nearest value and move focus
              const newValues = [...values];
              if (newValues[index]) {
                newValues[index] = "";
              } else {
                newValues[index - 1] = "";
              }
              setValues(newValues);
              return moveFocus(index - 1);
            }
            // Ignore special characters
            if (e.key.length > 1 || e.key === " ") {
              return;
            }
            // Set the value of the input
            const newValues = [...values];
            newValues[index] = e.key;

            flushSync(() => {
              setValues(newValues);
            });

            const numValues = newValues.filter((v) => v).length;
            if (numValues === PASSCODE.length) {
              const entered = newValues.join("");
              if (entered === PASSCODE) {
                router.push("/hello");
              } else {
                setValues(["", "", "", "", ""]);
                moveFocus(0);
              }
            } else {
              moveFocus(index + 1);
            }
          }}
        />
      ))}
    </fieldset>
  );
}
