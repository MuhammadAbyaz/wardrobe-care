"use server";

import { signIn } from ".";

export const signInAction = async () => {
  "use server";
  await signIn("google");
};
