import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Home() {
  return (
    <main className="m-4">
      <h1>Type something if you want to see my website</h1>
      <InputCode className="mt-2" />
    </main>
  );
}

function InputCode({ className }: { className?: string }) {
  const code = "something";
  const [value, setValue] = useState(new Array<string>(code.length).fill(""));
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  const moveFocus = (index: number) => {
    const fieldset = fieldsetRef.current!;
    const inputs =
      fieldset.querySelectorAll<HTMLInputElement>("& > div > input");
    const input = inputs.item(index);
    input?.focus();
  };

  return (
    <fieldset ref={fieldsetRef} className={twMerge("flex gap-2", className)}>
      {Array.from({ length: code.length }).map((_, index) => {
        const id = `input-${index}`;
        return (
          <div key={index}>
            <label htmlFor={id} className="sr-only">
              Letter {index + 1} of {code.length}
            </label>
            <input
              id={id}
              maxLength={1}
              className="rounded text-gray-900 w-8 h-8 text-center focus:outline-none focus:ring text-lg uppercase"
              value={value[index]}
              onChange={(e) => {
                const newValue = [...value];
                newValue[index] = e.target.value;
                setValue(newValue);
                const nextIndex = index + 1;
                if (nextIndex < code.length) {
                  moveFocus(nextIndex);
                } else {
                  console.log("done");
                }
              }}
            />
          </div>
        );
      })}
    </fieldset>
  );
}
