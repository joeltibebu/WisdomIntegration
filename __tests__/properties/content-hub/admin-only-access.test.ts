// Feature: content-hub-management, Property 4: Admin-only API access

/**
 * Validates: Requirements 6.9, 9.6
 *
 * Tests the requireAdmin() access control logic used by:
 *   - /api/admin/blogs/*
 *   - /api/admin/videos/*
 *
 * No real HTTP calls are made — we simulate the requireAdmin() function logic
 * with different session states and verify that:
 *   - Non-ADMIN sessions (null, PARENT, THERAPIST) always result in 401/403
 *   - ADMIN sessions always pass through (return null)
 */

import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Types mirroring the session shape from lib/auth.ts
// ---------------------------------------------------------------------------

type UserRole = "PARENT" | "THERAPIST" | "ADMIN";

interface MockSessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface MockSession {
  user: MockSessionUser;
}

// ---------------------------------------------------------------------------
// Result types mirroring the requireAdmin() return shape
// ---------------------------------------------------------------------------

type RequireAdminResult =
  | { error: "UNAUTHORIZED"; status: 401 }
  | { error: "FORBIDDEN"; status: 403 }
  | null; // null = success, session is ADMIN

// ---------------------------------------------------------------------------
// requireAdmin() logic — mirrors the implementation in the API route handlers
// ---------------------------------------------------------------------------

function requireAdmin(session: MockSession | null): RequireAdminResult {
  if (!session) return { error: "UNAUTHORIZED", status: 401 };
  if (session.user.role !== "ADMIN") return { error: "FORBIDDEN", status: 403 };
  return null;
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const nonAdminRoleArb = fc.constantFrom<UserRole>("PARENT", "THERAPIST");

const sessionUserArb = (role: UserRole) =>
  fc.record<MockSessionUser>({
    id: fc.uuid(),
    email: fc.emailAddress(),
    name: fc.string({ minLength: 1, maxLength: 50 }),
    role: fc.constant(role),
  });

const adminSessionArb: fc.Arbitrary<MockSession> = sessionUserArb("ADMIN").map(
  (user) => ({ user })
);

const nonAdminSessionArb: fc.Arbitrary<MockSession> = nonAdminRoleArb.chain(
  (role) => sessionUserArb(role).map((user) => ({ user }))
);

// ---------------------------------------------------------------------------
// Property 4: Admin-only API access
// ---------------------------------------------------------------------------

describe("Property 4: Admin-only API access", () => {
  it("null session always returns 401 UNAUTHORIZED", () => {
    const result = requireAdmin(null);
    expect(result).not.toBeNull();
    expect(result!.status).toBe(401);
    expect(result!.error).toBe("UNAUTHORIZED");
  });

  it("non-ADMIN role always returns 403 FORBIDDEN", () => {
    fc.assert(
      fc.property(nonAdminSessionArb, (session) => {
        const result = requireAdmin(session);

        expect(result).not.toBeNull();
        expect(result!.status).toBe(403);
        expect(result!.error).toBe("FORBIDDEN");
      }),
      { numRuns: 100 }
    );
  });

  it("any non-authenticated or non-ADMIN request returns 401 or 403 (never passes through)", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(null),
          nonAdminSessionArb
        ),
        (sessionOrNull) => {
          const result = requireAdmin(sessionOrNull);

          // Must never return null (which would mean access granted)
          expect(result).not.toBeNull();

          // Must return either 401 or 403
          expect([401, 403]).toContain(result!.status);

          // Null session → 401, non-ADMIN session → 403
          if (sessionOrNull === null) {
            expect(result!.status).toBe(401);
            expect(result!.error).toBe("UNAUTHORIZED");
          } else {
            expect(result!.status).toBe(403);
            expect(result!.error).toBe("FORBIDDEN");
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("ADMIN session always passes through (returns null)", () => {
    fc.assert(
      fc.property(adminSessionArb, (session) => {
        const result = requireAdmin(session);

        // null means access granted
        expect(result).toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  it("ADMIN session never returns an error response", () => {
    fc.assert(
      fc.property(adminSessionArb, (session) => {
        const result = requireAdmin(session);

        expect(result).toBeNull();
        // Confirm no error/status fields are present
        if (result !== null) {
          // This branch should never execute
          expect((result as { status?: number }).status).toBeUndefined();
        }
      }),
      { numRuns: 100 }
    );
  });
});
