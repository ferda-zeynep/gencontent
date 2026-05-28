"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface HistoryItem {
  id: string;
  title: string;
  prompt: string;
  response: string;
  contentType: string;
  tone: string;
  language: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/history");
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        }
      } catch (err) {
        console.error("Failed to load history data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the row click/modal event
    if (!confirm("Are you sure you want to delete this content permanently?"))
      return;

    try {
      const res = await fetch(`/api/history/${id}`, { method: "DELETE" });
      if (res.ok) {
        setHistory(history.filter((item) => item.id !== id));
        if (selectedItem?.id === id) setSelectedItem(null);
      }
    } catch (err) {
      console.error("Delete operation failed:", err);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.contentType === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500 text-sm font-medium animate-pulse">
          Loading history data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
          Content History
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Search, preview, and manage your previously generated AI contents.
        </p>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <input
          type="text"
          placeholder="Search by prompt or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2.5 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2.5 border border-gray-200 rounded-lg outline-none text-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="all">All Types</option>
          <option value="linkedin">LinkedIn Post</option>
          <option value="tweet">Twitter Thread</option>
          <option value="blog">Blog Article</option>
        </select>
      </div>

      {/* Data Table Grid */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-gray-400 text-sm font-medium">
            No contents match your filtering criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Prompt / Title</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Tone</th>
                  <th className="p-4">Lang</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-blue-50/20 transition cursor-pointer"
                  >
                    <td className="p-4 font-semibold text-gray-900 max-w-xs truncate">
                      {item.prompt}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 capitalize">
                        {item.contentType}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 capitalize">
                      {item.tone}
                    </td>
                    <td className="p-4 text-gray-500 uppercase">
                      {item.language}
                    </td>
                    <td className="p-4 text-gray-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="text-red-500 hover:text-red-700 font-bold text-xs px-2.5 py-1 rounded-md hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content Preview Modal (Detailed View) */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-900 truncate pr-4">
                {selectedItem.title}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(selectedItem.response)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    copied
                      ? "bg-green-50 text-green-700"
                      : "bg-white text-gray-700 border hover:bg-gray-50"
                  }`}
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold px-2 py-1 transition"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-gray-700">
              <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <strong>Original Prompt:</strong> {selectedItem.prompt}
              </div>
              <div className="prose prose-sm max-w-none leading-relaxed text-gray-800 pt-2">
                <ReactMarkdown>{selectedItem.response}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
