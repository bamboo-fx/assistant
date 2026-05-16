import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Entry from "@/models/Entry";
import Insight from "@/models/Insight";
import { generateInsight } from "@/lib/ai";
import { Domain } from "@/models/Entry";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { domain = "all" } = await req.json();

  await dbConnect();

  const query: Record<string, unknown> = { userId, role: "user" };
  if (domain !== "all") query.domain = domain;

  const entries = await Entry.find(query)
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  if (entries.length === 0) {
    return NextResponse.json({ error: "No entries to analyze" }, { status: 400 });
  }

  const content = await generateInsight(
    domain as Domain | "all",
    entries.map((e) => ({
      content: e.content,
      createdAt: e.createdAt,
      domain: e.domain,
    }))
  );

  const insight = await Insight.create({
    userId,
    domain,
    type: "on-demand",
    content,
  });

  return NextResponse.json(insight);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  await dbConnect();

  const insights = await Insight.find({ userId }).sort({ createdAt: -1 }).limit(20).lean();
  return NextResponse.json(insights);
}
