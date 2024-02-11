"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEventHandler,
  type ChangeEventHandler,
} from "react";

type NextInputHandler = (currentIndex: number) => void;

export const NUMBER_OF_INPUTS = 5;

export default function PassCode() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNextInput = useCallback<NextInputHandler>((currentIndex) => {
    const container = containerRef.current;
    const inputs = container?.querySelectorAll("input");
    const nextInput = inputs?.[currentIndex + 1];
    nextInput?.focus();
  }, []);

  return (
    <div ref={containerRef} className="flex gap-2">
      {[...Array(NUMBER_OF_INPUTS)].map((_, index) => (
        <PassCodeInput
          index={index}
          key={index}
          onNextInput={handleNextInput}
        />
      ))}
    </div>
  );
}

function PassCodeInput({
  index,
  onNextInput,
}: {
  index: number;
  onNextInput: NextInputHandler;
}) {
  const id = getInputId(index);
  const label = getInputLabel(index);
  const [value, setValue] = useState("");

  const handleKeyDown = useCallback<KeyboardEventHandler>(
    (e) => {
      setValue(e.key);
      onNextInput(index);
    },
    [onNextInput, index],
  );

  const handleChange = useCallback<ChangeEventHandler>(() => {
    // noop
  }, []);

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
        className="w-12 h-12 text-xl text-center bg-neutral-950 rounded-md shadow-sm"
        autoComplete="off"
      />
    </div>
  );
}

export function getInputLabel(index: number) {
  return `Passcode input ${index + 1}`;
}

export function getInputId(index: number) {
  return `passcode-input-${index + 1}`;
}
