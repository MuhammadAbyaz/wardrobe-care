"use server";

import { DonationFormValues } from "@/components/DonationForm";
import { auth } from "../auth";
import { db } from "../db";
import { donations } from "../db/schema";
import { and, eq, sql } from "drizzle-orm";

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

export const fetchStats = async (userId: string) => {
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
      sql`${donations.userId} = ${userId} AND ${donations.createdAt} >= ${lastMonth}`,
    );

  // Last month donations for change calculation
  const [lastMonthDonations] = await db
    .select({ count: sql`count(*)` })
    .from(donations)
    .where(
      sql`${donations.userId} = ${userId} AND
                        ${donations.createdAt} >= ${twoMonthsAgo} AND
                        ${donations.createdAt} < ${lastMonth}`,
    );

  // Current month active disposals
  const [currentDisposals] = await db
    .select({ count: sql`count(*)` })
    .from(donations)
    .where(
      sql`${donations.userId} = ${userId} AND
                        ${donations.donationType} = 'DISPOSAL' AND
                        ${donations.status} != 'DELIVERED' AND
                        ${donations.createdAt} >= ${lastMonth}`,
    );

  // Last month disposals for change calculation
  const [lastMonthDisposals] = await db
    .select({ count: sql`count(*)` })
    .from(donations)
    .where(
      sql`${donations.userId} = ${userId} AND
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
      sql`${donations.userId} = ${userId} AND ${donations.createdAt} >= ${lastMonth}`,
    );

  // Last month quantity and reward points for change calculation
  const [lastMonthStats] = await db
    .select({
      quantity: sql`sum(quantity)`,
      rewardPoints: sql`sum(CASE WHEN status = 'DELIVERED' THEN 100 ELSE 0 END)`,
    })
    .from(donations)
    .where(
      sql`${donations.userId} = ${userId} AND
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
