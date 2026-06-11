# Dovepeak Letter Head Creator (DLHC) - Project Setup & System Architecture Document

## Project Overview
Dovepeak Letter Head Creator (DLHC) is a professional SaaS platform that enables businesses, NGOs, consultants, and institutions to create, customize, preview, and export professional company letterheads in PDF and Microsoft Word formats.

## Recommended Technology Stack
**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand
- React Hook Form
- Zod Validation
- React PDF
- jsPDF
- docx
- dnd-kit

**Backend:**
- Next.js Server Actions (Serverless Backend)
- Supabase PostgreSQL
- Cloudinary Media Storage
- Supabase Authentication

## Project Structure
```
dlhc/
├── app/
├── components/
├── lib/
├── types/
├── hooks/
├── store/
├── public/
└── supabase/
```

## Core Application Flow
1. User Registration & Login
2. Company Profile Creation
3. Template Selection
4. Letterhead Editing
5. Real-Time Preview
6. Export to PDF/DOCX
7. Save Designs

## Company Profile Fields
- Company Name
- Logo
- Physical Address
- Postal Address
- Phone Number
- Email Address
- Website
- Tagline
- Tax PIN
- Registration Number

## Template Categories
- Corporate
- Minimalist
- Executive
- Modern
- NGO
- Government
- Education

## Editor Features
- Change Colors
- Move Logo
- Adjust Header
- Adjust Footer
- Change Fonts
- Add Social Media Links
- Real-Time Preview

## Database Design

**Users Table**
- id
- name
- email
- password
- created_at

**Companies Table**
- id
- user_id
- company_name
- logo
- address
- phone
- email
- website
- tax_pin
- registration_no
- created_at

**Templates Table**
- id
- name
- category
- thumbnail
- json_config
- created_at

**User Templates Table**
- id
- user_id
- company_id
- template_id
- custom_config
- created_at

## Dashboard Pages

**Landing Page**
- Hero Section
- Features
- How It Works
- Pricing
- Testimonials
- FAQ

**Dashboard**
- Total Templates
- Saved Designs
- Recent Downloads
- Quick Actions

**Template Library**
- Grid Layout
- Preview Cards
- Category Filters

**Editor Page**
- Canvas
- Properties Panel
- Preview Window
- Export Actions

## Pricing Model

**Free Plan**
- 3 Templates
- Watermarked PDF
- No DOCX Export

**Professional Plan**
- Unlimited Templates
- PDF Export
- DOCX Export
- Cloud Save

**Enterprise Plan**
- Multi-user Teams
- Custom Branding
- Dedicated Templates
- Priority Support

## Future Expansion
- Invoice Creator
- Quotation Creator
- Company Profile Creator
- Business Card Generator
- Email Signature Creator

## MVP Features
- Authentication
- Company Profile Creation
- 10 Premium Templates
- Live Preview
- PDF Export
- DOCX Export
- Save Designs
- User Dashboard

## Development Roadmap

**Phase 1 (Week 1)**
- Next.js Setup
- Supabase PostgreSQL Setup
- Authentication
- Dashboard

**Phase 2 (Week 2)**
- Company Profile Module
- Template Engine

**Phase 3 (Week 3)**
- Live Preview System
- Template Customization

**Phase 4 (Week 4)**
- PDF Generation
- DOCX Generation

**Phase 5 (Week 5)**
- Payments
- Subscriptions
- Production Deployment
