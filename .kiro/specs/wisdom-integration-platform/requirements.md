# Requirements Document

## Introduction

Wisdom Integration is an end-to-end company website and care platform for children with special needs. The platform combines a public-facing marketing website with a secure, role-based care management system. It serves three primary user groups: parents/guardians of children receiving care, therapists delivering services, and administrators managing the organization. The platform must be warm, accessible, and trustworthy — reflecting the brand values of care, growth, and hope.

## Glossary

- **Platform**: The full Wisdom Integration web application, including public site and authenticated dashboards
- **Public_Site**: The publicly accessible marketing and informational pages
- **Parent_Dashboard**: The authenticated interface for parents and guardians
- **Therapist_Dashboard**: The authenticated interface for therapists and care specialists
- **Admin_Dashboard**: The authenticated interface for administrators
- **Child_Profile**: A record representing a child receiving care, owned by a parent/guardian
- **Session**: A scheduled appointment between a child and a therapist
- **Session_Note**: A therapist-authored record of observations and progress from a session
- **Progress_Report**: A formal document summarizing a child's progress over a period of time
- **Goal**: A measurable therapeutic or educational target tracked for a child
- **Auth_System**: The authentication and authorization system (NextAuth or Clerk)
- **Role**: A user classification — one of Parent, Therapist, or Admin
- **CMS**: Content management capability for managing website content
- **Booking_System**: The appointment scheduling and management subsystem

---

## Requirements

### Requirement 1: Public Website — Home Page

**User Story:** As a prospective parent, I want to land on a welcoming, informative homepage, so that I can quickly understand what Wisdom Integration offers and take action.

#### Acceptance Criteria

1. THE Public_Site SHALL display a hero section with the headline "Empowering Every Child's Journey with Love, Care, and Healing" and two call-to-action buttons: "Book a Consultation" and "Explore Services"
2. THE Public_Site SHALL display an About preview section summarizing the Wisdom Integration mission
3. THE Public_Site SHALL display a Services section with cards for: Speech Therapy, Occupational Therapy, Behavioral Support, Special Education Support, and Parent Guidance
4. THE Public_Site SHALL display a "Why Choose Us" section highlighting: Experienced Specialists, Child-Centered Care, Family Involvement, and Safe and Welcoming Approach
5. THE Public_Site SHALL display a Testimonials section featuring parent and family stories
6. THE Public_Site SHALL display a call-to-action section encouraging users to book a session or make an inquiry
7. THE Public_Site SHALL display a footer containing contact information, social media links, quick navigation links, and links to legal pages

---

### Requirement 2: Public Website — Core Pages

**User Story:** As a site visitor, I want to access dedicated pages for About, Services, Programs, Resources, Contact, Donate, and Login, so that I can find detailed information and take appropriate action.

#### Acceptance Criteria

1. THE Public_Site SHALL provide an About Us page describing the organization's history, mission, and team
2. THE Public_Site SHALL provide a Services page with detailed descriptions of each therapy and support offering
3. THE Public_Site SHALL provide a Programs page describing structured care programs available to children
4. THE Public_Site SHALL provide a Resources/Blog page listing articles and resources for families
5. THE Public_Site SHALL provide a Contact page with a contact form, phone number, email address, and physical address
6. THE Public_Site SHALL provide a Donate/Support Us page with information on how to contribute to the organization
7. THE Public_Site SHALL provide a Login page allowing users to authenticate and access their respective dashboards
8. WHEN a visitor submits the contact form with valid inputs, THE Public_Site SHALL send the submission to the organization and display a confirmation message to the visitor
9. IF a visitor submits the contact form with missing required fields, THEN THE Public_Site SHALL display inline validation errors identifying each missing or invalid field

---

### Requirement 3: Authentication and Role-Based Access

**User Story:** As a user, I want to securely log in and be directed to the correct dashboard for my role, so that I only see information and actions relevant to me.

#### Acceptance Criteria

1. THE Auth_System SHALL support three roles: Parent, Therapist, and Admin
2. WHEN a user submits valid credentials, THE Auth_System SHALL authenticate the user and redirect them to the dashboard corresponding to their assigned Role
3. IF a user submits invalid credentials, THEN THE Auth_System SHALL display an error message and SHALL NOT grant access
4. WHEN an unauthenticated user attempts to access a protected dashboard route, THE Auth_System SHALL redirect the user to the Login page
5. WHEN an authenticated user attempts to access a dashboard route outside their Role, THE Auth_System SHALL return a 403 Forbidden response
6. THE Auth_System SHALL support secure session management with session expiry
7. WHEN a user logs out, THE Auth_System SHALL invalidate the session and redirect the user to the Login page

