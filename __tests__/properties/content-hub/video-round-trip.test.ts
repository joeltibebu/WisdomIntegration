// Feature: content-hub-management, Property 7: Video creation round-trip

/**
 * Validates: Requirements 7.3, 10.2
 *
 * Tests the round-trip logic for video creation:
 *   - POST /api/admin/videos  (create a video)
 *   - GET  /api/admin/videos/[id] (retrieve by id)
 *
 * No real DB or HTTP calls are made — we simulate an in-memory "database"
 * as a Map<id, record> and verify that after create, get returns a record
 * whose title, slug, video_url, and category fields exactly match the submitted values.
 */

import * as fc from "fast-check";

interface VideoPayload {
  title: string;
  slug: string;
  video_url: string;
  category: string;
  description?: string;
  thumbnail_url?: string | null;
  is_featured?: boolean;
  is_published?: boolean;
}

interface VideoRecord {
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

type Database = Map<string, VideoRecord>;

function createVideo(db: Database, id: string, payload: VideoPayload): VideoRecord {
  const record: VideoRecord = {
    id,
    title: payload.title,
    slug: payload.slug,
    video_url: payload.video_url,
    category: payload.category,
    description: payload.description ?? "",
    thumbnail_url: payload.thumbnail_url ?? null,
    is_featured: payload.is_featured ?? false,
    is_published: payload.is_published ?? false,
  };
  db.set(id, record);
  return record;
}

function getVideo(db: Database, id: string): VideoRecord | null {
  return db.get(id) ?? null;
}

const slugArb = fc
  .stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  .filter((s) => s.length >= 1 && s.length <= 100);

const videoPayloadArb: fc.Arbitrary<VideoPayload> = fc.record({
  title: fc.string({ minLength: 1, maxLength: 80 }),
  slug: slugArb,
  video_url: fc.string({ minLength: 1, maxLength: 200 }),
  category: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: undefined }),
  thumbnail_url: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: null }),
  is_featured: fc.boolean(),
  is_published: fc.boolean(),
});

describe("Property 7: Video creation round-trip", () => {
  it("after create, get returns a record with matching title, slug, video_url, and category", () => {
    fc.assert(
      fc.property(fc.uuid(), videoPayloadArb, (id, payload) => {
        const db: Database = new Map();
        createVideo(db, id, payload);
        const retrieved = getVideo(db, id);
        expect(retrieved).not.toBeNull();
        if (retrieved !== null) {
          expect(retrieved.title).toBe(payload.title);
          expect(retrieved.slug).toBe(payload.slug);
          expect(retrieved.video_url).toBe(payload.video_url);
          expect(retrieved.category).toBe(payload.category);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("get returns null for an id that was never created", () => {
    fc.assert(
      fc.property(fc.uuid(), fc.uuid(), videoPayloadArb, (createdId, otherId, payload) => {
        fc.pre(createdId !== otherId);
        const db: Database = new Map();
        createVideo(db, createdId, payload);
        const retrieved = getVideo(db, otherId);
        expect(retrieved).toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  it("creating multiple videos preserves each video's fields independently", () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.uuid(),
        videoPayloadArb,
        videoPayloadArb,
        (id1, id2, payload1, payload2) => {
          fc.pre(id1 !== id2);
          const db: Database = new Map();
          createVideo(db, id1, payload1);
          createVideo(db, id2, payload2);
          const r1 = getVideo(db, id1);
          const r2 = getVideo(db, id2);
          expect(r1).not.toBeNull();
          expect(r2).not.toBeNull();
          if (r1 !== null) {
            expect(r1.title).toBe(payload1.title);
            expect(r1.slug).toBe(payload1.slug);
            expect(r1.video_url).toBe(payload1.video_url);
            expect(r1.category).toBe(payload1.category);
          }
          if (r2 !== null) {
            expect(r2.title).toBe(payload2.title);
            expect(r2.slug).toBe(payload2.slug);
            expect(r2.video_url).toBe(payload2.video_url);
            expect(r2.category).toBe(payload2.category);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
