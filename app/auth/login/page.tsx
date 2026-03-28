import React from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

interface LoginPageProps {
  searchParams: { error?: string; expired?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const error = searchParams.error;
  const expired = searchParams.expired === "true" || searchParams.expired === "1";

  return (
    <main className="min-h-screen bg-wisdom-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block text-wisdom-blue font-heading font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
          >
            Wisdom Integration
          </Link>
          <p className="mt-2 text-wisdom-muted text-sm">
            Empowering Every Child&apos;s Journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-wisdom-surface rounded-card shadow-sm border border-wisdom-border px-8 py-10">
          <h1 className="text-2xl font-heading font-semibold text-wisdom-text mb-6 text-center">
            Welcome Back
          </h1>

          <LoginForm error={error} expired={expired} />

          <p className="mt-6 text-center text-sm text-wisdom-muted">
            <Link
              href="/"
              className="text-wisdom-blue hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
