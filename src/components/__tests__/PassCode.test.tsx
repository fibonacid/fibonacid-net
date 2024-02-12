import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import PassCode, { NUMBER_OF_INPUTS, getInputLabel } from "../PassCode";

function setup() {
  const validate = vi.fn();
  return {
    user: userEvent.setup(),
    validate,
    ...render(<PassCode validate={validate} />),
  };
}

function getInput(index: number) {
  return screen.getByLabelText(getInputLabel(index), {
    exact: false,
  });
}

test("renders 5 empty inputs", () => {
  setup();
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toHaveValue("");
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

test("moves focus to previous input with backspace", async () => {
  const { user } = setup();

  for (let i = NUMBER_OF_INPUTS - 1; i > 0; i--) {
    const currInput = getInput(i);
    const prevInput = getInput(i - 1);

    // focus input
    await user.click(currInput);

    // type backspace
    await user.keyboard("{Backspace}");

    // check focus
    expect(prevInput).toHaveFocus();
  }
});

test("deletes previous input with backspace", async () => {
  const { user } = setup();

  for (let i = 0; i < NUMBER_OF_INPUTS - 1; i++) {
    const key = i.toString();
    const currInput = getInput(i);

    // focus input
    await user.click(currInput);

    // fill input
    await user.keyboard(key);
    expect(currInput).toHaveValue(key);

    // type backspace
    await user.keyboard("{Backspace}");
    expect(currInput).toHaveValue("");
  }
});

test("accepts only alphanumeric keys", async () => {
  const { user } = setup();
  // default US-104-QWERTY keyboard
  const invalidKeys = [
    " ",
    "!",
    "#",
    "$",
    "%",
    "&",
    "(",
    ")",
    "*",
    "@",
    "Alt",
    "AltGraph",
    "ArrowDown",
    "ArrowUp",
    "Backspace",
    "CapsLock",
    "Control",
    "Delete",
    "End",
    "Enter",
    "Escape",
    "Fn",
    "Home",
    "Meta",
    "OS",
    "PageDown",
    "PageUp",
    "Shift",
    "Symbol",
    "Tab",
    "^",
  ];
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    await user.click(input);
    for (const key of invalidKeys) {
      await user.keyboard(key);
      expect(input).not.toHaveValue(key);
    }
  }
});

test("arrow right moves focus to the next input", async () => {
  const { user } = setup();

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const currInput = getInput(i);

    // focus input
    await user.click(currInput);

    // press right arrow
    await user.keyboard("{ArrowRight}");

    if (i < NUMBER_OF_INPUTS - 1) {
      const nextInput = getInput(i + 1);
      expect(nextInput).toHaveFocus();
    } else {
      // there is no next input
      expect(currInput).toHaveFocus();
    }
  }
});

test("arrow left moves focus to the previous input", async () => {
  const { user } = setup();

  for (let i = NUMBER_OF_INPUTS - 1; i >= 0; i--) {
    const currInput = getInput(i);

    // focus input
    await user.click(currInput);

    // press right arrow
    await user.keyboard("{ArrowLeft}");

    if (i > 0) {
      const prevInput = getInput(i - 1);
      expect(prevInput).toHaveFocus();
    } else {
      // there is no next input
      expect(currInput).toHaveFocus();
    }
  }
});

test("calls validate with the code when all inputs are filled", async () => {
  const { user, validate } = setup();

  const firstInput = getInput(0);
  await user.click(firstInput);
  await user.keyboard("0");

  expect(validate).not.toHaveBeenCalled();

  for (let i = 1; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    await user.click(input);
    await user.keyboard(i.toString());
  }

  expect(validate).toHaveBeenCalledWith("01234");
});

test("reset state when validate returns false (sync)", async () => {
  const { user, validate } = setup();
  validate.mockReturnValueOnce(false);

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    await user.click(input);
    await user.keyboard(i.toString());
  }

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toHaveValue("");
  }
  expect(getInput(0)).toHaveFocus();
});

test("clears inputs when validate returns false (async)", async () => {
  const { user, validate } = setup();
  validate.mockReturnValueOnce(Promise.resolve(false));

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    await user.click(input);
    await user.keyboard(i.toString());
  }

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toHaveValue("");
  }
  expect(getInput(0)).toHaveFocus();
});

test("should lose focus when all inputs are filled", async () => {
  const { user, validate } = setup();
  validate.mockReturnValueOnce(
    new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    }),
  );

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    await user.click(input);
    await user.keyboard(i.toString());
  }

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).not.toHaveFocus();
  }
});
