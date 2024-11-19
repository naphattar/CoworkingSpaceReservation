import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders the title and description", () => {
    render(<Footer />);
    expect(screen.getByText("Captain Buriram")).toBeInTheDocument();
    expect(screen.getByText("Your destination for productive coworking spaces.")).toBeInTheDocument();
  });

  test("renders all links with correct hrefs", () => {
    render(<Footer />);
    const aboutLink = screen.getByText("About Us");
    const contactLink = screen.getByText("Contact");
    const termsLink = screen.getByText("Terms of Service");

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");

    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");

    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  test("applies correct styles", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("w-full bg-gray-800 text-gray-300 py-6");

    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveClass("hover:underline");
    });
  });
});
