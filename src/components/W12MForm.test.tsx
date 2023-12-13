import { render } from "@testing-library/react";
import W12MForm from "./W12MForm";

test("renders form element", () => {
  const { container } = render(<W12MForm />);
  expect(container.firstChild).toHaveClass("w12MForm");
});

test("renders input fields", () => {
  const { getByTestId } = render(<W12MForm />);

  expect(getByTestId("speciesname")).toBeInTheDocument();
  expect(getByTestId("planetname")).toBeInTheDocument();
  expect(getByTestId("beingsnumber")).toBeInTheDocument();
});

test("renders select dropdown", () => {
  const { getByTestId } = render(<W12MForm />);

  expect(getByTestId("question")).toBeInTheDocument();
});
