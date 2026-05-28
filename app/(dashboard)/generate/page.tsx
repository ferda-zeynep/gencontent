"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("linkedin");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, contentType, tone, language }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      setResult(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
          Generate AI Content
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Select your preferences and let the AI draft high-converting copy for
          you.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"
      >
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            What do you want to generate?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-700 bg-gray-50/50"
            rows={4}
            placeholder="Describe your content requirements, target audience, or specific keywords..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Content Type
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg outline-none bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="linkedin">LinkedIn Post</option>
              <option value="tweet">Twitter Thread</option>
              <option value="blog">Blog Article</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg outline-none bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="professional">Professional</option>
              <option value="witty">Witty & Humorous</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg outline-none bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="en">English</option>
              <option value="tr">Turkish</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3.5 rounded-lg transition disabled:bg-blue-400 disabled:cursor-not-allowed shadow-sm shadow-blue-200"
        >
          {loading ? "Generating Output..." : "Generate Content"}
        </button>
      </form>

      {/* Output Polish Card */}
      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-base font-bold text-gray-900">
              Generated Output
            </h2>
            <button
              onClick={copyToClipboard}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                copied
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {copied ? "✓ Copied!" : "Copy Content"}
            </button>
          </div>
          <div className="p-6 text-gray-800 bg-white">
            <div className="prose max-w-none text-gray-700 space-y-4 leading-relaxed">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
