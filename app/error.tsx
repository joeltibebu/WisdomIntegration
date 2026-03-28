"use client";

import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-wisdom-bg px-4">
      <div className="bg-wisdom-surface rounded-card shadow-md p-8 max-w-md w-full text-center">
        <div className="mb-4 text-5xl" aria-hidden="true">😔</div>
        <h1 className="text-2xl font-heading font-bold text-wisdom-text mb-2">
          Something went wrong
        </h1>
        <p className="text-wisdom-muted mb-6">
          We ran into an unexpected issue. Please try again — we&apos;re here to help.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-card font-body font-medium transition-colors duration-150 bg-wisdom-blue text-white hover:bg-blue-800 border border-transparent px-5 py-2.5 text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-wisdom-blue focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
