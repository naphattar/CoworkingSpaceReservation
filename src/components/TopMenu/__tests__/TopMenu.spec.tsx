import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import TopMenu from "../TopMenu";

// Mock `useRouter` to prevent errors
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock `useSession` to simulate authentication states
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("TopMenu Component", () => {
  const mockSession = {
    user: { name: "John Doe", role: "admin" },
  };

  test("renders without crashing and shows default menu items", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

    render(<TopMenu />);

    expect(screen.getByText("Captain Buriram")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Coworkingspaces")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders additional menu items for authenticated users", () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });

    render(<TopMenu />);

    expect(screen.getByText("Booking")).toBeInTheDocument();
    expect(screen.getByText("Booking History")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Welcome: John Doe")).toBeInTheDocument();
  });

  test("toggles dropdown menu when the user clicks on the dropdown button", () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });

    render(<TopMenu />);

    const dropdownButton = screen.getByText("Welcome: John Doe");
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();

    fireEvent.click(dropdownButton);
    expect(screen.getByText("Logout")).toBeInTheDocument();

    fireEvent.click(dropdownButton);
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

});
