export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { ChildProfileForm } from "@/components/ChildProfileForm";

export default async function NewChildPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <DashboardShell role="PARENT" userName={session.user.name}>
      <div className="space-y-6 max-w-2xl">
        <div>
          <Link
            href="/dashboard/parent/children"
            className="text-sm text-wisdom-muted hover:text-wisdom-text transition-colors inline-flex items-center gap-1 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to My Children
          </Link>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Add a Child Profile</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Fill in your child&apos;s details so our team can provide the best care.
          </p>
        </div>
        <ChildProfileForm />
      </div>
    </DashboardShell>
  );
}

