"use client";

import { useState } from "react";

export default function PassCode() {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <PassCodeInput index={index} key={index} />
      ))}
    </div>
  );
}

function PassCodeInput({ index }: { index: number }) {
  const id = getInputId(index);
  const label = getInputLabel(index);
  const [value, setValue] = useState("");

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        onChange={(e) => e.preventDefault()}
        onKeyDown={(e) => setValue(e.key)}
        value={value}
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
