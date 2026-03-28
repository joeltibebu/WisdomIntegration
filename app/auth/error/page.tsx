import React from "react";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to access this resource.",
  Verification: "The verification link may have expired or already been used.",
  Default: "An unexpected authentication error occurred.",
};

interface AuthErrorPageProps {
  searchParams: { error?: string };
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const code = searchParams.error ?? "Default";
  const message = errorMessages[code] ?? errorMessages.Default;

  return (
    <main className="min-h-screen bg-wisdom-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="bg-wisdom-surface rounded-card shadow-sm border border-wisdom-border px-8 py-10">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-600" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </span>
          </div>

          <h1 className="text-xl font-heading font-semibold text-wisdom-text mb-2">
            Authentication Error
          </h1>
          <p className="text-wisdom-muted text-sm mb-6">{message}</p>

          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 rounded-card font-body font-medium transition-colors duration-150 bg-wisdom-blue text-white hover:bg-blue-800 border border-transparent px-5 py-2.5 text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-wisdom-blue focus:ring-offset-2"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
