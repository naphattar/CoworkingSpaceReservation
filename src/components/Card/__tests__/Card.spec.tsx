import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../Card";

// Mocking next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

describe("Card Component", () => {
  const testProps = {
    coworkingspaceName: "Test Coworking Space",
    imgSrc: "/test-image.jpg",
  };

  test("renders coworking space name", () => {
    render(<Card {...testProps} />);
    expect(screen.getByText(testProps.coworkingspaceName)).toBeInTheDocument();
  });

  test("renders the image with correct src and alt", () => {
    render(<Card {...testProps} />);
    const image = screen.getByAltText(testProps.coworkingspaceName);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", testProps.imgSrc);
  });

  test("renders the gradient overlay and hover effect", () => {
    const { container } = render(<Card {...testProps} />);
    const gradientOverlay = container.querySelector(
      ".absolute.inset-0.bg-gradient-to-t"
    );
    expect(gradientOverlay).toBeInTheDocument();

    const image = container.querySelector("img");
    expect(image).toHaveClass(
      "object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
    );
  });

});
