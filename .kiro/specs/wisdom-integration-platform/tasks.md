# Implementation Tasks

## Tasks

- [x] 1. Project Scaffolding and Foundation
  - [x] 1.1 Initialize Next.js 14 project with TypeScript, Tailwind CSS, and App Router
  - [x] 1.2 Configure Tailwind with the Wisdom Integration design system (colors, fonts, border-radius)
  - [x] 1.3 Install and configure Prisma with PostgreSQL connection
  - [x] 1.4 Define the full Prisma schema (User, ChildProfile, Session, SessionNote, Goal, ProgressReport, Message, Service, ContentPost)
  - [x] 1.5 Run initial Prisma migration
  - [x] 1.6 Install project dependencies (next-auth, react-hook-form, zod, fast-check, jest, jest-axe, @testing-library/react)
  - **References:** Requirements 13.1, Design: Architecture

- [x] 2. Design System Components
  - [x] 2.1 Create shared UI primitives: Button, Card, FormField, Modal, Badge, FileUpload
  - [x] 2.2 Create NavBar component with responsive mobile hamburger menu
  - [x] 2.3 Create Footer component with contact info, social links, nav links, legal links
  - [x] 2.4 Create DashboardShell layout with sidebar navigation and top bar
  - [x] 2.5 Create DataTable component (sortable, filterable)
  - [x] 2.6 Create PDFDownloadButton component
  - **References:** Requirements 12.1–12.11, Design: Components

