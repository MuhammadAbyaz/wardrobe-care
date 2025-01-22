"use server";

import { eq } from "drizzle-orm";
import { auth } from "../auth";
import { db } from "../db";
import { users, wardrobeCareNgo } from "../db/schema";

export const ngoRegistration = async (data) => {
  const session = await auth();
  if (!session) {
    return;
  }
  const ngoArr = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user.id.toString()))
    .limit(1);
  const regNumber = ngoArr[0]?.registrationNumber as string;
  return await db
    .insert(wardrobeCareNgo)
    .values({
      contactPerson: data.contactPerson,
      headOfficeAddress: data.headOfficeAddress,
      website: data.website,
      bio: data.bio,
      proofOfRegistrationUrl: data.regProofFilePath,
      taxExemptionCertificateUrl: data.taxFilePath,
      registrationId: regNumber,
    })
    .returning();
};
