# Dovepeak Letter Head Creator (DLHC) - Master Documentation

## 1. Introduction & Project Justification
**Project Name:** Dovepeak Letter Head Creator (DLHC)
**Project Type:** Cloud-Based Software as a Service (SaaS) Platform
**Target Users:** Small businesses, startups, NGOs, educational institutions, government agencies, consultants, freelancers, and corporate organizations.

### Background & Problem Statement
A professional letterhead is essential for corporate communication. However, many businesses struggle to create and maintain professionally branded letterheads because existing solutions are expensive, require graphic design skills, offer limited customization, or lack instant document generation capabilities. This leads to inconsistent and unprofessional brand identity.

### Proposed Solution & Vision
DLHC is a modern web-based platform that enables users to generate professional company letterheads within minutes. Users provide company details, select ready-made templates, preview changes in real time, customize branding (colors, layout, logos), and export documents in PDF and Microsoft Word (DOCX) formats.
**Project Vision:** To become the leading digital platform for business document branding across Africa and beyond.

---

## 2. Technology Stack & System Architecture
*(Unified Stack as confirmed by the project owner)*

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form, Zod
- **Drag & Drop:** dnd-kit

**Document Generation Engine:**
- React PDF / jsPDF (for PDF generation)
- docx (for Microsoft Word document generation)

**Backend & Database:**
- Next.js Server Actions (Serverless Backend)
- Supabase PostgreSQL (Database)
- Supabase Auth (Authentication)
- Cloudinary (Media & File Storage for logos, templates, and thumbnails)

---

## 3. Core Functionalities

### 3.1 Authentication & Profiles
- Secure user registration, login, and password management via Supabase Auth.
- Company profile management: Store Company Name, Logo, Emails, Phones, Websites, Addresses, Tax PINs, and Taglines.

### 3.2 Media & Template Management
- Upload logos optimized and stored in Cloudinary.
- **Template Library:** Professionally designed system templates categorized by style (Corporate, Minimalist, Executive, Modern, NGO, Government, Education).

### 3.3 The Editor & Real-Time Preview
- Drag-and-drop customization (e.g., logo position, contact information placement).
- Adjust Primary/Secondary colors and Typography (Font family, size, weight).
- **Real-Time Preview:** The preview updates instantly, mimicking the exact final document.

### 3.4 Export & Save
- **PDF Export:** Print-ready, professionally formatted.
- **DOCX Export:** Editable Microsoft Word document exports.
- **Save Designs:** Users can save customized letterheads, track design versions (undo history), and duplicate designs.

---

## 4. UI / Dashboard Structure

**Landing Page:**
- Hero Section, Features, How It Works, Pricing, Testimonials, FAQ.

**Dashboard:**
- Total Templates, Saved Designs, Recent Downloads, Quick Actions.

**Template Library:**
- Grid Layout, Preview Cards, Category Filters.

**Editor Page:**
- Canvas, Properties Panel (customizations), Preview Window, Export Actions.

---

## 5. Pricing Model & Future Expansion

### Pricing Plans
- **Free Plan:** 3 Templates, Watermarked PDF, No DOCX Export.
- **Professional Plan:** Unlimited Templates, PDF Export, DOCX Export, Cloud Save.
- **Enterprise Plan:** Multi-user Teams, Custom Branding, Dedicated Templates, Priority Support.

### Future Modules
- Invoice Generator, Quotation Generator, Company Profile Creator, Business Card Generator, Email Signature Generator.

---

## 6. Database Schema Design (Supabase PostgreSQL)

The database utilizes Supabase PostgreSQL and is structured for SaaS multi-tenancy. No files are stored directly in Supabase (Cloudinary handles media).

### MVP Essential Tables
1. **users:** `id` (UUID, PK), `email`, `full_name`, `avatar_url`, `phone_number`, `account_type` (Free, Professional, Enterprise, Admin), `email_verified`, timestamps.
2. **organizations:** `id`, `owner_id`, `name`, `slug`, `logo_url`, timestamps.
3. **company_profiles:** `id`, `organization_id`, `company_name`, `tagline`, `registration_number`, `tax_pin`, `email`, `phone`, `website`, address fields, `logo_url`, `primary_color`, `secondary_color`, timestamps.
4. **template_categories:** `id`, `name`, `description`, timestamps.
5. **templates (Master):** `id`, `category_id`, `name`, `description`, `thumbnail_url`, `preview_url`, `template_schema` (JSONB), `is_premium`, `status`, timestamps.
6. **designs (User Designs):** `id`, `user_id`, `organization_id`, `company_profile_id`, `template_id`, `design_name`, `design_data` (JSONB), `thumbnail_url`, timestamps.
7. **downloads:** `id`, `user_id`, `design_id`, `format` (PDF/DOCX), `file_url`, timestamps.

### Optional Future Tables (To be implemented later)
- **design_versions:** Revisions and undo history (`design_id`, `version_data`).
- **organization_members:** Team collaboration (`user_id`, `role`).
- **subscription_plans & subscriptions:** Managing active plans and access levels.
- **payments:** Payment history (Stripe, PayPal).
- **notifications:** User alerts.
- **activity_logs:** Auditing and analytics.
- **api_usage:** Tracking for future API monetization.

---

## 7. Development Roadmap

- **Phase 1 (Week 1):** Setup Next.js, Database schema (PostgreSQL), Authentication, and User Dashboard.
- **Phase 2 (Week 2):** Company Profile Module and core Template Engine foundation.
- **Phase 3 (Week 3):** Live Preview System and interactive Template Customization tools.
- **Phase 4 (Week 4):** PDF Generation and DOCX Generation engines.
- **Phase 5 (Week 5):** Payments, Subscriptions, and Production Deployment.