- [x] 3. Authentication System
  - [x] 3.1 Configure NextAuth.js with credentials provider and PostgreSQL adapter
  - [x] 3.2 Extend NextAuth session to include user id and role
  - [x] 3.3 Implement middleware.ts to protect /dashboard/* routes and enforce role-based access
  - [x] 3.4 Create /auth/login page with form validation
  - [x] 3.5 Implement logout and session expiry handling
  - [x] 3.6 Seed database with test users for each role
  - **References:** Requirements 3.1–3.7, Design: Middleware

- [x] 4. Public Site — Home Page
  - [x] 4.1 Create HeroSection component with headline and two CTA buttons
  - [x] 4.2 Create AboutPreview component
  - [x] 4.3 Create ServicesGrid component with five service cards
  - [x] 4.4 Create WhyChooseUs component with four feature highlights
  - [x] 4.5 Create TestimonialsCarousel component
  - [x] 4.6 Create bottom CTA section
  - [x] 4.7 Assemble home page (app/(public)/page.tsx) with all sections
  - **References:** Requirements 1.1–1.7

- [x] 5. Public Site — Core Pages
  - [x] 5.1 Create About Us page
  - [x] 5.2 Create Services page with detailed service descriptions
  - [x] 5.3 Create Programs page
  - [x] 5.4 Create Resources/Blog page with ContentPost listing
  - [x] 5.5 Create Contact page with ContactForm component and API route
  - [x] 5.6 Create Donate/Support Us page
  - **References:** Requirements 2.1–2.9

- [x] 6. Parent Dashboard — Child Profiles
  - [x] 6.1 Create child profile list view showing all profiles for the authenticated parent
  - [x] 6.2 Create add/edit child profile form with zod validation
  - [x] 6.3 Implement API routes: GET/POST/PUT /api/children
  - [x] 6.4 Display inline validation errors on form submission failures
  - **References:** Requirements 4.1–4.5

- [x] 7. Parent Dashboard — Appointment Booking
  - [x] 7.1 Create available slots view filtered by service type
  - [x] 7.2 Implement booking confirmation flow with conflict detection
  - [x] 7.3 Implement API route POST /api/bookings with double-booking prevention
  - [x] 7.4 Create appointment history view (past and upcoming sessions)
  - [x] 7.5 Implement session cancellation with window enforcement
  - [x] 7.6 Send confirmation and cancellation notifications (email)
  - **References:** Requirements 5.1–5.6

- [x] 8. Parent Dashboard — Reports and Messaging
  - [x] 8.1 Create session notes view per child profile
  - [x] 8.2 Implement PDF download for progress reports
  - [x] 8.3 Add in-app notifications for new notes and reports
  - [x] 8.4 Create messaging interface for parent-to-center communication
  - [x] 8.5 Implement API routes for messages: GET/POST /api/messages
  - **References:** Requirements 6.1–6.5

- [x] 9. Therapist Dashboard — Caseload and Schedule
  - [x] 9.1 Create assigned children list view for the authenticated therapist
  - [x] 9.2 Create schedule view (calendar or list) showing upcoming and past sessions
  - [x] 9.3 Implement real-time schedule updates when sessions are booked or cancelled
  - **References:** Requirements 7.1–7.4

- [x] 10. Therapist Dashboard — Notes, Reports, and Goals
  - [x] 10.1 Create session note form with required field validation
  - [x] 10.2 Implement API route POST /api/notes
  - [x] 10.3 Create progress report upload with file storage integration
  - [x] 10.4 Create goal management UI (create, update, mark complete)
  - [x] 10.5 Implement API routes for goals: GET/POST/PUT /api/goals
  - [x] 10.6 Record completedAt timestamp when a goal is marked complete
  - **References:** Requirements 8.1–8.5

- [x] 11. Admin Dashboard — User Management
  - [x] 11.1 Create user list view with role, name, and account status
  - [x] 11.2 Implement create user form with role assignment and invitation email
  - [x] 11.3 Implement account deactivation/reactivation
  - [x] 11.4 Create therapist assignment UI for linking child profiles to therapists
  - [x] 11.5 Implement API routes: GET/POST/PUT /api/admin/users
  - **References:** Requirements 9.1–9.5

- [x] 12. Admin Dashboard — Bookings and Services
  - [x] 12.1 Create all-sessions view with filters (date, therapist, service type)
  - [x] 12.2 Create service management UI (create, edit, deactivate)
  - [x] 12.3 Implement API routes: GET/POST/PUT /api/admin/services
  - [x] 12.4 Ensure deactivated services are excluded from booking slots
  - **References:** Requirements 10.1–10.3

- [x] 13. Admin Dashboard — CMS and Content
  - [x] 13.1 Create CMS interface for editing homepage content
  - [x] 13.2 Create blog post editor (create, edit, publish/unpublish)
  - [x] 13.3 Implement API routes: GET/POST/PUT /api/admin/content
  - [x] 13.4 Ensure published posts appear on the public Resources/Blog page
  - **References:** Requirements 10.4–10.5

- [x] 14. Admin Dashboard — Analytics
  - [x] 14.1 Create analytics dashboard with aggregate metrics (active children, sessions completed, weekly sessions, therapist utilization)
  - [x] 14.2 Implement date range filter that updates all metrics
  - [x] 14.3 Implement CSV export for session and user data
  - [x] 14.4 Implement API route GET /api/admin/analytics
  - **References:** Requirements 11.1–11.3

- [x] 15. Error Handling and API Hardening
  - [x] 15.1 Implement global error boundary for dashboard routes
  - [x] 15.2 Standardize all API responses to { data, error } shape
  - [x] 15.3 Add server-side logging for database errors (no internal details to client)
  - [x] 15.4 Enforce HTTPS redirect in production Next.js config
  - **References:** Requirements 13.4–13.6, Design: Error Handling

- [x] 16. Accessibility Hardening
  - [x] 16.1 Audit all forms for descriptive labels and inline error messages
  - [x] 16.2 Add visible focus indicators to all interactive elements
  - [x] 16.3 Ensure all icons are paired with visible text labels
  - [x] 16.4 Verify minimum 44x44px touch targets on all mobile interactive elements
  - [x] 16.5 Run jest-axe on all page components and fix reported violations
  - **References:** Requirements 12.4–12.11

- [ ] 17. Property-Based Tests
  - [ ] 17.1 P1: Valid credentials grant role-matched session (fast-check, 100 iterations)
  - [ ]* 17.2 P2: Invalid credentials never grant access (fast-check, 100 iterations)
  - [ ]* 17.3 P3: Unauthenticated requests redirect to login (fast-check, 100 iterations)
  - [ ]* 17.4 P4: Cross-role access returns 403 (fast-check, 100 iterations)
  - [ ]* 17.5 P5: Child profile creation round trip (fast-check, 100 iterations)
  - [ ]* 17.6 P6: Invalid child profile forms are rejected (fast-check, 100 iterations)
  - [ ]* 17.7 P7: Booking a slot creates a session and notifies (fast-check, 100 iterations)
  - [ ]* 17.8 P8: Double-booking is prevented (fast-check, 100 iterations)
  - [ ]* 17.9 P9: Cancellation within window removes session (fast-check, 100 iterations)
  - [ ]* 17.10 P10: Session note creation round trip (fast-check, 100 iterations)
  - [ ]* 17.11 P11: Goal completion records timestamp (fast-check, 100 iterations)
  - [ ]* 17.12 P12: Deactivated users cannot authenticate (fast-check, 100 iterations)
  - [ ]* 17.13 P13: Deactivated services are not bookable (fast-check, 100 iterations)
  - [ ]* 17.14 P14: Published content appears on public site (fast-check, 100 iterations)
  - [ ]* 17.15 P15: Analytics date range filter is consistent (fast-check, 100 iterations)
  - [ ]* 17.16 P16: Contact form validation rejects incomplete submissions (fast-check, 100 iterations)
  - **References:** Design: Correctness Properties

- [x] 18. Performance and Final QA
  - [x] 18.1 Configure Lighthouse CI for public pages (threshold: score ≥ 80)
  - [x] 18.2 Review Prisma queries for N+1 issues using query logging
  - [ ] 18.3 Verify SSG/SSR is applied correctly to all public pages
  - [x] 18.4 Final responsive layout review across mobile, tablet, and desktop
  - **References:** Requirements 13.2–13.3
