# GenContent - AI-Powered Content SaaS MVP

GenContent is a next-generation AI Content Generator SaaS platform designed to automate copy creation. Built with modern web technologies, the platform allows authenticated users to draft optimized LinkedIn posts, Twitter threads, or blog articles with customized tones and languages.

All generated outputs are processed via cutting-edge Google AI Studio models and seamlessly backed up to a secured relational cloud database.

## 🚀 Live Demo

The application is currently being packaged for cloud delivery. The active deployment link will be attached below immediately following the Vercel production build step.

## ✨ Key Features

- **Modern Landing Page:** A polished, fully responsive marketing page optimized for high conversions.
- **Dynamic Dashboard Overview:** Animated analytics metrics tracking total generations, favorite content styles, and chronicling recent developer workspace activities.
- **Parametric AI Copywriting:** Tailor your brand's voice by fine-tuning inputs through specific content types, professional/witty tones, and multi-language support.
- **Rich Markdown Output Rendering:** Outputs are processed and rendered natively in clean, readable Markdown syntax.
- **One-Click Clipboard Action:** Instantly copy generated content drafts using an interactive, optimized clipboard action handler.
- **Full CRUD Content History:** A comprehensive history center featuring client-side live search, semantic type filters, detailed full-content modal previews, and complete database removal mechanics.
- **Secure Authentication Layer:** Middleware-protected endpoints and route structures ensuring isolated cloud sandboxes for each account.

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Authentication:** Clerk Auth Suite
- **Database Architecture:** Neon Serverless PostgreSQL
- **Object-Relational Mapping (ORM):** Prisma ORM
- **AI Engine Platform:** Google AI Studio SDK (Gemini 2.5 Flash)
- **Markdown Parsing Engine:** React Markdown Parser

## 📦 Local Installation Guide

Follow these steps to set up the workspace ecosystem locally:

### 1. Clone the Repository

git clone https://github.com/ferda-zeynep/gencontent.git
cd gencontent

2. Install Project Dependencies
   npm install

3. Setup Environment Variables
   Create a .env file in the root directory and append the following architectural credentials:

Clerk Authentication Suite Credentials
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

Neon Serverless PostgreSQL Connection String
DATABASE_URL="postgresql://user:password@neon-host/dbname?sslmode=require"

Google AI Studio API Secret Token
GEMINI_API_KEY=your_google_studio_gemini_api_key

4. Sync Prisma Schema with Cloud Database
   npx prisma db push

5. Launch Local Development Server
   npm run dev

Open http://localhost:3000 inside your browser to view the active application workspace.

📝 Code Documentation Policy
This repository strictly enforces English-only engineering practices for all technical components, state variables, architectural routing mechanisms, database indexing configurations, and structural comment lines to meet international software development standards.
