"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";

const PASSCODE = "hello";

export default function PassCode() {
  const container = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(["", "", "", "", ""]);
  const router = useRouter();

  const moveFocus = useCallback((index: number) => {
    const element = container.current;
    if (!element) return;
    const inputs = element.querySelectorAll("input");
    const input = inputs.item(index);
    input?.focus();
  }, []);

  return (
    <div ref={container} className="flex gap-2">
      {PASSCODE.split("").map((_, index) => (
        <>
          <label className="sr-only" htmlFor={`passcode-${index}`}>
            Character {index + 1}
          </label>
          <input
            id={`passcode-${index}`}
            key={index}
            className="w-12 h-12 text-xl text-center bg-neutral-950 rounded-sm"
            value={values[index]}
            autoComplete="off"
            onKeyDown={(e) => {
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

              // Handle arrow keys
              if (e.key === "ArrowRight") {
                return moveFocus(index + 1);
              }
              if (e.key === "ArrowLeft") {
                return moveFocus(index - 1);
              }

              // Set the value of the input
              const newValues = [...values];
              newValues[index] = e.key.toUpperCase();

              // Update state synchronously
              flushSync(() => {
                setValues(newValues);
              });

              const numValues = newValues.filter((v) => v).length;

              // If all values are entered, check the passcode
              // Otherwise, move focus to the next input

              if (numValues === PASSCODE.length) {
                const entered = newValues.join("");
                if (entered.toUpperCase() === PASSCODE.toUpperCase()) {
                  // Redirect to the next page
                  router.push("/hello");
                } else {
                  // Reset the values and move focus
                  setValues(["", "", "", "", ""]);
                  moveFocus(0);
                }
              } else {
                moveFocus(index + 1);
              }
            }}
          />
        </>
      ))}
    </div>
  );
}
