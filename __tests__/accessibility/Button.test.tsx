/**
 * Accessibility tests for core UI components using jest-axe.
 * Validates WCAG 2.1 AA compliance for Button and FormField.
 *
 * References: Requirements 12.4–12.11
 */

import React from "react";
import { render } from "@testing-library/react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { axe, toHaveNoViolations } = require("jest-axe");

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

expect.extend(toHaveNoViolations);

describe("Button accessibility", () => {
  it("renders a primary button without accessibility violations", async () => {
    const { container } = render(<Button>Book a Consultation</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a disabled button without accessibility violations", async () => {
    const { container } = render(<Button disabled>Submit</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a loading button without accessibility violations", async () => {
    const { container } = render(<Button isLoading>Loading...</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders an outline button without accessibility violations", async () => {
    const { container } = render(<Button variant="outline">Learn More</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("FormField accessibility", () => {
  it("renders a text input field without accessibility violations", async () => {
    const { container } = render(
      <FormField id="name" label="Full Name" placeholder="Enter your name" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a required field without accessibility violations", async () => {
    const { container } = render(
      <FormField id="email" label="Email Address" type="email" required />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a field with an error without accessibility violations", async () => {
    const { container } = render(
      <FormField
        id="phone"
        label="Phone Number"
        error="Phone number is required"
        required
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a textarea field without accessibility violations", async () => {
    const { container } = render(
      <FormField
        id="message"
        label="Message"
        fieldType="textarea"
        placeholder="Type your message here"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a select field without accessibility violations", async () => {
    const { container } = render(
      <FormField id="role" label="Role" fieldType="select">
        <option value="">Select a role</option>
        <option value="parent">Parent</option>
        <option value="therapist">Therapist</option>
      </FormField>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
