"use client";

import Link from "next/link";

const DOMAIN_CONFIG = {
  gym: { icon: "🏋️", description: "Track workouts & get coaching" },
  business: { icon: "💼", description: "Document your entrepreneurial journey" },
  reading: { icon: "📚", description: "Log books & discuss ideas" },
  "self-improvement": { icon: "🧠", description: "Habits, reflections & growth" },
};

export default function DomainCard({ domain }: { domain: keyof typeof DOMAIN_CONFIG }) {
  const config = DOMAIN_CONFIG[domain];

  return (
    <Link href={`/${domain}`}>
      <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-accent/40 hover:-translate-y-0.5 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="text-3xl mb-3">{config.icon}</div>
          <h3 className="text-lg font-semibold capitalize font-[var(--font-display)]">{domain}</h3>
          <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
        </div>
      </div>
    </Link>
  );
}
