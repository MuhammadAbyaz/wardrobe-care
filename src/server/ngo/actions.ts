"use server";

import { eq } from "drizzle-orm";
import { auth } from "../auth";
import { db } from "../db";
import { donations, ngo, userNgo } from "../db/schema";
import { revalidatePath } from "next/cache";

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
      status: "PENDING",
    })
    .returning();
};

export const updateDonationStatus = async ({ donationId, status }) => {
  const data = await db
    .update(donations)
    .set({ status: status })
    .where(eq(donations.id, donationId))
    .returning();
  revalidatePath("/ngo/dashboard");
  return data;
};
