import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ElementType } from "react";
import { afterEach, expect, test } from "vitest";
import { Button, type ButtonProps } from "../Button";

// This is required apparently
afterEach(cleanup);

function setup<T extends ElementType = "button">(props: ButtonProps<T>) {
  return {
    user: userEvent.setup(),
    ...render(<Button {...props} />),
  };
}

test("renders a button", () => {
  setup({ children: "Click me" });
  expect(document.querySelector("button")).toBeInTheDocument();
});

test("renders an anchor tag", () => {
  setup({ as: "a", children: "Click me", href: "https://example.com" });
  expect(document.querySelector("a")).toBeInTheDocument();
  expect(document.querySelector("a")).toHaveAttribute(
    "href",
    "https://example.com",
  );
});
