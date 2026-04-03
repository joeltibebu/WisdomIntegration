# Requirements Document

## Introduction

This feature adds admin-managed dynamic content to the Wisdom Integration website's navigation dropdown pages. Currently, the "Focused Support" dropdown links (/parents, /education, /spiritual) and "Our Ministry" dropdown links (/services, /programs) serve static or partially-dynamic content. This feature extends the system so that admins can create, edit, publish, and categorize blog posts and videos that appear on these public pages, and updates the navbar to point to the new canonical URLs. Programs management is also extended to support full CRUD via the existing PageBlock model.

## Glossary

- **Content_Hub**: The collective system of admin-managed content pages under the Focused Support and Our Ministry navigation dropdowns.
- **Blog_Post**: A written article, guide, or devotional managed via the ContentPost model, extended with `category` and `content_type` fields.
- **Video**: A media entry with a URL, thumbnail, description, and category, stored in the new Video model.
- **Category**: A string enum value (`for-parents`, `education-hub`, `spiritual-food`) that associates content with a specific public page.
- **Content_Type**: A string enum value (`blog`, `devotional`, `guide`) that classifies the nature of a Blog_Post.
- **Admin**: An authenticated user with the ADMIN role who manages content through the admin panel at `/admin/*`.
- **Public_Page**: A publicly accessible Next.js page that renders content fetched from the database.
- **Navbar**: The site-wide navigation component (`NavBar.tsx`) containing dropdown menus for Focused Support and Our Ministry.
- **PageBlock**: The existing Prisma model used to store program entries (`page='programs'`, `section='program'`).
- **AdminSidebar**: The existing sidebar navigation component used in the `/admin` layout.
- **Slug**: A URL-safe unique string identifier for a Blog_Post or Video, used for future detail page routing.

---

## Requirements

### Requirement 1: Database Schema Extension

**User Story:** As a developer, I want the database schema to support categorized blog posts and videos, so that content can be filtered and displayed on the correct public pages.

#### Acceptance Criteria

1. THE System SHALL extend the `ContentPost` model with the following fields: `excerpt` (optional String), `featured_image` (optional String), `content_type` (String, values: `blog`, `devotional`, `guide`, default `blog`), and `category` (String, values: `for-parents`, `education-hub`, `spiritual-food`, nullable).
2. THE System SHALL add a new `Video` model to the Prisma schema with fields: `id` (cuid), `title` (String), `slug` (String, unique), `description` (String), `thumbnail_url` (optional String), `video_url` (String), `category` (String, values: `for-parents`, `education-hub`, `spiritual-food`), `is_featured` (Boolean, default false), `is_published` (Boolean, default false), `published_at` (optional DateTime), `createdAt` (DateTime, default now), `updatedAt` (DateTime, updatedAt).
3. WHEN a Prisma migration is applied, THE System SHALL preserve all existing `ContentPost` records without data loss.
4. THE System SHALL ensure the `slug` field on both `ContentPost` and `Video` is unique across each respective model.

---

### Requirement 2: Navbar URL Updates

**User Story:** As a site visitor, I want the navigation dropdown links to point to the correct canonical URLs, so that I can reach the right content pages.

#### Acceptance Criteria

1. THE Navbar SHALL update the "For Parents" dropdown link href from `/parents` to `/for-parents`.
2. THE Navbar SHALL update the "Education Hub" dropdown link href from `/education` to `/education-hub`.
3. THE Navbar SHALL update the "Spiritual Food" dropdown link href from `/spiritual` to `/spiritual-food`.
4. WHEN a user navigates to the old URLs (`/parents`, `/education`, `/spiritual`), THE System SHALL redirect them to the new canonical URLs (`/for-parents`, `/education-hub`, `/spiritual-food`) with a 301 permanent redirect.
5. THE Navbar SHALL preserve all existing Amharic label translations for the updated links.

---

### Requirement 3: Public Page — For Parents (`/for-parents`)

**User Story:** As a parent visiting the site, I want to see blog posts, guides, and videos tagged for parents, so that I can access relevant support content.

#### Acceptance Criteria

1. WHEN a user visits `/for-parents`, THE For_Parents_Page SHALL fetch and display all published `ContentPost` records where `category = 'for-parents'`, ordered by `published_at` descending.
2. WHEN a user visits `/for-parents`, THE For_Parents_Page SHALL fetch and display all published `Video` records where `category = 'for-parents'`, ordered by `published_at` descending.
3. WHILE no published content exists for the `for-parents` category, THE For_Parents_Page SHALL display a graceful empty state message.
4. THE For_Parents_Page SHALL render content in rounded cards consistent with the existing site design (warm, ministry-centered, `rounded-[2.5rem]` style).
5. THE For_Parents_Page SHALL be mobile responsive, using a single-column layout on small screens and a multi-column grid on larger screens.
6. THE For_Parents_Page SHALL preserve the existing SubPageHero section and CTASection from the current `/parents` page.

