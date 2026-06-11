# Dovepeak Letter Head Creator (DLHC) Initial Database Design Documentation

**Version 1.0**

## Technology Stack
**Frontend**
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Shadcn UI

**Backend**
- Serverless Architecture
- Next.js Server Actions
- Supabase PostgreSQL
- Cloudinary Media Storage

**Authentication**
- Supabase Auth

**File Storage**
- Cloudinary

## 1. Database Design Objectives
The database must support:
- User authentication and authorization
- Company profile management
- Multiple companies per user
- Letterhead template management
- Template customization
- Design saving
- PDF generation history
- DOCX generation history
- User subscriptions
- Billing management
- Template categories
- Future expansion modules

The architecture should be designed to support:
- Multi-tenancy
- SaaS subscriptions
- Team collaboration
- Enterprise plans
- Multiple brands per organization

## 2. Database Overview
The initial database will contain the following core entities:
- Users
- Organizations
- Company Profiles
- Team Members
- Templates
- Template Categories
- User Designs
- Design Versions
- Downloads
- Subscriptions
- Payments
- Activity Logs
- Notifications
- API Usage
- Settings

## 3. Users Table
Stores authenticated users.

**Table: `users`**

| Field | Type |
| :--- | :--- |
| `id` | UUID (PK) |
| `email` | VARCHAR |
| `full_name` | VARCHAR |
| `avatar_url` | TEXT |
| `phone_number` | VARCHAR |
| `account_type` | VARCHAR |
| `email_verified` | BOOLEAN |
| `created_at` | TIMESTAMP |
| `updated_at` | TIMESTAMP |
| `last_login_at` | TIMESTAMP |

**Account Types:** Free, Professional, Enterprise, Admin

## 4. Organizations Table
Allows future multi-company support.

**Table: `organizations`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `owner_id` | UUID |
| `name` | VARCHAR |
| `slug` | VARCHAR |
| `logo_url` | TEXT |
| `created_at` | TIMESTAMP |
| `updated_at` | TIMESTAMP |

**Example:** Dovepeak Holdings may own Dovepeak Logistics, Dovepeak Technologies, under one account.

## 5. Company Profiles Table
Core business information.

**Table: `company_profiles`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `organization_id` | UUID |
| `company_name` | VARCHAR |
| `tagline` | VARCHAR |
| `registration_number` | VARCHAR |
| `tax_pin` | VARCHAR |
| `email` | VARCHAR |
| `phone` | VARCHAR |
| `website` | VARCHAR |
| `address_line_1` | VARCHAR |
| `address_line_2` | VARCHAR |
| `city` | VARCHAR |
| `country` | VARCHAR |
| `postal_code` | VARCHAR |
| `logo_url` | TEXT |
| `primary_color` | VARCHAR |
| `secondary_color` | VARCHAR |
| `created_at` | TIMESTAMP |
| `updated_at` | TIMESTAMP |

## 6. Team Members
Supports collaboration.

**Table: `organization_members`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `organization_id` | UUID |
| `user_id` | UUID |
| `role` | VARCHAR |
| `invited_by` | UUID |
| `joined_at` | TIMESTAMP |

**Roles:** Owner, Admin, Editor, Viewer

## 7. Template Categories
Template classification.

**Table: `template_categories`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `name` | VARCHAR |
| `description` | TEXT |
| `created_at` | TIMESTAMP |

**Categories:** Corporate, Executive, Minimalist, Government, Education, NGO, Modern

## 8. Master Templates
System-generated templates.

**Table: `templates`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `category_id` | UUID |
| `name` | VARCHAR |
| `description` | TEXT |
| `thumbnail_url` | TEXT |
| `preview_url` | TEXT |
| `template_schema` | JSONB |
| `is_premium` | BOOLEAN |
| `status` | VARCHAR |
| `created_at` | TIMESTAMP |

**Status:** Draft, Published, Archived

## 9. User Designs
User-created letterheads.

**Table: `designs`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `organization_id` | UUID |
| `company_profile_id` | UUID |
| `template_id` | UUID |
| `design_name` | VARCHAR |
| `design_data` | JSONB |
| `thumbnail_url` | TEXT |
| `created_at` | TIMESTAMP |
| `updated_at` | TIMESTAMP |

## 10. Design Versions
Supports undo history and revisions.

**Table: `design_versions`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `design_id` | UUID |
| `version_number` | INTEGER |
| `version_data` | JSONB |
| `created_at` | TIMESTAMP |

## 11. Downloads Table
Tracks exports.

**Table: `downloads`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `design_id` | UUID |
| `format` | VARCHAR |
| `file_url` | TEXT |
| `created_at` | TIMESTAMP |

**Formats:** PDF, DOCX

## 12. Subscription Plans
Defines system plans.

**Table: `subscription_plans`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `plan_name` | VARCHAR |
| `monthly_price` | DECIMAL |
| `yearly_price` | DECIMAL |
| `max_designs` | INTEGER |
| `max_downloads` | INTEGER |
| `allow_docx` | BOOLEAN |
| `allow_team_members` | BOOLEAN |

## 13. User Subscriptions
Stores active plans.

**Table: `subscriptions`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `plan_id` | UUID |
| `status` | VARCHAR |
| `starts_at` | TIMESTAMP |
| `expires_at` | TIMESTAMP |
| `created_at` | TIMESTAMP |

**Status:** Active, Cancelled, Expired, Trial

## 14. Payments
Payment history.

**Table: `payments`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `subscription_id` | UUID |
| `provider` | VARCHAR |
| `amount` | DECIMAL |
| `currency` | VARCHAR |
| `transaction_reference` | VARCHAR |
| `payment_status` | VARCHAR |
| `paid_at` | TIMESTAMP |

**Providers:** Stripe, PayPal, M-Pesa

## 15. Notifications
User alerts.

**Table: `notifications`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `title` | VARCHAR |
| `message` | TEXT |
| `is_read` | BOOLEAN |
| `created_at` | TIMESTAMP |

## 16. Activity Logs
Auditing and analytics.

**Table: `activity_logs`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `activity_type` | VARCHAR |
| `metadata` | JSONB |
| `ip_address` | VARCHAR |
| `created_at` | TIMESTAMP |

**Examples:** Login, Template Selected, Design Created, Design Edited, PDF Downloaded, DOCX Downloaded

## 17. User Settings
Preferences.

**Table: `user_settings`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `preferred_theme` | VARCHAR |
| `preferred_language` | VARCHAR |
| `email_notifications` | BOOLEAN |
| `created_at` | TIMESTAMP |

## 18. API Usage Tracking
Future-proofing for API monetization.

**Table: `api_usage`**

| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `endpoint` | VARCHAR |
| `request_count` | INTEGER |
| `usage_date` | DATE |

## 19. Cloudinary Media References
No files are stored in Supabase.
Cloudinary stores:
- Company Logos
- Template Thumbnails
- Design Thumbnails
- Generated Preview Images

Database stores only:
- `logo_url`
- `thumbnail_url`
- `preview_url`
- `file_url`

## 20. Recommended MVP Database
For Version 1, implement only:
- users
- organizations
- company_profiles
- templates
- template_categories
- designs
- downloads

Optional Later: subscriptions, payments, notifications, organization_members, activity_logs, api_usage.

This MVP structure is sufficient to support User Authentication, Company Profile Management, Letterhead Creation, Template Selection, Live Preview, PDF Export, DOCX Export, Design Saving, while remaining scalable enough to evolve into a full SaaS business-document generation platform.
