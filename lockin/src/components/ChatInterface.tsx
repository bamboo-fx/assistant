"use client";

import { useState, useRef, useEffect } from "react";
import { Domain } from "@/models/Entry";

interface Message {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export default function ChatInterface({ domain }: { domain: Domain }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory();
  }, [domain]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchHistory() {
    const res = await fetch(`/api/entries?domain=${domain}`);
    if (res.ok) {
      const entries = await res.json();
      setMessages(entries.reverse());
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, message: userMessage }),
      });

      if (res.ok) {
        const { response } = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20 animate-[fade-in_0.5s_ease-out]">
            <p className="text-lg font-semibold font-[var(--font-display)]">
              Start your {domain} journal
            </p>
            <p className="text-sm mt-2">Tell me about your day. I&apos;ll remember everything.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-[fade-in_0.3s_ease-out]`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-4 py-3 ${
                msg.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
              {msg.createdAt && (
                <p className="text-xs mt-1 opacity-60">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-[fade-in_0.3s_ease-out]">
            <div className="bg-secondary rounded-lg px-4 py-3">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="border-t border-border p-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Update your ${domain} journal...`}
          className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="glass-button bg-accent text-accent-foreground px-5 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}
