import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import PassCode from "../PassCode";

test("renders passcode inputs", () => {
  render(<PassCode />);
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(5);
});
