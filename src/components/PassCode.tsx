"use client";

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

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}

export function getInputLabel(index: number) {
  return `Passcode input ${index + 1}`;
}

export function getInputId(index: number) {
  return `passcode-input-${index + 1}`;
}
