"use server";

import { signIn, signOut } from ".";

export const signInAction = async () => {
  await signIn("google");
};

export const signOutAction = async () => {
  await signOut();
};