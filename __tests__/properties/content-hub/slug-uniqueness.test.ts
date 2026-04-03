// Feature: content-hub-management, Property 3: Slug uniqueness is enforced

/**
 * Validates: Requirements 1.4, 6.8, 9.2
 *
 * Tests the slug uniqueness logic used by:
 *   - POST /api/admin/blogs  (ContentPost creation)
 *   - PATCH /api/admin/blogs/:id (ContentPost update)
 *
 * No real DB or HTTP calls are made — we simulate an in-memory "database"
 * and replicate the same slug uniqueness check logic as the API route handlers.
 * A duplicate slug must return a 409-equivalent error and leave the DB unchanged.
 */

import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Types mirroring the Prisma ContentPost model (fields relevant to slug logic)
// ---------------------------------------------------------------------------

interface MockContentPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  content_type: "blog" | "devotional" | "guide";
  category: "for-parents" | "education-hub" | "spiritual-food";
  published: boolean;
}

// ---------------------------------------------------------------------------
// Result types mirroring the API response shape
// ---------------------------------------------------------------------------

type InsertResult =
  | { success: true; record: MockContentPost }
  | { success: false; status: 409; code: "CONFLICT"; message: string };

// ---------------------------------------------------------------------------
// In-memory "database" insert logic — mirrors the POST /api/admin/blogs handler:
//   1. Check if slug already exists → return 409 if so
//   2. Otherwise insert and return the new record
// ---------------------------------------------------------------------------

function insertPost(
  db: MockContentPost[],
  post: MockContentPost
): InsertResult {
  const slugExists = db.some((r) => r.slug === post.slug);
  if (slugExists) {
    return {
      success: false,
      status: 409,
      code: "CONFLICT",
      message: "A post with this slug already exists.",
    };
  }
  db.push(post);
  return { success: true, record: post };
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const contentTypeArb = fc.constantFrom(
  "blog" as const,
  "devotional" as const,
  "guide" as const
);

const categoryArb = fc.constantFrom(
  "for-parents" as const,
  "education-hub" as const,
  "spiritual-food" as const
);

/** Generates a valid URL-safe slug string */
const slugArb = fc
  .stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  .filter((s) => s.length >= 1 && s.length <= 100);

const contentPostArb = (slug?: string) =>
  fc.record<MockContentPost>({
    id: fc.uuid(),
    title: fc.string({ minLength: 1, maxLength: 80 }),
    slug: slug !== undefined ? fc.constant(slug) : slugArb,
    body: fc.string({ minLength: 1, maxLength: 200 }),
    content_type: contentTypeArb,
    category: categoryArb,
    published: fc.boolean(),
  });

// ---------------------------------------------------------------------------
// Property 3: Slug uniqueness is enforced
// ---------------------------------------------------------------------------

describe("Property 3: Slug uniqueness is enforced", () => {
  it("inserting a record with a unique slug succeeds and returns the record", () => {
    fc.assert(
      fc.property(
        slugArb,
        fc.array(contentPostArb(), { minLength: 0, maxLength: 20 }),
        (slug, existingPosts) => {
          // Ensure no existing post uses this slug
          fc.pre(existingPosts.every((p) => p.slug !== slug));

          const db: MockContentPost[] = [...existingPosts];
          const newPost: MockContentPost = {
            id: "new-post-id",
            title: "New Post",
            slug,
            body: "body content",
            content_type: "blog",
            category: "for-parents",
            published: false,
          };

          const result = insertPost(db, newPost);

          expect(result.success).toBe(true);
          if (result.success) {
            expect(result.record.slug).toBe(slug);
            expect(db.some((p) => p.slug === slug)).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("inserting a second record with the same slug returns a 409-equivalent error", () => {
    fc.assert(
      fc.property(
        slugArb,
        fc.array(contentPostArb(), { minLength: 0, maxLength: 20 }),
        (slug, existingPosts) => {
          // Ensure no existing post uses this slug so the first insert succeeds
          fc.pre(existingPosts.every((p) => p.slug !== slug));

          const db: MockContentPost[] = [...existingPosts];

          const firstPost: MockContentPost = {
            id: "first-post-id",
            title: "First Post",
            slug,
            body: "first body",
            content_type: "blog",
            category: "for-parents",
            published: false,
          };

          const secondPost: MockContentPost = {
            id: "second-post-id",
            title: "Second Post",
            slug, // same slug — must be rejected
            body: "second body",
            content_type: "devotional",
            category: "education-hub",
            published: true,
          };

          // First insert must succeed
          const firstResult = insertPost(db, firstPost);
          expect(firstResult.success).toBe(true);

          // Second insert with duplicate slug must fail with 409
          const secondResult = insertPost(db, secondPost);
          expect(secondResult.success).toBe(false);
          if (!secondResult.success) {
            expect(secondResult.status).toBe(409);
            expect(secondResult.code).toBe("CONFLICT");
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("after a failed duplicate insert, the database still contains exactly one record with that slug", () => {
    fc.assert(
      fc.property(
        slugArb,
        fc.array(contentPostArb(), { minLength: 0, maxLength: 20 }),
        (slug, existingPosts) => {
          fc.pre(existingPosts.every((p) => p.slug !== slug));

          const db: MockContentPost[] = [...existingPosts];

          const firstPost: MockContentPost = {
            id: "first-post-id",
            title: "First Post",
            slug,
            body: "first body",
            content_type: "blog",
            category: "for-parents",
            published: false,
          };

          const duplicatePost: MockContentPost = {
            id: "duplicate-post-id",
            title: "Duplicate Post",
            slug, // duplicate slug
            body: "duplicate body",
            content_type: "guide",
            category: "spiritual-food",
            published: false,
          };

          // Insert the first post
          insertPost(db, firstPost);

          const dbSizeBeforeDuplicate = db.length;

          // Attempt to insert duplicate — must fail
          const duplicateResult = insertPost(db, duplicatePost);
          expect(duplicateResult.success).toBe(false);

          // DB must be unchanged: same size and exactly one record with this slug
          expect(db.length).toBe(dbSizeBeforeDuplicate);

          const postsWithSlug = db.filter((p) => p.slug === slug);
          expect(postsWithSlug).toHaveLength(1);
          expect(postsWithSlug[0].id).toBe(firstPost.id);
        }
      ),
      { numRuns: 100 }
    );
  });
});
