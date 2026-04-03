# Implementation Plan: Content Hub Management

## Overview

Extend the Wisdom Integration site with dynamic content hub pages for `/for-parents`, `/education-hub`, and `/spiritual-food`. Admins get dedicated management pages for blog posts, videos, and programs. The Prisma schema is extended, the NavBar is updated, and 301 redirects are added for old URLs.

## Tasks

- [x] 1. Extend Prisma schema and run migration
  - Add `excerpt`, `featured_image`, `content_type` (default `"blog"`), and `category` (nullable) fields to the `ContentPost` model
  - Add the new `Video` model with all fields as specified in the design
  - Run `prisma migrate dev` to apply the migration without data loss
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Add 301 redirects and update NavBar URLs
  - [x] 2.1 Add redirect rules to `next.config.js` for `/parents → /for-parents`, `/education → /education-hub`, `/spiritual → /spiritual-food`
    - _Requirements: 2.4_
  - [x] 2.2 Update `NavBar.tsx` href values and Amharic labels for the three Focused Support dropdown links
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

- [x] 3. Implement public API routes for content and videos
  - [x] 3.1 Create `app/api/public/content/route.ts` — `GET` handler that returns published `ContentPost` records filtered by `?category=` query param, ordered by `publishedAt` descending
    - _Requirements: 9.7_
  - [x] 3.2 Create `app/api/public/videos/route.ts` — `GET` handler that returns published `Video` records filtered by `?category=` query param, ordered by `published_at` descending
    - _Requirements: 10.7_
  - [x] 3.3 Write property test for published content filtering (Property 1 and Property 2)
    - **Property 1: Published content appears on the correct public page**
    - **Property 2: Unpublished content is excluded from public responses**
    - **Validates: Requirements 3.1, 3.2, 4.1, 4.2, 5.1, 5.2**

- [x] 4. Build reusable public display components
  - [x] 4.1 Create `components/hub/ContentCard.tsx` — renders a `ContentPost` with type badge, featured image, and devotional border accent for `content_type = "devotional"`
    - _Requirements: 3.4, 4.4, 5.4_
  - [x] 4.2 Create `components/hub/VideoCard.tsx` — renders a `Video` with play-button overlay, "Video" badge, and featured ribbon when `is_featured = true`
    - _Requirements: 4.4_
  - [x] 4.3 Write unit tests for `ContentCard` and `VideoCard`
    - Verify devotional border accent renders for `content_type = "devotional"`
    - Verify featured ribbon renders when `is_featured = true`
    - Verify empty state message renders when data array is empty
    - _Requirements: 3.3, 4.4, 5.4_

- [x] 5. Create the three public hub pages
  - [x] 5.1 Create `app/(public)/for-parents/page.tsx` — Server Component that queries Prisma directly for published `ContentPost` and `Video` records with `category = "for-parents"`, renders `ContentCard` and `VideoCard` grids, preserves `SubPageHero` and `CTASection`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  - [x] 5.2 Create `app/(public)/education-hub/page.tsx` — same pattern as 5.1 with `category = "education-hub"`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - [x] 5.3 Create `app/(public)/spiritual-food/page.tsx` — same pattern as 5.1 with `category = "spiritual-food"`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 6. Checkpoint — Ensure public pages and redirects work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement admin API routes for blog posts
  - [x] 7.1 Create `app/api/admin/blogs/route.ts` — `GET` (list all, ordered by `createdAt` desc) and `POST` (create, validate required fields, enforce slug uniqueness returning 409 on conflict) handlers with ADMIN role guard
    - _Requirements: 9.1, 9.2, 9.6_
  - [x] 7.2 Create `app/api/admin/blogs/[id]/route.ts` — `GET`, `PATCH` (set `publishedAt` on first publish), and `DELETE` handlers with ADMIN role guard
    - _Requirements: 9.3, 9.4, 9.5, 9.6, 6.5_
  - [x] 7.3 Write property test for slug uniqueness enforcement (Property 3)
    - **Property 3: Slug uniqueness is enforced**
    - **Validates: Requirements 1.4, 6.8, 9.2**
  - [x] 7.4 Write property test for admin-only access (Property 4)
    - **Property 4: Admin-only API access**
    - **Validates: Requirements 6.9, 9.6**
  - [x] 7.5 Write property test for first-publish timestamp (Property 5)
    - **Property 5: First-publish sets `published_at` timestamp**
    - **Validates: Requirements 6.5**
  - [x] 7.6 Write property test for blog post round-trip (Property 6)
    - **Property 6: Blog post creation round-trip**
    - **Validates: Requirements 6.3, 9.2**

