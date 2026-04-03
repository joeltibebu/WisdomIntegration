import { prisma } from "@/lib/prisma";
import { TypographyForm } from "@/components/admin/TypographyForm";

export const dynamic = "force-dynamic";

export default async function AppearancePage() {
  let typo = {
    headingFont: "Poppins",
    bodyFont: "Inter",
    fontScale: "md",
    headingWeight: "700",
    lineHeight: "normal",
  };

  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: "typography" } });
    if (setting?.value && typeof setting.value === "object") {
      typo = { ...typo, ...(setting.value as Record<string, string>) };
    }
  } catch { /* use defaults */ }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">Appearance</h2>
        <p className="text-slate-500 text-sm max-w-2xl">
          Manage site typography. Changes apply globally to the public site after saving.
        </p>
      </div>
      <TypographyForm defaultValues={typo} />
    </div>
  );
}
