import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function LandingPage() {
  const authObj = await auth();
  const userId = authObj.userId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-gray-950">
              GenContent
            </span>
          </div>
          <nav className="flex items-center gap-4">
            {userId ? (
              <Link
                href="/dashboard"
                className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm shadow-blue-200"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-semibold text-gray-600 hover:text-gray-950 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-sm font-semibold bg-gray-950 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase">
          ✨ Next-Generation AI Content SaaS
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 max-w-3xl leading-tight">
          Generate High-Converting Content in Seconds
        </h1>

        <p className="text-base md:text-xl text-gray-500 max-w-2xl leading-relaxed">
          Stop staring at a blank page. Let GenContent create optimized LinkedIn
          posts, Twitter threads, and blog articles tailored to your brand's
          unique voice.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href={userId ? "/dashboard" : "/sign-up"}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md shadow-blue-200 text-center"
          >
            Start Generating Free
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm text-center"
          >
            Learn More
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <section id="features" className="w-full pt-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950">
              Supercharge Your Content Workflow
            </h2>
            <p className="text-sm text-gray-500">
              Everything you need to automate corporate copywriting and social
              presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                🧠
              </div>
              <h3 className="font-bold text-gray-950 text-lg">
                Advanced Gemini Models
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Powered by Google's cutting-edge LLMs to produce highly
                contextual, creative, and human-like text drafts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-xl">
                ⚙️
              </div>
              <h3 className="font-bold text-gray-950 text-lg">
                Custom Tone & Strategy
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fine-tune outputs by selecting specific parameters like
                Professional, Witty, or Casual tones across multiple languages.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-xl">
                💾
              </div>
              <h3 className="font-bold text-gray-950 text-lg">
                Cloud Sync & History
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your generations are instantly backed up to our secured Neon
                PostgreSQL database. Search, preview, or delete anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-24 py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} GenContent SaaS. Built with Next.js App
        Router and Prisma.
      </footer>
    </div>
  );
}
