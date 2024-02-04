import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import { describe, it } from "vitest";

describe("Register component", () => {
  it("should render register component correctly", () => {
    render(<Register />);
    const element = screen.getByRole("heading", { level: 2 });
    expect(element).toBeInTheDocument();
  });

  it("it should show error message when all the fields are not entered", async () => {
    render(<Register />);
    const buttonElement = screen.getByTestId("button");
    await userEvent.click(buttonElement);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should not show error when page initially loaded", () => {
    render(<Register />);
    const alert = screen.queryByRole("alert");
    expect(alert).not.toBeInTheDocument();
  });

  it("should show success message when registered successfully", async () => {
    render(<Register />);
    const buttonElement = screen.getByTestId("button");
    await userEvent.click(buttonElement);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });

  it("should test for presence of subheading in the component", () => {
    render(<Register />);
    const subheading = screen.getByRole("heading", {
      name: /please enter your details below to register yourself\./i,
    });
    expect(subheading).toBeInTheDocument();
  });
});
