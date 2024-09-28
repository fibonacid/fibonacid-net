import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEventHandler,
} from "react";
import { flushSync } from "react-dom";

type NextInputHandler = (index: number) => void;
type PrevInputHandler = (index: number) => void;
type KeyInputHandler = (index: number, key: string) => void;

export const NUMBER_OF_INPUTS = 5;

const initialCode = new Array<string>(NUMBER_OF_INPUTS).fill("");

export type PassCodeProps = {
  validate: (code: string) => boolean | Promise<boolean>;
  onSuccess?: () => void;
  autoFocus?: boolean;
};

export default function PassCode({ validate, onSuccess }: PassCodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(initialCode);
  const [isValidating, setIsValidating] = useState(false);

  const getInputs = useCallback(() => {
    const container = containerRef.current;
    const inputs = container?.querySelectorAll("input");
    return inputs ?? [];
  }, []);

  useEffect(() => {
    const inputs = getInputs();
    const firstInput = inputs[0];
    if (firstInput && firstInput.disabled === false) {
      firstInput.focus();
    }
  }, [getInputs]);

  const reset = useCallback(() => {
    flushSync(() => {
      setCode(initialCode);
    });
    const inputs = getInputs();
    const firstInput = inputs[0];
    firstInput?.focus();
  }, [setCode, getInputs]);

  const handleKeyInput = useCallback<KeyInputHandler>(
    async (index, key) => {
      // check if the index is valid
      if (index < 0 || index >= NUMBER_OF_INPUTS) return;

      // update the code
      const newCode = [...code];
      newCode[index] = key;
      setCode(newCode);

      // if the code is complete, validate it
      if (newCode.every((value) => value !== "")) {
        const codeString = newCode.join("");
        resetFocus();

        // call the validate function
        console.log("Validating code...");

        const valueOrPromise = validate(codeString);
        let isValid: boolean;

        // resolve the promise if it's a promise
        if (valueOrPromise instanceof Promise) {
          setIsValidating(true);
          try {
            isValid = await valueOrPromise;
          } catch {
            isValid = false;
          }
          flushSync(() => setIsValidating(false));
        } else {
          isValid = valueOrPromise;
        }
        if (isValid) {
          onSuccess?.();
        } else {
          reset();
        }
      }
    },
    [code, validate, reset],
  );

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
      {code.map((value, index) => (
        <PassCodeInput
          key={index}
          index={index}
          value={value}
          onKeyInput={handleKeyInput}
          onNextInput={handleNextInput}
          onPrevInput={handlePrevInput}
          isValidating={isValidating}
        />
      ))}
    </div>
  );
}

function PassCodeInput({
  index,
  value,
  onNextInput,
  onPrevInput,
  onKeyInput,
  isValidating,
}: {
  index: number;
  value: string;
  onNextInput: NextInputHandler;
  onPrevInput: PrevInputHandler;
  onKeyInput: KeyInputHandler;
  isValidating: boolean;
}) {
  const id = getInputId(index);
  const label = getInputLabel(index);

  const handleKeyDown = useCallback<KeyboardEventHandler>(
    (e) => {
      const event = e.nativeEvent;

      if (isLetter(event) || isNumber(event)) {
        onKeyInput(index, e.key);
        onNextInput(index);
      } else if (isBackspace(event)) {
        if (value) {
          onKeyInput(index, "");
        } else {
          onKeyInput(index - 1, "");
          onPrevInput(index);
        }
      } else if (isArrowLeft(event)) {
        onPrevInput(index);
      } else if (isArrowRight(event)) {
        onNextInput(index);
      }
    },
    [onNextInput, onPrevInput, onKeyInput, value, index],
  );

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        onKeyDown={handleKeyDown}
        onChange={noop}
        value={value}
        className="uppercase w-12 h-12 text-xl text-center bg-neutral-950 rounded-md shadow-sm text-neutral-50 disabled:text-opacity-50 disabled:cursor-not-allowed"
        autoComplete="off"
        disabled={isValidating}
      />
    </div>
  );
}

function resetFocus() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

function noop() {
  // do nothing
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
