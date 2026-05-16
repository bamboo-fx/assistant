"use client";

import { useState } from "react";
import Link from "next/link";

export default function InsightsPage() {
  const [domain, setDomain] = useState("all");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateInsight() {
    setLoading(true);
    setInsight("");

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });

      if (res.ok) {
        const data = await res.json();
        setInsight(data.content);
      } else {
        const data = await res.json();
        setInsight(data.error || "Failed to generate insights");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6 animate-[fade-in_0.5s_ease-out]">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold font-[var(--font-display)] text-foreground">Insights</h1>
        </div>

        <div className="rounded-lg border border-border bg-card shadow-sm p-6 animate-[fade-in_0.5s_ease-out]">
          <p className="text-muted-foreground text-sm mb-4">
            Generate AI-powered insights from your journal entries. The agent will analyze
            patterns, identify bottlenecks, and surface actionable recommendations.
          </p>

          <div className="flex gap-3 mb-6">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Domains</option>
              <option value="gym">Gym</option>
              <option value="business">Business</option>
              <option value="reading">Reading</option>
              <option value="self-improvement">Self Improvement</option>
            </select>
            <button
              onClick={generateInsight}
              disabled={loading}
              className="glass-button px-5 h-9 bg-accent text-accent-foreground rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {loading ? "Analyzing..." : "Generate"}
            </button>
          </div>

          {insight && (
            <div className="p-4 rounded-md bg-secondary border border-border animate-[fade-in_0.3s_ease-out]">
              <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                {insight}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
