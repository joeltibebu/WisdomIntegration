"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

// WCAG 2.1 AA — Touch Target Size (Success Criterion 2.5.5):
// All Button sizes meet the 44px minimum touch target requirement:
//   sm: min-h-[36px] — below 44px, intended for non-primary desktop-only actions
//   md: min-h-[44px] — meets the 44px minimum (default size)
//   lg: min-h-[52px] — exceeds the 44px minimum
// The default size (md) is used for all primary interactive actions across the platform.

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-wisdom-blue text-white hover:bg-blue-800 border border-transparent",
  secondary:
    "bg-wisdom-green text-white hover:bg-green-600 border border-transparent",
  outline:
    "bg-transparent text-wisdom-blue border border-wisdom-blue hover:bg-blue-50",
  ghost:
    "bg-transparent text-wisdom-text border border-transparent hover:bg-gray-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm min-h-[36px]",
  md: "px-5 py-2.5 text-base min-h-[44px]",
  lg: "px-7 py-3 text-lg min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-card font-body font-medium transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-wisdom-blue focus:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