---

### Requirement 4: Parent Dashboard — Child Profile Management

**User Story:** As a parent, I want to manage my child's profile on the platform, so that therapists and staff have accurate information to deliver the best care.

#### Acceptance Criteria

1. THE Parent_Dashboard SHALL display all Child_Profiles associated with the authenticated parent's account
2. WHEN a parent submits a valid new child profile form, THE Parent_Dashboard SHALL create a new Child_Profile and display it in the parent's profile list
3. IF a parent submits a child profile form with missing required fields, THEN THE Parent_Dashboard SHALL display validation errors for each missing field without submitting the form
4. WHEN a parent edits and saves an existing Child_Profile, THE Parent_Dashboard SHALL update the record and display the updated information
5. THE Child_Profile SHALL store: child's name, date of birth, diagnosis or area of concern, emergency contact information, and any relevant medical notes

---

### Requirement 5: Parent Dashboard — Appointment Booking

**User Story:** As a parent, I want to book, view, and manage therapy sessions for my child, so that I can coordinate care efficiently.

#### Acceptance Criteria

1. THE Booking_System SHALL display available appointment slots for each service type
2. WHEN a parent selects an available slot and confirms a booking, THE Booking_System SHALL create a Session record and send a confirmation notification to the parent
3. IF a parent attempts to book a slot that is no longer available, THEN THE Booking_System SHALL display an error message and prompt the parent to select a different slot
4. THE Parent_Dashboard SHALL display the full appointment history for each Child_Profile, including past and upcoming Sessions
5. WHEN a parent cancels an upcoming Session within the permitted cancellation window, THE Booking_System SHALL cancel the Session and notify the assigned therapist
6. IF a parent attempts to cancel a Session outside the permitted cancellation window, THEN THE Booking_System SHALL display the cancellation policy and SHALL NOT cancel the Session

---

### Requirement 6: Parent Dashboard — Reports and Communication

**User Story:** As a parent, I want to access therapist notes and progress reports and communicate with the center, so that I stay informed about my child's progress.

#### Acceptance Criteria

1. THE Parent_Dashboard SHALL display Session_Notes authored by therapists for each of the parent's Child_Profiles
2. THE Parent_Dashboard SHALL allow parents to download Progress_Reports as PDF files
3. WHEN a new Session_Note or Progress_Report is added for a child, THE Parent_Dashboard SHALL display a notification to the parent
4. THE Parent_Dashboard SHALL provide a messaging interface for parents to communicate with the center
5. WHEN a parent sends a message, THE Parent_Dashboard SHALL deliver the message to the Admin_Dashboard and display a sent confirmation to the parent

---

### Requirement 7: Therapist Dashboard — Caseload and Appointments

**User Story:** As a therapist, I want to view my assigned children and manage my appointment schedule, so that I can deliver organized, effective care.

#### Acceptance Criteria

1. THE Therapist_Dashboard SHALL display all Child_Profiles assigned to the authenticated therapist
2. THE Therapist_Dashboard SHALL display the therapist's upcoming and past Sessions in a calendar or list view
3. WHEN a Session is booked by a parent for a therapist's available slot, THE Therapist_Dashboard SHALL update to reflect the new appointment
4. WHEN a Session is cancelled, THE Therapist_Dashboard SHALL remove the Session from the therapist's schedule and display a cancellation notification

---

### Requirement 8: Therapist Dashboard — Notes, Reports, and Goals

**User Story:** As a therapist, I want to document session notes, upload progress reports, and track goals for each child, so that I maintain accurate and useful clinical records.

#### Acceptance Criteria

1. WHEN a therapist submits a completed session note form, THE Therapist_Dashboard SHALL save the Session_Note linked to the corresponding Session and Child_Profile
2. IF a therapist submits a session note form with missing required fields, THEN THE Therapist_Dashboard SHALL display validation errors and SHALL NOT save the note
3. THE Therapist_Dashboard SHALL allow therapists to upload Progress_Reports as PDF or document files linked to a Child_Profile
4. THE Therapist_Dashboard SHALL allow therapists to create, update, and mark Goals as complete for each Child_Profile
5. WHEN a Goal is marked as complete, THE Therapist_Dashboard SHALL record the completion date and retain the Goal in the child's history

