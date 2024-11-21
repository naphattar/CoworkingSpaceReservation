import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import updateCoworkingspace from "@/libs/Coworkingspace/updateCoworkingspace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditCoworkingspaceForm from "../EditCoworkingspaceForm";

jest.mock("@/libs/Coworkingspace/updateCoworkingspace", () => jest.fn());

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));
  

describe("EditCoworkingspaceForm", () => {
  const mockRouterPush = jest.fn();
  const mockUpdateCoworkingspace = jest.fn();

  const mockInitialData = {
    name: "Coworking Space A",
    address: "123 Main Street",
    operatingHours: "08:00 - 18:00",
    province: "Bangkok",
    postalcode: "10100",
    tel: "1234567890",
    picture: "https://via.placeholder.com/150",
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { token: "test-token" } },
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (updateCoworkingspace as jest.Mock).mockImplementation(mockUpdateCoworkingspace);
    jest.clearAllMocks();
  });

  it("renders the form with initial data", () => {
    render(
      <EditCoworkingspaceForm
        initialData={mockInitialData}
        coworkingspaceId="1"
      />
    );

    expect(screen.getByLabelText(/Name/i)).toHaveValue(mockInitialData.name);
    expect(screen.getByLabelText(/Address/i)).toHaveValue(mockInitialData.address);
    expect(screen.getByLabelText(/Operating Hours/i)).toHaveValue(
      mockInitialData.operatingHours
    );
    expect(screen.getByLabelText(/Province/i)).toHaveValue(mockInitialData.province);
    expect(screen.getByLabelText(/Postal Code/i)).toHaveValue(mockInitialData.postalcode);
    expect(screen.getByLabelText(/Telephone/i)).toHaveValue(mockInitialData.tel);
    expect(screen.getByLabelText(/Picture URL/i)).toHaveValue(mockInitialData.picture);
  });

  it("updates the form state when inputs change", () => {
    render(
      <EditCoworkingspaceForm
        initialData={mockInitialData}
        coworkingspaceId="1"
      />
    );

    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });

    expect(nameInput).toHaveValue("Updated Name");
  });

  it("submits the form and calls updateCoworkingspace API", async () => {
    mockUpdateCoworkingspace.mockResolvedValueOnce({ success: true });

    render(
      <EditCoworkingspaceForm
        initialData={mockInitialData}
        coworkingspaceId="1"
      />
    );

    const submitButton = screen.getByRole("button", { name: /Update/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(mockUpdateCoworkingspace).toHaveBeenCalledWith(
          "1",
          mockInitialData.name,
          mockInitialData.address,
          mockInitialData.operatingHours,
          mockInitialData.province,
          mockInitialData.postalcode,
          mockInitialData.tel,
          mockInitialData.picture,
          "test-token"
        );
      });
    
      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith("/coworkingspace/1");
      });
  });
});
