export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { CreateUserForm } from "@/components/CreateUserForm";

export default async function NewUserPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Create New User</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Provision a new account and assign a role.
          </p>
        </div>
        <CreateUserForm />
      </div>
    </DashboardShell>
  );
}