---

### Requirement 9: Admin Dashboard — User and Therapist Management

**User Story:** As an administrator, I want to manage user accounts and therapist assignments, so that the platform operates correctly and securely.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL display a list of all registered users with their Role, name, and account status
2. WHEN an admin creates a new user account with a specified Role, THE Admin_Dashboard SHALL provision the account and send an invitation email to the new user
3. WHEN an admin deactivates a user account, THE Admin_Dashboard SHALL prevent that user from authenticating until the account is reactivated
4. THE Admin_Dashboard SHALL allow admins to assign Child_Profiles to specific therapists
5. WHEN an admin updates a therapist assignment, THE Therapist_Dashboard SHALL reflect the updated caseload immediately

---

### Requirement 10: Admin Dashboard — Bookings, Services, and Content

**User Story:** As an administrator, I want to manage bookings, services, and website content, so that the platform and public site remain accurate and up to date.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL display all Sessions across all therapists with filtering by date, therapist, and service type
2. THE Admin_Dashboard SHALL allow admins to create, edit, and deactivate service offerings displayed on the Public_Site
3. WHEN an admin deactivates a service, THE Public_Site SHALL no longer display that service as available for booking
4. THE Admin_Dashboard SHALL provide a CMS interface for editing homepage content, blog posts, and resource articles
5. WHEN an admin publishes a new blog post or resource, THE Public_Site SHALL display the new content on the Resources/Blog page

---

### Requirement 11: Admin Dashboard — Reports and Analytics

**User Story:** As an administrator, I want to view platform-wide reports and analytics, so that I can monitor organizational performance and outcomes.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL display aggregate metrics including: total active children, total sessions completed, sessions scheduled per week, and therapist utilization
2. THE Admin_Dashboard SHALL allow admins to export session and user data as CSV files
3. WHEN an admin applies a date range filter to the analytics view, THE Admin_Dashboard SHALL update all displayed metrics to reflect only data within the selected range

---

### Requirement 12: Design System and Accessibility

**User Story:** As any user, I want the platform to be visually consistent, accessible, and easy to use on any device, so that I can navigate confidently regardless of ability or device type.

#### Acceptance Criteria

1. THE Platform SHALL apply the defined color palette: Primary Blue #1F4AA8, Secondary Green #43B65C, Accent Yellow #F2C300, Accent Orange #F4A623, Background #F8FAFC, Surface #FFFFFF, Text Primary #1F2937, Text Secondary #6B7280, Border #E5E7EB
2. THE Platform SHALL use Poppins or Inter for headings and Inter or Open Sans for body text
3. THE Platform SHALL apply rounded corners of 16px–24px to cards and interactive components
4. THE Platform SHALL maintain a minimum body font size of 16px across all pages
5. THE Platform SHALL meet WCAG 2.1 AA color contrast requirements for all text and interactive elements
6. THE Platform SHALL support full keyboard navigation for all interactive elements
7. THE Platform SHALL display visible focus indicators on all focusable elements
8. THE Platform SHALL provide descriptive labels for all form inputs
9. THE Platform SHALL pair all icons with visible text labels
10. THE Platform SHALL be fully responsive and usable on mobile, tablet, and desktop viewports
11. THE Platform SHALL provide large touch targets with a minimum size of 44x44px on mobile

---

### Requirement 13: Performance and Technical Foundation

**User Story:** As any user, I want the platform to load quickly and reliably, so that I can access care information and services without frustration.

#### Acceptance Criteria

1. THE Platform SHALL be built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL
2. WHEN a public page is requested, THE Platform SHALL serve the page with server-side rendering or static generation to optimize load time
3. THE Platform SHALL achieve a Lighthouse performance score of 80 or above on public pages
4. WHEN a database query fails, THE Platform SHALL log the error and return a user-friendly error message without exposing internal details
5. THE Platform SHALL store all user passwords using a secure hashing algorithm and SHALL NOT store plaintext passwords
6. THE Platform SHALL enforce HTTPS for all routes in production
