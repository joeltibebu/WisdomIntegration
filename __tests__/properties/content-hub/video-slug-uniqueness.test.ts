// Feature: content-hub-management, Property 3: Slug uniqueness is enforced (Video)

/**
 * Validates: Requirements 1.4, 7.8, 10.2
 *
 * Tests the slug uniqueness logic used by:
 *   - POST /api/admin/videos  (Video creation)
 *   - PATCH /api/admin/videos/:id (Video update)
 *
 * No real DB or HTTP calls are made — we simulate an in-memory "database"
 * and replicate the same slug uniqueness check logic as the API route handlers.
 * A duplicate slug must return a 409-equivalent error and leave the DB unchanged.
 */

import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Types mirroring the Prisma Video model (fields relevant to slug logic)
// ---------------------------------------------------------------------------

interface MockVideo {
  id: string;
  title: string;
  slug: string;
  video_url: string;
  category: string;
  description: string;
  thumbnail_url: string | null;
  is_featured: boolean;
  is_published: boolean;
}

// ---------------------------------------------------------------------------
// Result types mirroring the API response shape
// ---------------------------------------------------------------------------

type InsertResult =
  | { success: true; record: MockVideo }
  | { success: false; status: 409; code: "CONFLICT"; message: string };

// ---------------------------------------------------------------------------
// In-memory "database" insert logic — mirrors the POST /api/admin/videos handler:
//   1. Check if slug already exists → return 409 if so
//   2. Otherwise insert and return the new record
// ---------------------------------------------------------------------------

function insertVideo(db: MockVideo[], video: MockVideo): InsertResult {
  const slugExists = db.some((r) => r.slug === video.slug);
  if (slugExists) {
    return {
      success: false,
      status: 409,
      code: "CONFLICT",
      message: "A video with this slug already exists.",
    };
  }
  db.push(video);
  return { success: true, record: video };
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/** Generates a valid URL-safe slug string */
const slugArb = fc
  .stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  .filter((s) => s.length >= 1 && s.length <= 100);

const videoArb = (slug?: string) =>
  fc.record<MockVideo>({
    id: fc.uuid(),
    title: fc.string({ minLength: 1, maxLength: 80 }),
    slug: slug !== undefined ? fc.constant(slug) : slugArb,
    video_url: fc.string({ minLength: 1, maxLength: 200 }),
    category: fc.constantFrom("for-parents", "education-hub", "spiritual-food"),
    description: fc.string({ minLength: 0, maxLength: 200 }),
    thumbnail_url: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: null }),
    is_featured: fc.boolean(),
    is_published: fc.boolean(),
  });

// ---------------------------------------------------------------------------
// Property 3: Slug uniqueness is enforced (Video)
// ---------------------------------------------------------------------------

describe("Property 3: Slug uniqueness is enforced (Video)", () => {
  it("inserting a video with a unique slug succeeds and returns the record", () => {
    fc.assert(
      fc.property(
        slugArb,
        fc.array(videoArb(), { minLength: 0, maxLength: 20 }),
        (slug, existingVideos) => {
          // Ensure no existing video uses this slug
          fc.pre(existingVideos.every((v) => v.slug !== slug));

          const db: MockVideo[] = [...existingVideos];
          const newVideo: MockVideo = {
            id: "new-video-id",
            title: "New Video",
            slug,
            video_url: "https://example.com/video.mp4",
            category: "for-parents",
            description: "",
            thumbnail_url: null,
            is_featured: false,
            is_published: false,
          };

          const result = insertVideo(db, newVideo);

          expect(result.success).toBe(true);
          if (result.success) {
            expect(result.record.slug).toBe(slug);
            expect(db.some((v) => v.slug === slug)).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("inserting a second video with the same slug returns a 409-equivalent error", () => {
    fc.assert(
      fc.property(
        slugArb,
        fc.array(videoArb(), { minLength: 0, maxLength: 20 }),
        (slug, existingVideos) => {
          // Ensure no existing video uses this slug so the first insert succeeds
          fc.pre(existingVideos.every((v) => v.slug !== slug));

          const db: MockVideo[] = [...existingVideos];

          const firstVideo: MockVideo = {
            id: "first-video-id",
            title: "First Video",
            slug,
            video_url: "https://example.com/first.mp4",
            category: "for-parents",
            description: "",
            thumbnail_url: null,
            is_featured: false,
            is_published: false,
          };

          const secondVideo: MockVideo = {
            id: "second-video-id",
            title: "Second Video",
            slug, // same slug — must be rejected
            video_url: "https://example.com/second.mp4",
            category: "education-hub",
            description: "duplicate slug attempt",
            thumbnail_url: null,
            is_featured: true,
            is_published: true,
          };

          // First insert must succeed
          const firstResult = insertVideo(db, firstVideo);
          expect(firstResult.success).toBe(true);

          // Second insert with duplicate slug must fail with 409
          const secondResult = insertVideo(db, secondVideo);
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
        fc.array(videoArb(), { minLength: 0, maxLength: 20 }),
        (slug, existingVideos) => {
          fc.pre(existingVideos.every((v) => v.slug !== slug));

          const db: MockVideo[] = [...existingVideos];

          const firstVideo: MockVideo = {
            id: "first-video-id",
            title: "First Video",
            slug,
            video_url: "https://example.com/first.mp4",
            category: "for-parents",
            description: "",
            thumbnail_url: null,
            is_featured: false,
            is_published: false,
          };

          const duplicateVideo: MockVideo = {
            id: "duplicate-video-id",
            title: "Duplicate Video",
            slug, // duplicate slug
            video_url: "https://example.com/duplicate.mp4",
            category: "spiritual-food",
            description: "duplicate",
            thumbnail_url: null,
            is_featured: false,
            is_published: false,
          };

          // Insert the first video
          insertVideo(db, firstVideo);

          const dbSizeBeforeDuplicate = db.length;

          // Attempt to insert duplicate — must fail
          const duplicateResult = insertVideo(db, duplicateVideo);
          expect(duplicateResult.success).toBe(false);

          // DB must be unchanged: same size and exactly one record with this slug
          expect(db.length).toBe(dbSizeBeforeDuplicate);

          const videosWithSlug = db.filter((v) => v.slug === slug);
          expect(videosWithSlug).toHaveLength(1);
          expect(videosWithSlug[0].id).toBe(firstVideo.id);
        }
      ),
      { numRuns: 100 }
    );
  });
});
