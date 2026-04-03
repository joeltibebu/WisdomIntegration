// Feature: content-hub-management, Property 1: Published content appears on the correct public page
// Feature: content-hub-management, Property 2: Unpublished content is excluded from public responses

/**
 * Validates: Requirements 3.1, 3.2, 4.1, 4.2, 5.1, 5.2
 *
 * These tests verify the pure filtering logic used by:
 *   - GET /api/public/content  (ContentPost: published=true, category match)
 *   - GET /api/public/videos   (Video: is_published=true, category match)
 *
 * No real DB or HTTP calls are made — we replicate the filter predicates
 * from the route handlers and assert the properties hold for any generated input.
 */

import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Types mirroring the Prisma models (only the fields used by the filter logic)
// ---------------------------------------------------------------------------

interface MockContentPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  category: string | null;
  published: boolean;
}

interface MockVideo {
  id: string;
  title: string;
  slug: string;
  description: string;
  video_url: string;
  category: string;
  is_published: boolean;
}

// ---------------------------------------------------------------------------
// Filter logic — mirrors the WHERE clause in the actual route handlers
// ---------------------------------------------------------------------------

/**
 * Replicates: prisma.contentPost.findMany({ where: { published: true, category } })
 */
function filterContentPosts(
  posts: MockContentPost[],
  category: string | null
): MockContentPost[] {
  return posts.filter((p) => {
    if (!p.published) return false;
    if (category !== null && p.category !== category) return false;
    return true;
  });
}

/**
 * Replicates: prisma.video.findMany({ where: { is_published: true, category } })
 */
function filterVideos(
  videos: MockVideo[],
  category: string | null
): MockVideo[] {
  return videos.filter((v) => {
    if (!v.is_published) return false;
    if (category !== null && v.category !== category) return false;
    return true;
  });
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const categoryArb = fc.constantFrom(
  "for-parents",
  "education-hub",
  "spiritual-food"
);

const contentPostArb = fc.record<MockContentPost>({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 80 }),
  slug: fc.string({ minLength: 1, maxLength: 80 }),
  body: fc.string({ minLength: 1, maxLength: 200 }),
  category: fc.option(categoryArb, { nil: null }),
  published: fc.boolean(),
});

const videoArb = fc.record<MockVideo>({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 80 }),
  slug: fc.string({ minLength: 1, maxLength: 80 }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  video_url: fc.webUrl(),
  category: categoryArb,
  is_published: fc.boolean(),
});

// ---------------------------------------------------------------------------
// Property 1: Published content appears on the correct public page
// ---------------------------------------------------------------------------

describe("Property 1: Published content appears on the correct public page", () => {
  it("ContentPost: a published post with category X appears when querying category X and not when querying category Y", () => {
    fc.assert(
      fc.property(
        categoryArb,
        categoryArb,
        fc.array(contentPostArb, { minLength: 0, maxLength: 20 }),
        (targetCategory, otherCategory, existingPosts) => {
          fc.pre(targetCategory !== otherCategory);

          // Inject a known published post with targetCategory
          const knownPost: MockContentPost = {
            id: "known-post-id",
            title: "Known Post",
            slug: "known-post",
            body: "body",
            category: targetCategory,
            published: true,
          };

          const allPosts = [...existingPosts, knownPost];

          // Querying with targetCategory must include the known post
          const resultForTarget = filterContentPosts(allPosts, targetCategory);
          expect(resultForTarget.some((p) => p.id === knownPost.id)).toBe(true);

          // Querying with a different category must NOT include the known post
          const resultForOther = filterContentPosts(allPosts, otherCategory);
          expect(resultForOther.some((p) => p.id === knownPost.id)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Video: a published video with category X appears when querying category X and not when querying category Y", () => {
    fc.assert(
      fc.property(
        categoryArb,
        categoryArb,
        fc.array(videoArb, { minLength: 0, maxLength: 20 }),
        (targetCategory, otherCategory, existingVideos) => {
          fc.pre(targetCategory !== otherCategory);

          // Inject a known published video with targetCategory
          const knownVideo: MockVideo = {
            id: "known-video-id",
            title: "Known Video",
            slug: "known-video",
            description: "desc",
            video_url: "https://example.com/video.mp4",
            category: targetCategory,
            is_published: true,
          };

          const allVideos = [...existingVideos, knownVideo];

          // Querying with targetCategory must include the known video
          const resultForTarget = filterVideos(allVideos, targetCategory);
          expect(resultForTarget.some((v) => v.id === knownVideo.id)).toBe(true);

          // Querying with a different category must NOT include the known video
          const resultForOther = filterVideos(allVideos, otherCategory);
          expect(resultForOther.some((v) => v.id === knownVideo.id)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: Unpublished content is excluded from public responses
// ---------------------------------------------------------------------------

describe("Property 2: Unpublished content is excluded from public responses", () => {
  it("ContentPost: unpublished posts never appear in filtered results regardless of category", () => {
    fc.assert(
      fc.property(
        fc.array(contentPostArb, { minLength: 1, maxLength: 30 }),
        fc.option(categoryArb, { nil: null }),
        (posts, queryCategory) => {
          const unpublishedIds = new Set(
            posts.filter((p) => !p.published).map((p) => p.id)
          );

          const results = filterContentPosts(posts, queryCategory);

          // No unpublished post should appear in the results
          for (const result of results) {
            expect(unpublishedIds.has(result.id)).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Video: unpublished videos never appear in filtered results regardless of category", () => {
    fc.assert(
      fc.property(
        fc.array(videoArb, { minLength: 1, maxLength: 30 }),
        fc.option(categoryArb, { nil: null }),
        (videos, queryCategory) => {
          const unpublishedIds = new Set(
            videos.filter((v) => !v.is_published).map((v) => v.id)
          );

          const results = filterVideos(videos, queryCategory);

          // No unpublished video should appear in the results
          for (const result of results) {
            expect(unpublishedIds.has(result.id)).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("ContentPost: a specifically unpublished post is never returned for any category query", () => {
    fc.assert(
      fc.property(
        fc.option(categoryArb, { nil: null }),
        fc.option(categoryArb, { nil: null }),
        fc.array(contentPostArb, { minLength: 0, maxLength: 20 }),
        (postCategory, queryCategory, otherPosts) => {
          const unpublishedPost: MockContentPost = {
            id: "unpublished-post-id",
            title: "Unpublished Post",
            slug: "unpublished-post",
            body: "body",
            category: postCategory,
            published: false,
          };

          const allPosts = [...otherPosts, unpublishedPost];
          const results = filterContentPosts(allPosts, queryCategory);

          expect(results.some((p) => p.id === unpublishedPost.id)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Video: a specifically unpublished video is never returned for any category query", () => {
    fc.assert(
      fc.property(
        categoryArb,
        fc.option(categoryArb, { nil: null }),
        fc.array(videoArb, { minLength: 0, maxLength: 20 }),
        (videoCategory, queryCategory, otherVideos) => {
          const unpublishedVideo: MockVideo = {
            id: "unpublished-video-id",
            title: "Unpublished Video",
            slug: "unpublished-video",
            description: "desc",
            video_url: "https://example.com/video.mp4",
            category: videoCategory,
            is_published: false,
          };

          const allVideos = [...otherVideos, unpublishedVideo];
          const results = filterVideos(allVideos, queryCategory);

          expect(results.some((v) => v.id === unpublishedVideo.id)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
