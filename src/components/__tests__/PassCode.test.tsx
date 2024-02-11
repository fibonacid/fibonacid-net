import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import PassCode, { NUMBER_OF_INPUTS, getInputLabel } from "../PassCode";

function setup() {
  return {
    user: userEvent.setup(),
    ...render(<PassCode />),
  };
}

function getInput(index: number) {
  return screen.getByLabelText(getInputLabel(index), {
    exact: false,
  });
}

test("renders 5 inputs", () => {
  setup();
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toBeInTheDocument();
  }
});

test("accept a key and focuses next element", async () => {
  const { user } = setup();

  // focus first input
  await user.click(getInput(0));

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const key = i.toString();
    await user.keyboard(key);

    const currInput = getInput(i);
    expect(currInput).toHaveValue(key);

    if (i < NUMBER_OF_INPUTS - 1) {
      const nextInput = getInput(i + 1);
      expect(nextInput).toHaveFocus();
    }
  }
});

test("deletes keys with backspace", async () => {
  const { user } = setup();

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    const key = i.toString();

    // focus input
    await user.click(input);

    // type key (moves focus)
    await user.keyboard(key);
    expect(input).toHaveValue(key);

    // restore focus
    await user.click(input);

    // delete key
    await user.keyboard("{Backspace}");
    expect(input).toHaveValue("");
  }
});
