import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi, afterEach } from "vitest";
import PassCode, { NUMBER_OF_INPUTS, getInputLabel } from "../PassCode";

// This is required apparently
afterEach(cleanup);

function setup(props: { validate: () => boolean | Promise<boolean> }) {
  return {
    user: userEvent.setup(),
    ...render(<PassCode {...props} />),
  };
}

function getInput(index: number) {
  return screen.getByLabelText(getInputLabel(index), {
    exact: false,
  });
}

test("renders 5 empty inputs", () => {
  setup({ validate: () => true });
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toHaveValue("");
  }
});

test("renders 5 enabled inputs", () => {
  setup({ validate: () => true });
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).not.toBeDisabled();
  }
});

test("accepts a key and focuses next element", async () => {
  const { user } = setup({ validate: () => true });

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
  const { user } = setup({
    validate: () => true,
  });

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
  const { user } = setup({
    validate: () => true,
  });

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
  const { user } = setup({
    validate: () => true,
  });

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
  const { user } = setup({
    validate: () => true,
  });
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
  const { user } = setup({
    validate: () => true,
  });

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
  const { user } = setup({
    validate: () => true,
  });

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
  const validate = vi.fn().mockImplementationOnce((...args) => {
    console.log("Validate called with", args);
    return true;
  });
  const { user } = setup({
    validate,
  });

  const firstInput = getInput(0);
  await user.click(firstInput);

  expect(validate).not.toHaveBeenCalled();

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    await user.keyboard(i.toString());
  }

  expect(validate).toHaveBeenCalledTimes(1);
  expect(validate).toHaveBeenCalledWith("01234");
});

test("reset state when validate returns false (sync)", async () => {
  const validate = vi.fn().mockReturnValue(false);
  const { user } = setup({
    validate,
  });
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
  const validate = vi.fn().mockResolvedValueOnce(false);
  const { user } = setup({
    validate,
  });

  const firstInput = getInput(0);
  await user.click(firstInput);

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    await user.keyboard(i.toString());
  }

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toHaveValue("");
  }
  expect(getInput(0)).toHaveFocus();
});

test("loses focus when all inputs are filled", async () => {
  const validate = vi.fn().mockReturnValue(
    new Promise((resolve) => {
      setTimeout(resolve, 1000);
    }),
  );

  const { user } = setup({
    validate,
  });

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    await user.click(input);
    await user.keyboard(i.toString());
  }

  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).not.toHaveFocus();
  }
});

test("disables inputs during validation", async () => {
  const validate = vi.fn().mockReturnValueOnce(
    new Promise((resolve) => {
      setTimeout(resolve, 1000);
    }),
  );
  const { user } = setup({
    validate,
  });
  const delay = 1000;

  // fill inputs
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    const input = getInput(i);
    await user.click(input);
    await user.keyboard(i.toString());
  }

  // inputs are disabled
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).toBeDisabled();
  }

  // wait for validation to finish
  await new Promise((resolve) => setTimeout(resolve, delay));

  // inputs are enabled
  for (let i = 0; i < NUMBER_OF_INPUTS; i++) {
    expect(getInput(i)).not.toBeDisabled();
  }
});
