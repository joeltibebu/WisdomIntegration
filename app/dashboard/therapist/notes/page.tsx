export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { SessionNoteForm } from "@/components/SessionNoteForm";

interface NotesPageProps {
  searchParams: { childId?: string };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "THERAPIST") redirect("/auth/login");

  const { childId } = searchParams;

  // If no childId, show child selector
  if (!childId) {
    const children = await prisma.childProfile.findMany({
      where: { therapistId: session.user.id },
      orderBy: { name: "asc" },
    });

    return (
      <DashboardShell role="THERAPIST" userName={session.user.name}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Session Notes</h1>
            <p className="text-sm text-wisdom-muted mt-1">Select a child to view and add session notes.</p>
          </div>

          {children.length === 0 ? (
            <Card>
              <p className="text-sm text-wisdom-muted text-center py-8">
                No children assigned to you yet.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child: (typeof children)[number]) => (
                <Link
                  key={child.id}
                  href={`/dashboard/therapist/notes?childId=${child.id}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded-card"
                >
                  <Card className="hover:border-wisdom-blue transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <p className="font-semibold text-wisdom-text">{child.name}</p>
                      <p className="text-sm text-wisdom-blue">View session notes →</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DashboardShell>
    );
  }

  // Fetch child, sessions without notes, and existing notes
  const child = await prisma.childProfile.findFirst({
    where: { id: childId, therapistId: session.user.id },
  });

  if (!child) redirect("/dashboard/therapist/notes");

  const [sessionsWithoutNotes, existingNotes] = await Promise.all([
    prisma.session.findMany({
      where: {
        childId,
        therapistId: session.user.id,
        note: null,
      },
      orderBy: { scheduledAt: "desc" },
    }),
    prisma.sessionNote.findMany({
      where: { childId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <DashboardShell role="THERAPIST" userName={session.user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/dashboard/therapist/notes"
                className="text-sm text-wisdom-muted hover:text-wisdom-blue focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
              >
                ← All Children
              </Link>
            </div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">
              Session Notes — {child.name}
            </h1>
          </div>
        </div>

        {/* Existing notes */}
        <section aria-labelledby="existing-notes-heading">
          <h2
            id="existing-notes-heading"
            className="text-lg font-heading font-semibold text-wisdom-text mb-3"
          >
            Existing Notes
          </h2>
          {existingNotes.length === 0 ? (
            <Card>
              <p className="text-sm text-wisdom-muted text-center py-6">No notes yet for this child.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {existingNotes.map((note: (typeof existingNotes)[number]) => (
                <Card key={note.id}>
                  <div className="space-y-2">
                    <time
                      dateTime={note.createdAt.toISOString()}
                      className="text-xs text-wisdom-muted"
                    >
                      {note.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <p className="text-sm text-wisdom-text whitespace-pre-wrap">{note.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Add new note */}
        <section aria-labelledby="add-note-heading">
          <h2
            id="add-note-heading"
            className="text-lg font-heading font-semibold text-wisdom-text mb-3"
          >
            Add Session Note
          </h2>
          <Card>
            <SessionNoteForm
              childId={childId}
              sessions={sessionsWithoutNotes.map((s: (typeof sessionsWithoutNotes)[number]) => ({
                id: s.id,
                scheduledAt: s.scheduledAt,
                serviceType: s.serviceType,
              }))}
            />
          </Card>
        </section>
      </div>
    </DashboardShell>
  );
}