- [x] 8. Implement admin API routes for videos
  - [x] 8.1 Create `app/api/admin/videos/route.ts` — `GET` and `POST` handlers with ADMIN role guard, slug uniqueness enforcement
    - _Requirements: 10.1, 10.2, 10.6_
  - [x] 8.2 Create `app/api/admin/videos/[id]/route.ts` — `GET`, `PATCH`, and `DELETE` handlers with ADMIN role guard, first-publish `published_at` logic
    - _Requirements: 10.3, 10.4, 10.5, 10.6, 7.5_
  - [x] 8.3 Write property test for video slug uniqueness (Property 3 — Video model)
    - **Property 3: Slug uniqueness is enforced (Video)**
    - **Validates: Requirements 1.4, 7.8, 10.2**
  - [x] 8.4 Write property test for video round-trip (Property 7)
    - **Property 7: Video creation round-trip**
    - **Validates: Requirements 7.3, 10.2**

- [x] 9. Build admin blog post management UI
  - [x] 9.1 Create `components/admin/BlogPostForm.tsx` — client component with fields for title, slug (auto-generated from title), excerpt, body, featured_image, `content_type` select, `category` select, and `is_published` toggle; surfaces server-side slug conflict errors inline
    - _Requirements: 6.3, 6.4, 6.8_
  - [x] 9.2 Create `app/admin/blogs/page.tsx` — table of all `ContentPost` records with title, category, content_type, published status, published_at; "New Post" button; inline publish/unpublish toggle; delete with confirmation
    - _Requirements: 6.1, 6.2, 6.7, 6.9_
  - [x] 9.3 Create `app/admin/blogs/new/page.tsx` — renders `BlogPostForm` for creation, redirects to list on success
    - _Requirements: 6.2, 6.3_
  - [x] 9.4 Create `app/admin/blogs/[id]/edit/page.tsx` — fetches existing post, renders `BlogPostForm` pre-populated, redirects to list on success
    - _Requirements: 6.4, 6.5, 6.6_

- [x] 10. Build admin video management UI
  - [x] 10.1 Create `components/admin/VideoForm.tsx` — client component with fields for title, slug, description, thumbnail_url, video_url, `category` select, `is_featured` toggle, `is_published` toggle
    - _Requirements: 7.3, 7.4, 7.8_
  - [x] 10.2 Create `app/admin/videos/page.tsx` — table of all `Video` records with title, category, is_featured, published status, published_at; "New Video" button; inline publish/unpublish and is_featured toggles; delete with confirmation
    - _Requirements: 7.1, 7.2, 7.7, 7.9_
  - [x] 10.3 Create `app/admin/videos/new/page.tsx` — renders `VideoForm` for creation
    - _Requirements: 7.2, 7.3_
  - [x] 10.4 Create `app/admin/videos/[id]/edit/page.tsx` — fetches existing video, renders `VideoForm` pre-populated
    - _Requirements: 7.4, 7.5, 7.6_

- [x] 11. Build admin programs management UI
  - [x] 11.1 Create `components/admin/ProgramManager.tsx` — client component mirroring `EventManager` pattern; inline form for creating/editing `PageBlock` records (`page='programs'`, `section='program'`); up/down reorder controls that PATCH the `order` field; delete with confirmation
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  - [x] 11.2 Create `app/admin/programs/page.tsx` — renders `ProgramManager`
    - _Requirements: 8.1, 8.7_
  - [x] 11.3 Write property test for programs ordering (Property 8)
    - **Property 8: Programs ordered by `order` field**
    - **Validates: Requirements 8.1, 8.6**

- [x] 12. Update AdminSidebar navigation
  - Add `Blog Posts` (`/admin/blogs`), `Videos` (`/admin/videos`), and `Programs` (`/admin/programs`) entries to `NAV_ITEMS` in `components/admin/AdminSidebar.tsx`
  - Update active detection to use `pathname.startsWith(item.href)` for these new entries so sub-routes (e.g., `/admin/blogs/new`) highlight the correct parent item
  - Add `VideoIcon` and `GridIcon` SVG paths to the `SidebarIcon` switch
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 13. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Public hub pages use direct Prisma queries (Server Components) — no intermediate API call needed for SSR
- The existing `/api/admin/content` route and `/admin/content` page are left untouched
- Property tests use **fast-check** with a minimum of 100 iterations per test
- Each property test file should include the comment: `// Feature: content-hub-management, Property N: <property_text>`
