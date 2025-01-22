"use server";

import { auth } from "../auth";

export const addDonation = async (data) => {
  const session = await auth();

  return;
};
