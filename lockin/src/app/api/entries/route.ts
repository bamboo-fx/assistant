import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Entry from "@/models/Entry";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  const date = searchParams.get("date");

  await dbConnect();

  const query: Record<string, unknown> = { userId };
  if (domain) query.domain = domain;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    query.createdAt = { $gte: start, $lt: end };
  }

  const entries = await Entry.find(query).sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json(entries);
}
