import { screen, cleanup, render } from "@testing-library/react";
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
  expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
});

test("renders an anchor tag", () => {
  setup({ as: "a", children: "Click me", href: "https://example.com" });
  const getLink = (name: string) => screen.getByRole("link", { name });
  expect(getLink("Click me")).toBeInTheDocument();
  expect(getLink("Click me")).toHaveAttribute(
    "href",
    "https://example.com",
  );
});
