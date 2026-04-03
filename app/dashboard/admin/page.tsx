import { redirect } from "next/navigation";

// Redirect old dashboard admin entry point to the unified admin panel
export default function DashboardAdminRedirect() {
  redirect("/admin");
}
