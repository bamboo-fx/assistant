import Anthropic from "@anthropic-ai/sdk";
import { Domain } from "@/models/Entry";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const DOMAIN_PROMPTS: Record<Domain, string> = {
  gym: `You are a knowledgeable fitness coach and accountability partner. You help track workouts, give exercise advice, monitor progress, and keep the user motivated. You remember past sessions and reference them. Be encouraging but honest. Ask follow-up questions about form, recovery, nutrition when relevant.`,

  business: `You are a sharp entrepreneurial advisor and accountability partner. You help document the business journey, identify bottlenecks, suggest strategies, and keep focus on high-leverage activities. Reference past entries to spot patterns. Be direct and actionable.`,

  reading: `You are a thoughtful reading companion and accountability partner. You help track books being read, discuss ideas and takeaways, suggest connections between books, and encourage consistent reading habits. Reference past reading notes when relevant.`,

  "self-improvement": `You are a wise personal development coach and accountability partner. You help track habits, reflect on growth, identify areas for improvement, and maintain momentum. Be supportive but push for honest self-reflection. Connect patterns across entries.`,
};

export async function chat(
  domain: Domain,
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[]
) {
  const systemPrompt = `${DOMAIN_PROMPTS[domain]}

You have access to the user's conversation history in this domain. Use it to provide personalized, context-aware responses. Reference specific past entries when relevant. Today's date is ${new Date().toLocaleDateString()}.`;

  const messages = [
    ...history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user" as const, content: userMessage },
  ];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "";
}

export async function generateInsight(
  domain: Domain | "all",
  entries: { content: string; createdAt: Date; domain: string }[]
) {
  const entrySummary = entries
    .map((e) => `[${e.createdAt.toLocaleDateString()} - ${e.domain}]: ${e.content}`)
    .join("\n");

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    system: `You are an insightful analyst reviewing a user's journal entries. Identify patterns, bottlenecks, wins, and actionable recommendations. Be specific and reference actual entries.`,
    messages: [
      {
        role: "user",
        content: `Here are my recent entries${domain !== "all" ? ` for ${domain}` : " across all domains"}:\n\n${entrySummary}\n\nWhat patterns do you see? What are my bottlenecks? What insights can you give me?`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "";
}
