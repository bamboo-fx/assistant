"use client";

import ChatInterface from "@/components/ChatInterface";
import Link from "next/link";

export default function GymPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6 animate-[fade-in_0.5s_ease-out]">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold font-[var(--font-display)] text-foreground">Gym</h1>
        </div>
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden animate-[fade-in_0.5s_ease-out]">
          <ChatInterface domain="gym" />
        </div>
      </div>
    </div>
  );
}