---

### Requirement 4: Public Page — Education Hub (`/education-hub`)

**User Story:** As an educator or parent, I want to browse educational videos and articles, so that I can find learning resources for children with special needs.

#### Acceptance Criteria

1. WHEN a user visits `/education-hub`, THE Education_Hub_Page SHALL fetch and display all published `ContentPost` records where `category = 'education-hub'`, ordered by `published_at` descending.
2. WHEN a user visits `/education-hub`, THE Education_Hub_Page SHALL fetch and display all published `Video` records where `category = 'education-hub'`, ordered by `published_at` descending.
3. WHILE no published content exists for the `education-hub` category, THE Education_Hub_Page SHALL display a graceful empty state message.
4. THE Education_Hub_Page SHALL visually distinguish video entries from blog/article entries using a type badge and play icon overlay.
5. THE Education_Hub_Page SHALL be mobile responsive and consistent with the existing site card design.
6. THE Education_Hub_Page SHALL preserve the existing SubPageHero section and CTASection from the current `/education` page.

---

### Requirement 5: Public Page — Spiritual Food (`/spiritual-food`)

**User Story:** As a faith-seeking visitor, I want to read devotionals and scripture-based articles, so that I can find spiritual encouragement.

#### Acceptance Criteria

1. WHEN a user visits `/spiritual-food`, THE Spiritual_Food_Page SHALL fetch and display all published `ContentPost` records where `category = 'spiritual-food'`, ordered by `published_at` descending.
2. WHEN a user visits `/spiritual-food`, THE Spiritual_Food_Page SHALL fetch and display all published `Video` records where `category = 'spiritual-food'`, ordered by `published_at` descending.
3. WHILE no published content exists for the `spiritual-food` category, THE Spiritual_Food_Page SHALL display a graceful empty state message.
4. THE Spiritual_Food_Page SHALL visually distinguish `devotional` content_type posts with a scripture/quote styling consistent with the existing devotional card design.
5. THE Spiritual_Food_Page SHALL be mobile responsive and consistent with the existing site card design.
6. THE Spiritual_Food_Page SHALL preserve the existing SubPageHero section and CTASection from the current `/spiritual` page.

---

### Requirement 6: Admin — Blog Post Management (`/admin/blogs`)

**User Story:** As an admin, I want to create, edit, delete, and publish blog posts with category and content type assignments, so that I can manage written content for the public hub pages.

#### Acceptance Criteria

1. WHEN an admin navigates to `/admin/blogs`, THE Admin_Blogs_Page SHALL display a table of all `ContentPost` records showing title, category, content_type, published status, and published_at date.
2. THE Admin_Blogs_Page SHALL provide a "New Post" button that navigates to `/admin/blogs/new`.
3. WHEN an admin submits the blog post form at `/admin/blogs/new`, THE System SHALL create a new `ContentPost` record with the provided title, slug, excerpt, content, featured_image, content_type, category, and is_published values.
4. WHEN an admin navigates to `/admin/blogs/[id]/edit`, THE Admin_Blog_Edit_Page SHALL pre-populate the form with the existing `ContentPost` data.
5. WHEN an admin submits the edit form, THE System SHALL update the `ContentPost` record and set `published_at` to the current timestamp if `is_published` is being set to true for the first time.
6. WHEN an admin clicks the delete action for a post, THE System SHALL permanently delete the `ContentPost` record after confirmation.
7. THE Admin_Blogs_Page SHALL provide an inline publish/unpublish toggle for each post without requiring a full page reload.
8. IF a slug value already exists in the `ContentPost` table, THEN THE System SHALL return a validation error and SHALL NOT create a duplicate record.
9. THE Admin_Blogs_Page SHALL be accessible only to users with the ADMIN role.

---

### Requirement 7: Admin — Video Management (`/admin/videos`)

**User Story:** As an admin, I want to create, edit, delete, and publish videos with category and featured assignments, so that I can manage video content for the public hub pages.

#### Acceptance Criteria

