import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DomainCard from "@/components/DomainCard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 animate-[fade-in_0.5s_ease-out]">
          <h1 className="text-3xl font-bold font-[var(--font-display)] text-foreground">
            Lock In, {session.user?.name?.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground mt-2">Your daily accountability dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fade-in_0.5s_ease-out]">
          <DomainCard domain="gym" />
          <DomainCard domain="business" />
          <DomainCard domain="reading" />
          <DomainCard domain="self-improvement" />
        </div>

        <div className="mt-10 p-6 rounded-lg border border-border bg-card shadow-sm animate-[fade-in_0.5s_ease-out]">
          <h2 className="text-lg font-semibold font-[var(--font-display)] text-foreground mb-3">
            Quick Actions
          </h2>
          <div className="flex gap-3 flex-wrap">
            <a
              href="/insights"
              className="glass-button inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium"
            >
              Generate Insights
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
