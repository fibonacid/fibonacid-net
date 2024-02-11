"use client";

export default function PassCode() {
  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const id = `passcode-input-${i + 1}`;
        const label = `Passcode input ${i + 1}`;
        return (
          <div key={i}>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" />
          </div>
        );
      })}
    </div>
  );
}
