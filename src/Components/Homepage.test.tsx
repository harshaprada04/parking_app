import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";


const AddRouting = () => {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
};

test("renders correctly", () => {
  render(<AddRouting />);
});

test("Button is disabled", () => {
  render(<AddRouting />);
  const btn = screen.getByRole("button");
  expect(btn).toBeDisabled();
});

test("Space", () => {
  render(<AddRouting />);
  const textField = screen.getByLabelText(/parking space/i);
  fireEvent.change(textField, { target: { value: 5 } });
  const btn = screen.getByRole("button");
  expect(btn).not.toBeDisabled();
  let click = fireEvent.click(btn);
  expect(click).toBe(true);
});
