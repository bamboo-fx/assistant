import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Entry from "@/models/Entry";
import { chat } from "@/lib/ai";
import { Domain } from "@/models/Entry";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { domain, message } = await req.json();
  const userId = (session.user as { id: string }).id;

  if (!domain || !message) {
    return NextResponse.json({ error: "Domain and message required" }, { status: 400 });
  }

  await dbConnect();

  // Get recent history for context
  const history = await Entry.find({ userId, domain })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const formattedHistory = history
    .reverse()
    .map((e) => ({ role: e.role as "user" | "assistant", content: e.content }));

  // Get AI response
  const aiResponse = await chat(domain as Domain, message, formattedHistory);

  // Save both messages
  await Entry.create([
    { userId, domain, role: "user", content: message },
    { userId, domain, role: "assistant", content: aiResponse },
  ]);

  return NextResponse.json({ response: aiResponse });
}
