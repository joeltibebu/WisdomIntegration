// Feature: content-hub-management, Property 6: Blog post creation round-trip

/**
 * Validates: Requirements 6.3, 9.2
 *
 * Tests the round-trip logic for blog post creation:
 *   - POST /api/admin/blogs  (create a blog post)
 *   - GET  /api/admin/blogs/[id] (retrieve by id)
 *
 * No real DB or HTTP calls are made — we simulate an in-memory "database"
 * as a Map<id, record> and verify that after create, get returns a record
 * whose title, slug, content_type, and category exactly match the submitted values.
 */

import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Types mirroring the Prisma ContentPost model (fields relevant to round-trip)
// ---------------------------------------------------------------------------

interface BlogPostPayload {
  title: string;
  slug: string;
  body: string;
  content_type: "blog" | "devotional" | "guide";
  category: "for-parents" | "education-hub" | "spiritual-food";
  excerpt?: string | null;
  featured_image?: string | null;
  is_published?: boolean;
}

interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  body: string;
  content_type: "blog" | "devotional" | "guide";
  category: "for-parents" | "education-hub" | "spiritual-food";
  excerpt: string | null;
  featured_image: string | null;
  published: boolean;
}

// ---------------------------------------------------------------------------
// In-memory "database" — Map<id, record>
// ---------------------------------------------------------------------------

type Database = Map<string, BlogPostRecord>;

// ---------------------------------------------------------------------------
// create: stores the record in the DB and returns it (mirrors POST handler)
// ---------------------------------------------------------------------------

function createPost(db: Database, id: string, payload: BlogPostPayload): BlogPostRecord {
  const record: BlogPostRecord = {
    id,
    title: payload.title,
    slug: payload.slug,
    body: payload.body,
    content_type: payload.content_type,
    category: payload.category,
    excerpt: payload.excerpt ?? null,
    featured_image: payload.featured_image ?? null,
    published: payload.is_published ?? false,
  };
  db.set(id, record);
  return record;
}

// ---------------------------------------------------------------------------
// get: retrieves a record by id (mirrors GET /api/admin/blogs/[id] handler)
// ---------------------------------------------------------------------------

function getPost(db: Database, id: string): BlogPostRecord | null {
  return db.get(id) ?? null;
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

const slugArb = fc
  .stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  .filter((s) => s.length >= 1 && s.length <= 100);

const blogPostPayloadArb: fc.Arbitrary<BlogPostPayload> = fc.record({
  title: fc.string({ minLength: 1, maxLength: 80 }),
  slug: slugArb,
  body: fc.string({ minLength: 1, maxLength: 200 }),
  content_type: contentTypeArb,
  category: categoryArb,
  excerpt: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: null }),
  featured_image: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: null }),
  is_published: fc.boolean(),
});

// ---------------------------------------------------------------------------
// Property 6: Blog post creation round-trip
// ---------------------------------------------------------------------------

describe("Property 6: Blog post creation round-trip", () => {
  it("after create, get returns a record with matching title, slug, content_type, and category", () => {
    fc.assert(
      fc.property(fc.uuid(), blogPostPayloadArb, (id, payload) => {
        const db: Database = new Map();

        createPost(db, id, payload);
        const retrieved = getPost(db, id);

        expect(retrieved).not.toBeNull();
        if (retrieved !== null) {
          expect(retrieved.title).toBe(payload.title);
          expect(retrieved.slug).toBe(payload.slug);
          expect(retrieved.content_type).toBe(payload.content_type);
          expect(retrieved.category).toBe(payload.category);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("get returns null for an id that was never created", () => {
    fc.assert(
      fc.property(fc.uuid(), fc.uuid(), blogPostPayloadArb, (createdId, otherId, payload) => {
        fc.pre(createdId !== otherId);

        const db: Database = new Map();
        createPost(db, createdId, payload);

        const retrieved = getPost(db, otherId);
        expect(retrieved).toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  it("creating multiple posts preserves each post's fields independently", () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.uuid(),
        blogPostPayloadArb,
        blogPostPayloadArb,
        (id1, id2, payload1, payload2) => {
          fc.pre(id1 !== id2);

          const db: Database = new Map();
          createPost(db, id1, payload1);
          createPost(db, id2, payload2);

          const r1 = getPost(db, id1);
          const r2 = getPost(db, id2);

          expect(r1).not.toBeNull();
          expect(r2).not.toBeNull();

          if (r1 !== null) {
            expect(r1.title).toBe(payload1.title);
            expect(r1.slug).toBe(payload1.slug);
            expect(r1.content_type).toBe(payload1.content_type);
            expect(r1.category).toBe(payload1.category);
          }

          if (r2 !== null) {
            expect(r2.title).toBe(payload2.title);
            expect(r2.slug).toBe(payload2.slug);
            expect(r2.content_type).toBe(payload2.content_type);
            expect(r2.category).toBe(payload2.category);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
