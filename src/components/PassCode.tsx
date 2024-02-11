"use client";

export default function PassCode() {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <input key={i} type="text" />
      ))}
    </div>
  );
}