1. WHEN an admin navigates to `/admin/videos`, THE Admin_Videos_Page SHALL display a table of all `Video` records showing title, category, is_featured, published status, and published_at date.
2. THE Admin_Videos_Page SHALL provide a "New Video" button that navigates to `/admin/videos/new`.
3. WHEN an admin submits the video form at `/admin/videos/new`, THE System SHALL create a new `Video` record with the provided title, slug, description, thumbnail_url, video_url, category, is_featured, and is_published values.
4. WHEN an admin navigates to `/admin/videos/[id]/edit`, THE Admin_Video_Edit_Page SHALL pre-populate the form with the existing `Video` data.
5. WHEN an admin submits the edit form, THE System SHALL update the `Video` record and set `published_at` to the current timestamp if `is_published` is being set to true for the first time.
6. WHEN an admin clicks the delete action for a video, THE System SHALL permanently delete the `Video` record after confirmation.
7. THE Admin_Videos_Page SHALL provide an inline publish/unpublish toggle and is_featured toggle for each video.
8. IF a slug value already exists in the `Video` table, THEN THE System SHALL return a validation error and SHALL NOT create a duplicate record.
9. THE Admin_Videos_Page SHALL be accessible only to users with the ADMIN role.

---

### Requirement 8: Admin — Programs Management (`/admin/programs`)

**User Story:** As an admin, I want to create, edit, delete, and reorder program entries, so that I can manage the programs displayed on the public /programs page.

#### Acceptance Criteria

1. WHEN an admin navigates to `/admin/programs`, THE Admin_Programs_Page SHALL display all `PageBlock` records where `page = 'programs'` and `section = 'program'`, ordered by `order` ascending.
2. THE Admin_Programs_Page SHALL provide a "New Program" button that opens a form to create a new `PageBlock` with `page = 'programs'` and `section = 'program'`.
3. WHEN an admin submits the new program form, THE System SHALL create a new `PageBlock` record with the provided title, titleAm, content, contentAm, imageUrl, and order values.
4. WHEN an admin edits a program entry, THE System SHALL update the corresponding `PageBlock` record.
5. WHEN an admin deletes a program entry, THE System SHALL permanently delete the `PageBlock` record after confirmation.
6. THE Admin_Programs_Page SHALL provide up/down reorder controls that update the `order` field of `PageBlock` records.
7. THE Admin_Programs_Page SHALL be accessible only to users with the ADMIN role.

---

### Requirement 9: API Routes for Blog Posts

**User Story:** As a developer, I want RESTful API routes for blog post CRUD operations, so that the admin UI can manage ContentPost records.

#### Acceptance Criteria

1. THE API SHALL expose `GET /api/admin/blogs` to return all `ContentPost` records, ordered by `createdAt` descending.
2. THE API SHALL expose `POST /api/admin/blogs` to create a new `ContentPost` record, validating that title, slug, content, content_type, and category are present.
3. THE API SHALL expose `GET /api/admin/blogs/[id]` to return a single `ContentPost` record by id.
4. THE API SHALL expose `PATCH /api/admin/blogs/[id]` to update a `ContentPost` record.
5. THE API SHALL expose `DELETE /api/admin/blogs/[id]` to delete a `ContentPost` record.
6. IF a request to any admin blog API route is made by a non-ADMIN user, THEN THE API SHALL return a 403 Forbidden response.
7. THE API SHALL expose `GET /api/public/content?category=[category]` to return published `ContentPost` records filtered by category for use by public pages.

---

### Requirement 10: API Routes for Videos

**User Story:** As a developer, I want RESTful API routes for video CRUD operations, so that the admin UI can manage Video records.

#### Acceptance Criteria

1. THE API SHALL expose `GET /api/admin/videos` to return all `Video` records, ordered by `createdAt` descending.
2. THE API SHALL expose `POST /api/admin/videos` to create a new `Video` record, validating that title, slug, video_url, and category are present.
3. THE API SHALL expose `GET /api/admin/videos/[id]` to return a single `Video` record by id.
4. THE API SHALL expose `PATCH /api/admin/videos/[id]` to update a `Video` record.
5. THE API SHALL expose `DELETE /api/admin/videos/[id]` to delete a `Video` record.
6. IF a request to any admin video API route is made by a non-ADMIN user, THEN THE API SHALL return a 403 Forbidden response.
7. THE API SHALL expose `GET /api/public/videos?category=[category]` to return published `Video` records filtered by category for use by public pages.

---

### Requirement 11: AdminSidebar Navigation Updates

**User Story:** As an admin, I want the sidebar to include links to the new Blogs, Videos, and Programs management pages, so that I can navigate to them easily.

#### Acceptance Criteria

1. THE AdminSidebar SHALL include a navigation link to `/admin/blogs` labeled "Blog Posts".
2. THE AdminSidebar SHALL include a navigation link to `/admin/videos` labeled "Videos".
3. THE AdminSidebar SHALL include a navigation link to `/admin/programs` labeled "Programs".
4. THE AdminSidebar SHALL highlight the active link based on the current pathname, consistent with existing sidebar behavior.
5. WHEN an admin is on any `/admin/blogs/*`, `/admin/videos/*`, or `/admin/programs/*` route, THE AdminSidebar SHALL visually indicate the corresponding parent nav item as active.
