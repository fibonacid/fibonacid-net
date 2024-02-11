import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import PassCode, { getInputLabel } from "../PassCode";

const NUMBER_OF_INPUTS = 5;

function getInput(index: number) {
  return screen.getByLabelText(getInputLabel(index), {
    exact: false,
  });
}

test(`renders ${NUMBER_OF_INPUTS} inputs`, () => {
  render(<PassCode />);
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toBeInTheDocument();
  }
});

test("accepts input", async () => {
  const user = userEvent.setup();
  render(<PassCode />);

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    const value = i.toString();
    await user.type(input, value);
    expect(input).toHaveValue(value);
  }
});

test("focuses next input", async () => {
  const user = userEvent.setup();
  render(<PassCode />);

  const firstInput = getInput(0);
  await user.type(firstInput, "1");
  expect(getInput(1)).toHaveFocus();
});
