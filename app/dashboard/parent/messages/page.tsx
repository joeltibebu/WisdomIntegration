import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { MessageForm } from "@/components/MessageForm";

type MessageItem = {
  id: string;
  content: string;
  createdAt: Date;
};

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "PARENT") redirect("/auth/login");

  const messages = await prisma.message.findMany({
    where: { senderId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell role="PARENT" userName={session.user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Messages</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Send messages to the center and view your message history.
          </p>
        </div>

        {/* Sent messages thread */}
        <section aria-labelledby="messages-heading">
          <h2
            id="messages-heading"
            className="text-lg font-heading font-semibold text-wisdom-text mb-4"
          >
            Sent Messages
          </h2>

          {messages.length === 0 ? (
            <Card>
              <p className="text-sm text-wisdom-muted text-center py-8">
                No messages yet. Send your first message below.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {messages.map((msg: MessageItem) => (
                <Card key={msg.id}>
                  <div className="space-y-1.5">
                    <time
                      dateTime={msg.createdAt.toISOString()}
                      className="text-xs text-wisdom-muted"
                    >
                      {msg.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {msg.createdAt.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </time>
                    <p className="text-sm text-wisdom-text">{msg.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Compose */}
        <section aria-labelledby="compose-heading">
          <h2
            id="compose-heading"
            className="text-lg font-heading font-semibold text-wisdom-text mb-4"
          >
            Send a Message
          </h2>
          <Card>
            <MessageForm />
          </Card>
        </section>
      </div>
    </DashboardShell>
  );
}
