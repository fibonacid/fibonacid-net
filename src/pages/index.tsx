import { useRef, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

export default function Home() {
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <main className="m-4">
        <Hint level={4}>You did it!</Hint>
        <p>Sadly, this is all i got. Goodnight</p>
      </main>
    );
  }

  return (
    <main className="m-4">
      {attempts < 4 ? (
        <p>
          Type <Hint level={attempts}>something</Hint> if you want to see my
          website
        </p>
      ) : (
        <p>
          You literally have to type <Hint level={attempts}>something</Hint>
        </p>
      )}
      <InputCode
        className="mt-2"
        onSuccess={() => {
          console.log("Correct!");
          setSuccess(true);
        }}
        onError={() => {
          console.log("Incorrect!");
          setAttempts((attempts) => attempts + 1);
        }}
      />
    </main>
  );
}

function Hint({ level = 1, children }: { level?: number; children: string }) {
  return (
    <span
      className={twJoin(
        "inline-block",
        level > 0 && "underline",
        level > 1 && "animate-bounce",
        level > 2 && "border p-1 rounded !no-underline",
      )}
    >
      {children}
    </span>
  );
}

function InputCode({
  code = "something",
  className,
  onSuccess,
  onError,
}: {
  code?: string;
  className?: string;
  onSuccess: () => void;
  onError: () => void;
}) {
  const [value, setValue] = useState<string[]>([]);
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
        const thisValue = value[index];
        const correctValue = code[index];
        const isCorrect = thisValue === correctValue;
        const isEmpty = !thisValue;
        return (
          <div key={index}>
            <label htmlFor={id} className="sr-only">
              Letter {index + 1} of {code.length}
            </label>
            <input
              id={id}
              maxLength={1}
              className={twJoin(
                "rounded text-gray-900 w-8 h-8 text-center focus:outline-none focus:ring text-lg uppercase",
                isEmpty
                  ? "bg-gray-50"
                  : isCorrect
                  ? "bg-green-200"
                  : "bg-red-200",
              )}
              value={thisValue || ""}
              onChange={(e) => {
                const eventValue = e.target.value;
                if (eventValue === "") return;
                const newValue = [...value];
                newValue[index] = eventValue;
                setValue(newValue);
                const nextIndex = index + 1;
                if (nextIndex < code.length) {
                  moveFocus(nextIndex);
                } else {
                  if (newValue.join("") === code) {
                    onSuccess();
                  } else {
                    onError();
                    setValue([]);
                    moveFocus(0);
                  }
                }
              }}
            />
          </div>
        );
      })}
    </fieldset>
  );
}

/**
Alligator
Chameleon
Porcupine
*/
