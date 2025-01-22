"use server";

import { eq, sql } from "drizzle-orm";
import { auth } from "../auth";
import { db } from "../db";
import { donations, ngo, userNgo, users } from "../db/schema";
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

  if (status === "DELIVERED") {
    // increment reward points of user by 100
    await db
      .update(users)
      .set({ rewardPoints: sql`${users.rewardPoints} + 100` })
      .where(eq(users.id, data[0]?.userId ?? ""));
  }

  revalidatePath("/ngo/dashboard");
  return data;
};

export const fetchStats = async (ngoId: string) => {
  const currentDate = new Date();
  const lastMonth = new Date(
    currentDate.setMonth(currentDate.getMonth() - 1),
  ).toISOString();
  const twoMonthsAgo = new Date(
    currentDate.setMonth(currentDate.getMonth() - 1),
  ).toISOString();

  // Current month donations
  const [currentMonthDonations] = await db
    .select({ count: sql`count(*)` })
    .from(donations)
    .where(
      sql`${donations.ngoId} = ${ngoId} AND ${donations.createdAt} >= ${lastMonth}`,
    );

  // Last month donations for change calculation
  const [lastMonthDonations] = await db
    .select({ count: sql`count(*)` })
    .from(donations)
    .where(
      sql`${donations.ngoId} = ${ngoId} AND
            ${donations.createdAt} >= ${twoMonthsAgo} AND
            ${donations.createdAt} < ${lastMonth}`,
    );

  // Current month active disposals
  const [currentDisposals] = await db
    .select({ count: sql`count(*)` })
    .from(donations)
    .where(
      sql`${donations.ngoId} = ${ngoId} AND
            ${donations.donationType} = 'DISPOSAL' AND
            ${donations.status} != 'DELIVERED' AND
            ${donations.createdAt} >= ${lastMonth}`,
    );

  // Last month disposals for change calculation
  const [lastMonthDisposals] = await db
    .select({ count: sql`count(*)` })
    .from(donations)
    .where(
      sql`${donations.ngoId} = ${ngoId} AND
            ${donations.donationType} = 'DISPOSAL' AND
            ${donations.status} != 'DELIVERED' AND
            ${donations.createdAt} >= ${twoMonthsAgo} AND
            ${donations.createdAt} < ${lastMonth}`,
    );

  // Current month quantity and reward points
  const [totalStats] = await db
    .select({
      quantity: sql`sum(quantity)`,
      rewardPoints: sql`sum(CASE WHEN status = 'DELIVERED' THEN 100 ELSE 0 END)`,
    })
    .from(donations)
    .where(
      sql`${donations.ngoId} = ${ngoId} AND ${donations.createdAt} >= ${lastMonth}`,
    );

  // Last month quantity and reward points for change calculation
  const [lastMonthStats] = await db
    .select({
      quantity: sql`sum(quantity)`,
      rewardPoints: sql`sum(CASE WHEN status = 'DELIVERED' THEN 100 ELSE 0 END)`,
    })
    .from(donations)
    .where(
      sql`${donations.ngoId} = ${ngoId} AND
            ${donations.createdAt} >= ${twoMonthsAgo} AND
            ${donations.createdAt} < ${lastMonth}`,
    );

  const currentMonthQuantity = Number(totalStats?.quantity) || 0;
  const currentMonthRewardPoints = Number(totalStats?.rewardPoints) || 0;
  const lastMonthRewardPoints = Number(lastMonthStats?.rewardPoints) || 0;

  return [
    {
      title: "Total Donations",
      value: currentMonthDonations?.count?.toString() || "0",
      change: `${Number(currentMonthDonations?.count || 0) - Number(lastMonthDonations?.count || 0)} from last month`,
      variant: "blue",
    },
    {
      title: "Active Disposals",
      value: currentDisposals?.count?.toString() || "0",
      change: `${Number(currentDisposals?.count || 0) - Number(lastMonthDisposals?.count || 0)} from last month`,
      variant: "purple",
    },
    {
      title: "Reward Points",
      value: currentMonthRewardPoints.toLocaleString(),
      change: `+${(currentMonthRewardPoints - lastMonthRewardPoints).toLocaleString()} from last month`,
      variant: "emerald",
    },
    {
      title: "Monthly Impact",
      value: `${currentMonthQuantity} items`,
      change: `Saved ${(currentMonthQuantity * 3).toFixed(0)}kg CO2`,
      variant: "yellow",
    },
  ];
};
