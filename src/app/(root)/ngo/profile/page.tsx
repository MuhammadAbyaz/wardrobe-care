import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/ProfileForm";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { ngo, userNgo } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/");
  }
  const ngoIntermediate = await db
    .select()
    .from(userNgo)
    .where(eq(userNgo.userId, session?.user.id.toString()))
    .limit(1);
  if (!ngoIntermediate[0]?.regId) {
    redirect("/auth/sign-up");
  }
  const ngoDetail = await db
    .select()
    .from(ngo)
    .where(eq(ngo.registrationId, ngoIntermediate[0]?.regId))
    .limit(1);

  const notRegistered =
    !ngoDetail[0]?.status || ngoDetail[0]?.status === "IN PROGRESS";

  return notRegistered ? (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm session={session} />
    </div>
  ) : (
    <div className="mx-auto flex h-96 w-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Profile under review</h2>
        <p className="text-sm text-muted-foreground">
          Your profile is under review. You will be notified once it is
          approved.
        </p>
      </div>
    </div>
  );
}
