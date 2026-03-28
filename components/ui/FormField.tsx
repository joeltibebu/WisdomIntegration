"use client";

import React from "react";

type FieldType = "input" | "textarea" | "select";

interface FormFieldProps {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  fieldType?: FieldType;
  required?: boolean;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  children?: React.ReactNode; // for select options
  rows?: number;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
}

// WCAG 2.1 AA Compliance — Label Requirements:
// Every FormField renders a <label> with htmlFor pointing to the input's id.
// Required fields include both a visible asterisk (aria-hidden) and a screen-reader-only
// "(required)" text. Errors are announced via role="alert" and aria-describedby.
// All inputs have a minimum height of 44px to meet touch target requirements.

const inputBase =
  "w-full rounded-lg border border-wisdom-border bg-white px-4 py-2.5 text-base text-wisdom-text placeholder:text-wisdom-muted " +
  "focus:outline-none focus:ring-2 focus:ring-wisdom-blue focus:border-wisdom-blue transition-colors min-h-[44px]";

export function FormField({
  id,
  label,
  type = "text",
  fieldType = "input",
  required = false,
  error,
  placeholder,
  value,
  onChange,
  children,
  rows = 4,
  className = "",
  disabled = false,
  autoComplete,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  const sharedProps = {
    id,
    name: id,
    required,
    disabled,
    placeholder,
    value,
    "aria-describedby": hasError ? errorId : undefined,
    "aria-invalid": hasError ? (true as const) : undefined,
    className: [
      inputBase,
      hasError ? "border-red-500 focus:ring-red-500" : "",
      disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
    ]
      .filter(Boolean)
      .join(" "),
  };

  return (
    <div className={["flex flex-col gap-1.5", className].join(" ")}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-wisdom-text"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
        {required && (
          <span className="sr-only"> (required)</span>
        )}
      </label>

      {fieldType === "textarea" ? (
        <textarea
          {...sharedProps}
          rows={rows}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          className={[sharedProps.className, "min-h-[unset] resize-y"].join(" ")}
        />
      ) : fieldType === "select" ? (
        <select
          {...sharedProps}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
        >
          {children}
        </select>
      ) : (
        <input
          {...sharedProps}
          type={type}
          autoComplete={autoComplete}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        />
      )}

      {hasError && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
