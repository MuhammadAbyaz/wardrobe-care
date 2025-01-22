"use server";

import { DonationFormValues } from "@/components/DonationForm";
import { auth } from "../auth";
import { db } from "../db";
import { donations } from "../db/schema";

export const addDonation = async (data: DonationFormValues) => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  return await db
    .insert(donations)
    .values({
      userId: session?.user?.id,
      ngoId: data.ngoId,
      donationType: data.donationType,
      item: data.itemDescription,
      quantity: data.quantity,
      pickupLocation: data.location,
      itemCondition: data.itemCondition,
      pickupDateTime: data.pickupDate,
      additionalNotes: data.notes,
    })
    .returning();
};
