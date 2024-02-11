import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, expect, test, describe } from "vitest";
import PassCode, { NUMBER_OF_INPUTS, getInputLabel } from "../PassCode";

function getInput(index: number) {
  return screen.getByLabelText(getInputLabel(index), {
    exact: false,
  });
}

test(`renders 5 inputs`, () => {
  render(<PassCode />);
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toBeInTheDocument();
  }
});

// This test suite demonstrates two related behaviors:
//  1. Each input can only accept one character.
//  2. The next input is focused after a character is typed.
describe("when user writes 12345", () => {
  beforeAll(async () => {
    render(<PassCode />);
    const user = userEvent.setup();
    const firstInput = getInput(0);
    await user.type(firstInput, "12345");
  });
  test("first input has value 1", () => {
    expect(getInput(0)).toHaveValue("1");
  });
  test("second input has value 2", () => {
    expect(getInput(1)).toHaveValue("2");
  });
  test("third input has value 3", () => {
    expect(getInput(2)).toHaveValue("3");
  });
  test("fourth input has value 4", () => {
    expect(getInput(3)).toHaveValue("4");
  });
  test("fifth input has value 5", () => {
    expect(getInput(4)).toHaveValue("5");
  });
});
