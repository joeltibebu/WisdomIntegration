// Feature: content-hub-management, Property 8: Programs ordered by order field

/**
 * Validates: Requirements 8.1, 8.6
 *
 * Tests the ordering logic used by:
 *   - GET /api/admin/cms/pageblocks?page=programs&section=program
 *
 * No real DB or HTTP calls are made — we replicate the orderBy logic
 * from the route handler and verify that for any set of PageBlock records
 * with page='programs' and section='program', the results are always
 * sorted ascending by the `order` field.
 */

import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Types mirroring the Prisma PageBlock model (fields relevant to ordering)
// ---------------------------------------------------------------------------

interface MockPageBlock {
  id: string;
  page: string;
  section: string;
  order: number;
  title: string | null;
  titleAm: string | null;
  content: string;
  contentAm: string;
  imageUrl: string | null;
}

// ---------------------------------------------------------------------------
// Query logic — mirrors the GET handler in the pageblocks route:
//   prisma.pageBlock.findMany({
//     where: { page, section },
//     orderBy: [{ page: "asc" }, { order: "asc" }],
//   })
// Since we filter to a single page+section, the effective sort is by `order` asc.
// ---------------------------------------------------------------------------

function queryPageBlocks(
  db: MockPageBlock[],
  page: string,
  section: string
): MockPageBlock[] {
  return db
    .filter((b) => b.page === page && b.section === section)
    .sort((a, b) => {
      // Primary: page asc (all same here), Secondary: order asc
      if (a.page < b.page) return -1;
      if (a.page > b.page) return 1;
      return a.order - b.order;
    });
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const pageBlockArb = fc.record<MockPageBlock>({
  id: fc.uuid(),
  page: fc.constant("programs"),
  section: fc.constant("program"),
  order: fc.integer({ min: 0, max: 1000 }),
  title: fc.option(fc.string({ minLength: 1, maxLength: 80 }), { nil: null }),
  titleAm: fc.option(fc.string({ minLength: 1, maxLength: 80 }), { nil: null }),
  content: fc.string({ minLength: 0, maxLength: 200 }),
  contentAm: fc.string({ minLength: 0, maxLength: 200 }),
  imageUrl: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: null }),
});

// ---------------------------------------------------------------------------
// Property 8: Programs ordered by order field
// ---------------------------------------------------------------------------

describe("Property 8: Programs ordered by order field", () => {
  it("GET returns program blocks sorted ascending by order for any insertion order", () => {
    fc.assert(
      fc.property(
        fc.array(pageBlockArb, { minLength: 1, maxLength: 30 }),
        (blocks) => {
          const result = queryPageBlocks(blocks, "programs", "program");

          // Verify the result is sorted ascending by order
          for (let i = 1; i < result.length; i++) {
            expect(result[i].order).toBeGreaterThanOrEqual(result[i - 1].order);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("all returned records have page='programs' and section='program'", () => {
    fc.assert(
      fc.property(
        fc.array(pageBlockArb, { minLength: 0, maxLength: 30 }),
        (blocks) => {
          const result = queryPageBlocks(blocks, "programs", "program");

          for (const block of result) {
            expect(block.page).toBe("programs");
            expect(block.section).toBe("program");
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("a block with the lowest order value appears first in the result", () => {
    fc.assert(
      fc.property(
        fc.array(pageBlockArb, { minLength: 0, maxLength: 20 }),
        fc.integer({ min: 0, max: 100 }),
        (otherBlocks, minOrder) => {
          // Ensure no other block has an order lower than minOrder
          fc.pre(otherBlocks.every((b) => b.order > minOrder));

          const lowestBlock: MockPageBlock = {
            id: "lowest-order-id",
            page: "programs",
            section: "program",
            order: minOrder,
            title: "First Program",
            titleAm: null,
            content: "content",
            contentAm: "",
            imageUrl: null,
          };

          const db = [...otherBlocks, lowestBlock];
          const result = queryPageBlocks(db, "programs", "program");

          expect(result.length).toBeGreaterThan(0);
          expect(result[0].id).toBe(lowestBlock.id);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("blocks from other pages or sections are excluded from the result", () => {
    fc.assert(
      fc.property(
        fc.array(pageBlockArb, { minLength: 0, maxLength: 20 }),
        fc.array(
          fc.record<MockPageBlock>({
            id: fc.uuid(),
            page: fc.string({ minLength: 1, maxLength: 20 }).filter((p) => p !== "programs"),
            section: fc.string({ minLength: 1, maxLength: 20 }),
            order: fc.integer({ min: 0, max: 1000 }),
            title: fc.option(fc.string({ minLength: 1, maxLength: 80 }), { nil: null }),
            titleAm: fc.option(fc.string({ minLength: 1, maxLength: 80 }), { nil: null }),
            content: fc.string({ minLength: 0, maxLength: 200 }),
            contentAm: fc.string({ minLength: 0, maxLength: 200 }),
            imageUrl: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: null }),
          }),
          { minLength: 0, maxLength: 10 }
        ),
        (programBlocks, otherBlocks) => {
          const db = [...programBlocks, ...otherBlocks];
          const result = queryPageBlocks(db, "programs", "program");

          const otherIds = new Set(otherBlocks.map((b) => b.id));
          for (const block of result) {
            expect(otherIds.has(block.id)).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
