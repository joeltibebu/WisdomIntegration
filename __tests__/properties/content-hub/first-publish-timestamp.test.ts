// Feature: content-hub-management, Property 5: First-publish sets published_at timestamp

/**
 * Validates: Requirements 6.5
 *
 * These tests verify the pure publish-timestamp logic used by the PATCH route handlers
 * for ContentPost and Video records.
 *
 * The logic under test (extracted from the route handlers):
 *   if (is_published === true && existing.publishedAt === null) {
 *     updateData.publishedAt = new Date();
 *   }
 *   // If already published (publishedAt is not null), do NOT overwrite
 *
 * No real DB or HTTP calls are made — we replicate the update logic and assert
 * the properties hold for any generated input.
 */

import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Types mirroring the Prisma models (only the fields relevant to publish logic)
// ---------------------------------------------------------------------------

interface MockContentPost {
  id: string;
  title: string;
  publishedAt: Date | null;
  is_published: boolean;
}

interface MockVideo {
  id: string;
  title: string;
  publishedAt: Date | null;
  is_published: boolean;
}

// ---------------------------------------------------------------------------
// Update logic — mirrors the PATCH handler logic from the route handlers
// ---------------------------------------------------------------------------

interface PatchPayload {
  is_published?: boolean;
}

interface UpdateResult {
  publishedAt: Date | null;
  is_published: boolean;
}

/**
 * Replicates the PATCH update logic for ContentPost / Video:
 *   if (is_published === true && existing.publishedAt === null) {
 *     updateData.publishedAt = new Date();
 *   }
 *   // If already published (publishedAt is not null), do NOT overwrite
 */
function applyPatchLogic(
  existing: { publishedAt: Date | null; is_published: boolean },
  patch: PatchPayload,
  now: Date
): UpdateResult {
  const updateData: { publishedAt?: Date | null; is_published?: boolean } = {};

  if (patch.is_published !== undefined) {
    updateData.is_published = patch.is_published;
    if (patch.is_published === true && existing.publishedAt === null) {
      updateData.publishedAt = now;
    }
    // If already published (publishedAt is not null), do NOT overwrite
  }

  return {
    publishedAt:
      updateData.publishedAt !== undefined
        ? updateData.publishedAt
        : existing.publishedAt,
    is_published:
      updateData.is_published !== undefined
        ? updateData.is_published
        : existing.is_published,
  };
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const pastDateArb = fc
  .integer({ min: 0, max: Date.now() - 1000 })
  .map((ms) => new Date(ms));

const contentPostArb = fc.record<MockContentPost>({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 80 }),
  publishedAt: fc.option(pastDateArb, { nil: null }),
  is_published: fc.boolean(),
});

const videoArb = fc.record<MockVideo>({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 80 }),
  publishedAt: fc.option(pastDateArb, { nil: null }),
  is_published: fc.boolean(),
});

// ---------------------------------------------------------------------------
// Property 5: First-publish sets published_at timestamp
// ---------------------------------------------------------------------------

describe("Property 5: First-publish sets published_at timestamp", () => {
  // --- ContentPost ---

  it("ContentPost: transitioning from is_published=false to true sets publishedAt to a non-null timestamp", () => {
    fc.assert(
      fc.property(
        contentPostArb,
        pastDateArb,
        (existing, now) => {
          // Ensure the post starts unpublished with no publishedAt
          const unpublished: MockContentPost = {
            ...existing,
            is_published: false,
            publishedAt: null,
          };

          const result = applyPatchLogic(unpublished, { is_published: true }, now);

          expect(result.publishedAt).not.toBeNull();
          expect(result.publishedAt).toBeInstanceOf(Date);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("ContentPost: subsequent PATCH with is_published=true does NOT overwrite the original publishedAt", () => {
    fc.assert(
      fc.property(
        contentPostArb,
        pastDateArb,
        pastDateArb,
        (existing, originalPublishedAt, laterNow) => {
          // Ensure the post is already published with a non-null publishedAt
          const alreadyPublished: MockContentPost = {
            ...existing,
            is_published: true,
            publishedAt: originalPublishedAt,
          };

          const result = applyPatchLogic(
            alreadyPublished,
            { is_published: true },
            laterNow
          );

          // publishedAt must remain the original value
          expect(result.publishedAt).toEqual(originalPublishedAt);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("ContentPost: PATCH with is_published=false does NOT set publishedAt when it was null", () => {
    fc.assert(
      fc.property(
        contentPostArb,
        pastDateArb,
        (existing, now) => {
          const unpublished: MockContentPost = {
            ...existing,
            is_published: false,
            publishedAt: null,
          };

          const result = applyPatchLogic(unpublished, { is_published: false }, now);

          expect(result.publishedAt).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  // --- Video ---

  it("Video: transitioning from is_published=false to true sets publishedAt to a non-null timestamp", () => {
    fc.assert(
      fc.property(
        videoArb,
        pastDateArb,
        (existing, now) => {
          const unpublished: MockVideo = {
            ...existing,
            is_published: false,
            publishedAt: null,
          };

          const result = applyPatchLogic(unpublished, { is_published: true }, now);

          expect(result.publishedAt).not.toBeNull();
          expect(result.publishedAt).toBeInstanceOf(Date);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Video: subsequent PATCH with is_published=true does NOT overwrite the original publishedAt", () => {
    fc.assert(
      fc.property(
        videoArb,
        pastDateArb,
        pastDateArb,
        (existing, originalPublishedAt, laterNow) => {
          const alreadyPublished: MockVideo = {
            ...existing,
            is_published: true,
            publishedAt: originalPublishedAt,
          };

          const result = applyPatchLogic(
            alreadyPublished,
            { is_published: true },
            laterNow
          );

          expect(result.publishedAt).toEqual(originalPublishedAt);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Video: PATCH with is_published=false does NOT set publishedAt when it was null", () => {
    fc.assert(
      fc.property(
        videoArb,
        pastDateArb,
        (existing, now) => {
          const unpublished: MockVideo = {
            ...existing,
            is_published: false,
            publishedAt: null,
          };

          const result = applyPatchLogic(unpublished, { is_published: false }, now);

          expect(result.publishedAt).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
