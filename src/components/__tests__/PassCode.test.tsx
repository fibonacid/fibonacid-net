import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PassCode from "../PassCode";

const NUMBER_OF_INPUTS = 5;

function getInput(index: number) {
  return screen.getByLabelText(`Passcode input ${index + 1}`, {
    exact: false,
  });
}

test(`renders ${NUMBER_OF_INPUTS} inputs`, () => {
  render(<PassCode />);
  for (let i = 0; i < 5; i++) {
    expect(getInput(i)).toBeInTheDocument();
  }
});

test("accepts input", async () => {
  const user = userEvent.setup();
  render(<PassCode />);

  for (let i = 0; i < 5; i++) {
    const input = getInput(i);
    const value = i.toString();
    await user.type(input, value);
    expect(input).toHaveValue(value);
  }
});
