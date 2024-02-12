"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEventHandler,
  type ChangeEventHandler,
} from "react";

type NextInputHandler = (index: number) => void;
type PrevInputHandler = (index: number) => void;

export const NUMBER_OF_INPUTS = 5;

export default function PassCode() {
  const containerRef = useRef<HTMLDivElement>(null);

  const getInputs = useCallback(() => {
    const container = containerRef.current;
    const inputs = container?.querySelectorAll("input");
    return inputs ?? [];
  }, []);

  const handleNextInput = useCallback<NextInputHandler>(
    (index) => {
      const inputs = getInputs();
      const nextInput = inputs[index + 1];
      nextInput?.focus();
    },
    [getInputs],
  );

  const handlePrevInput = useCallback<PrevInputHandler>(
    (index) => {
      const inputs = getInputs();
      const prevInput = inputs[index - 1];
      prevInput?.focus();
    },
    [getInputs],
  );

  return (
    <div ref={containerRef} className="flex gap-2">
      {[...Array(NUMBER_OF_INPUTS)].map((_, index) => (
        <PassCodeInput
          index={index}
          key={index}
          onNextInput={handleNextInput}
          onPrevInput={handlePrevInput}
        />
      ))}
    </div>
  );
}

function PassCodeInput({
  index,
  onNextInput,
  onPrevInput,
}: {
  index: number;
  onNextInput: NextInputHandler;
  onPrevInput: PrevInputHandler;
}) {
  const id = getInputId(index);
  const label = getInputLabel(index);
  const [value, setValue] = useState("");

  const handleKeyDown = useCallback<KeyboardEventHandler>(
    (e) => {
      const event = e.nativeEvent;

      if (isLetter(event) || isNumber(event)) {
        setValue(e.key);
        onNextInput(index);
      } else if (isBackspace(event)) {
        if (value) {
          setValue("");
        } else {
          onPrevInput(index);
        }
      } else if (isArrowLeft(event)) {
        onPrevInput(index);
      } else if (isArrowRight(event)) {
        onNextInput(index);
      }
    },
    [onNextInput, onPrevInput, value, index],
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
        className="uppercase w-12 h-12 text-xl text-center bg-neutral-950 rounded-md shadow-sm"
        autoComplete="off"
      />
    </div>
  );
}

function isBackspace(e: KeyboardEvent) {
  return e.key === "Backspace";
}
function isArrowLeft(e: KeyboardEvent) {
  return e.key === "ArrowLeft";
}
function isArrowRight(e: KeyboardEvent) {
  return e.key === "ArrowRight";
}
function isNumber(e: KeyboardEvent) {
  return /^\d$/.test(e.key);
}
function isLetter(e: KeyboardEvent) {
  return /^[a-zA-Z]$/.test(e.key);
}

export function getInputLabel(index: number) {
  return `Passcode input ${index + 1}`;
}

export function getInputId(index: number) {
  return `passcode-input-${index + 1}`;
}
