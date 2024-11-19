import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopMenuItem from "../TopMenuItem";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("TopMenuItem Component", () => {
  test("renders the title and assigns correct href", () => {
    const title = "Home";
    const pageRef = "/home";

    render(<TopMenuItem title={title} pageRef={pageRef} />);

    const link = screen.getByText(title);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", pageRef);
  });

  test("applies correct styles", () => {
    const title = "About";
    const pageRef = "/about";

    const { container } = render(<TopMenuItem title={title} pageRef={pageRef} />);
    const link = container.querySelector("a");

    expect(link).toHaveClass("text-gray-500");
  });
});
