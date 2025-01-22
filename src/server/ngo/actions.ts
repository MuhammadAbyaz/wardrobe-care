"use server";

import { eq } from "drizzle-orm";
import { auth } from "../auth";
import { db } from "../db";
import { ngo, userNgo } from "../db/schema";

export const ngoRegistration = async (data) => {
  const session = await auth();
  if (!session) {
    return;
  }
  const ngoArr = await db
    .select()
    .from(userNgo)
    .where(eq(userNgo.userId, session?.user.id.toString()))
    .limit(1);

  const regNumber = ngoArr[0]?.regId;
  return await db
    .insert(ngo)
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
