import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import PassCode from "../PassCode";

function getInput(index: number) {
  return screen.getByLabelText(`Passcode input ${index + 1}`, {
    exact: false,
  });
}

test("renders passcode inputs", () => {
  render(<PassCode />);
  for (let i = 0; i < 4; i++) {
    expect(getInput(i)).toBeInTheDocument();
  }
});
