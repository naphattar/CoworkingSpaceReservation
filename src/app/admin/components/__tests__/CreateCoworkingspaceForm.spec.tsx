import CoworkingspaceCatalog from "@/app/coworkingspace/components/CoworkingspaceCatalog";
import { render, screen } from "@testing-library/react";

describe("CoworkingspaceCatalog Component", () => {
  const mockCoworkingspaces: CoWorkingSpace[] = [
    {
      id: "1",
      name: "Coworking Space A",
      address: "123 Main Street",
      operatingHours: "08:00 - 18:00",
      province: "Bangkok",
      postalcode: "10100",
      tel: "1234567890",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Coworking Space B",
      address: "456 Elm Street",
      operatingHours: "09:00 - 17:00",
      province: "Chiang Mai",
      postalcode: "50200",
      tel: "0987654321",
      picture: "https://via.placeholder.com/150",
    },
  ];

  it("renders the correct number of coworking spaces", () => {
    render(
        <CoworkingspaceCatalog coworkingspaces={mockCoworkingspaces} />
    );

    const coworkingCards = screen.getAllByRole("link");
    expect(coworkingCards).toHaveLength(mockCoworkingspaces.length);
  });

  it("displays coworking space names", () => {
    render(
        <CoworkingspaceCatalog coworkingspaces={mockCoworkingspaces} />
    );

    mockCoworkingspaces.forEach((space) => {
      expect(screen.getByText(space.name)).toBeInTheDocument();
    });
  });

  it("links to the correct coworking space pages", () => {
    render(
        <CoworkingspaceCatalog coworkingspaces={mockCoworkingspaces} />
    );

    mockCoworkingspaces.forEach((space) => {
      const link = screen.getByRole("link", { name: space.name });
      expect(link).toHaveAttribute("href", `/coworkingspace/${space.id}`);
    });
  });
});
