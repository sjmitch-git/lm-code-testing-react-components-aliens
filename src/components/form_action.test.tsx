import { render, screen } from "@testing-library/react";
import FormAction from "./form_action";

describe("FormSection Rendering Tests", () => {
  it("renders the component with default props", () => {
    render(<FormAction isFormValid={false} />);

    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Please fill in all required fields correctly.")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders the component with custom label and valid form", () => {
    render(<FormAction label="Custom Label" isFormValid={true} />);

    expect(screen.getByText("Custom Label")).toBeInTheDocument();
    expect(
      screen.queryByText("Please fill in all required fields correctly.")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("renders the component with default label and valid form", () => {
    render(<FormAction isFormValid={true} />);

    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(
      screen.queryByText("Please fill in all required fields correctly.")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
