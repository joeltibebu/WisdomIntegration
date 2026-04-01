"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface LoginFormProps {
  error?: string;
  expired?: boolean;
}

export function LoginForm({ error, expired }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  function validate() {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (!password) errors.password = "Password is required.";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setIsLoading(false);
        setFieldErrors({ password: "Invalid email or password. Please try again." });
        return;
      }

      // Fetch session to determine role-based redirect
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (role === "PARENT") {
        window.location.href = "/dashboard/parent/children";
      } else if (role === "THERAPIST") {
        window.location.href = "/dashboard/therapist/caseload";
      } else if (role === "ADMIN") {
        window.location.href = "/dashboard/admin/users";
      } else {
        window.location.href = "/";
      }
    } catch {
      setIsLoading(false);
    }
  }

  const credentialError = error === "CredentialsSignin" || error === "Signin";

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Sign in form" className="space-y-5">
      {expired && (
        <div role="alert" className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Your session has expired. Please sign in again.
        </div>
      )}

      {credentialError && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Invalid email or password. Please try again.
        </div>
      )}

      <FormField
        id="email"
        label="Email Address"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        error={fieldErrors.email}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        error={fieldErrors.password}
      />

      <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
        Sign In to Your Account
      </Button>
    </form>
  );
}
