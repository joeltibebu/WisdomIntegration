export const dynamic = "force-dynamic";
import { CreateUserForm } from "@/components/CreateUserForm";

export default async function NewUserPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Create New User</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Provision a new account and assign a role.
          </p>
        </div>
        <CreateUserForm />
      </div>
    </>
  );
}
