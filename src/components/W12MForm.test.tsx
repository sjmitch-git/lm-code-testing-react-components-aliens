import { render, fireEvent } from "@testing-library/react";
import W12MForm from "./W12MForm";

describe("W12MForm Tests", () => {
  it("renders form element", () => {
    const { container } = render(<W12MForm />);
    expect(container.firstChild).toHaveClass("w12MForm");
  });

  it("renders input fields", () => {
    const { getByTestId } = render(<W12MForm />);

    expect(getByTestId("speciesname")).toBeInTheDocument();
    expect(getByTestId("planetname")).toBeInTheDocument();
    expect(getByTestId("beingsnumber")).toBeInTheDocument();
  });

  it("renders select dropdown", () => {
    const { getByTestId } = render(<W12MForm />);

    expect(getByTestId("question")).toBeInTheDocument();
  });

  it("submits the form with valid data", () => {
    const { getByTestId, getByText } = render(<W12MForm />);

    fireEvent.change(getByTestId("speciesname"), { target: { value: "Human" } });
    fireEvent.change(getByTestId("planetname"), { target: { value: "Earth" } });
    fireEvent.change(getByTestId("beingsnumber"), { target: { value: "2000000000" } });
    fireEvent.change(getByTestId("question"), { target: { value: "4" } });
    fireEvent.change(getByTestId("sparingreason"), {
      target: { value: "Some really valid reasons" },
    });

    fireEvent.submit(getByText("Submit"));
  });

  it("disables submit button with invalid data", () => {
    const { getByTestId, getByText } = render(<W12MForm />);

    fireEvent.change(getByTestId("speciesname"), { target: { value: "123" } });
    fireEvent.change(getByTestId("planetname"), { target: { value: "Invalid@Planet" } });
    fireEvent.change(getByTestId("beingsnumber"), { target: { value: "NotANumber" } });
    fireEvent.change(getByTestId("question"), { target: { value: "Not 4" } });

    expect(getByText("Submit")).toBeDisabled();
  });
});
