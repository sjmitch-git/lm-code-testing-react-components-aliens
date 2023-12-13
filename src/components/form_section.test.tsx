import { render, screen, fireEvent } from "@testing-library/react";
import FormSection from "./form_section";

describe("FormSection Rendering Tests", () => {
  it("renders the component with default props", () => {
    render(<FormSection label="Test Label" name="testName" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByTestId("testName")).toBeInTheDocument();
  });

  it("renders different input types based on the 'tag' prop", () => {
    render(
      <FormSection
        label="Test Label"
        name="testName"
        tag="select"
        options={["Option 1", "Option 2"]}
      />
    );

    expect(screen.getByTestId("testName")).toHaveAttribute("data-testid", "testName");
  });

  it("renders the correct label, placeholder, and attributes based on props", () => {
    render(
      <FormSection label="Username" name="username" placeholder="Enter your username" required />
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    expect(screen.getByTestId("username")).toBeRequired();
  });

  it("renders the validation hint when 'validation' prop is provided", () => {
    render(
      <FormSection label="Test Label" name="testName" validation="This is a validation message" />
    );

    expect(screen.getByText("This is a validation message")).toBeInTheDocument();
  });

  it("renders options when 'tag' prop is 'select'", () => {
    render(
      <FormSection
        label="Select Option"
        name="selectOption"
        tag="select"
        options={["Option 1", "Option 2"]}
      />
    );

    expect(screen.getByTestId("selectOption")).toHaveAttribute("data-testid", "selectOption");
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});

describe("FormSection Validation Tests", () => {
  it("validates input type with specific pattern and validation message", () => {
    render(
      <FormSection
        label="Username"
        name="username"
        type="text"
        validation="Must be between 3 and 23 characters. No numbers or special characters allowed!"
        pattern="^[a-zA-Z]{3,23}$"
      />
    );

    const inputElement = screen.getByTestId("username");
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "ValidUsername" } });
    expect(inputElement).not.toHaveClass("error");

    // Test an invalid input (contains a number)
    fireEvent.change(inputElement, { target: { value: "Invalid123" } });
    expect(inputElement).toHaveClass("error");

    // Test an invalid input (less than 3 characters)
    fireEvent.change(inputElement, { target: { value: "Ab" } });
    expect(inputElement).toHaveClass("error");

    // Test an invalid input (more than 23 characters)
    fireEvent.change(inputElement, { target: { value: "AUsernameThatIsTooLongToBeValid" } });
    expect(inputElement).toHaveClass("error");

    // Ensure validation hint is rendered
    expect(
      screen.getByText(
        "Must be between 3 and 23 characters. No numbers or special characters allowed!"
      )
    ).toBeInTheDocument();
  });
});
