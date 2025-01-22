import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/ProfileForm";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/");
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm session={session} />
    </div>
  );
}
