import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InteractiveCard from "../InteractiveCard";

describe("InteractiveCard", () => {
  test("renders children correctly", () => {
    const { getByText } = render(<InteractiveCard>Test Content</InteractiveCard>);
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  test("applies correct styles on mouse over", () => {
    const { container } = render(<InteractiveCard>Test Content</InteractiveCard>);
    const card = container.firstChild;

    // Initial state
    expect(card).toHaveClass("shadow-lg bg-white");

    // Simulate mouseover
    fireEvent.mouseOver(card as Element);

    // After mouseover
    expect(card).toHaveClass("shadow-2xl bg-neutral-200");
    expect(card).not.toHaveClass("shadow-lg bg-white");
  });

  test("reverts styles on mouse out", () => {
    const { container } = render(<InteractiveCard>Test Content</InteractiveCard>);
    const card = container.firstChild;

    // Simulate mouseover
    fireEvent.mouseOver(card as Element);
    expect(card).toHaveClass("shadow-2xl bg-neutral-200");

    // Simulate mouseout
    fireEvent.mouseOut(card as Element);
    expect(card).toHaveClass("shadow-lg bg-white");
    expect(card).not.toHaveClass("shadow-2xl bg-neutral-200");
  });
});
