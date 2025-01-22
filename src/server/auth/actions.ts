"use server";

import { and, eq } from "drizzle-orm";
import { signIn, signOut } from ".";
import { db } from "../db";
import { userNgo, users } from "../db/schema";
import { hash } from "bcryptjs";

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/user" });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

export const signInWithCreds = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res: unknown = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      return { success: false, error: res.error };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Sign in error" };
  }
};

export const signUp = async (params: AuthCreds) => {
  const { fullname, email, password, role } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    const user = await db
      .insert(users)
      .values({
        name: fullname,
        email,
        password: hashedPassword,
        role,
      })
      .returning();

    await signInWithCreds({ email, password });
    return { success: true, user: user[0] };
  } catch (error) {
    console.log(error, "Sign up error");
    return { success: false, error: "Sign up error" };
  }
};

export const ngoSignUp = async (params: NGOAuthCreds) => {
  const { orgname, email, password, role, registrationnumber } = params;
  const existingUser = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email)))
    .limit(1);
  if (existingUser.length > 0) {
    return { success: false, error: "NGO already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    const user = await db
      .insert(users)
      .values({
        name: orgname,
        email,
        password: hashedPassword,
        role,
      })
      .returning();
    if (user.length === 0 || !user[0]) {
      return { success: false, error: "User creation failed" };
    }
    const ngoUser = await db
      .insert(userNgo)
      .values({
        regId: registrationnumber,
        userId: user[0].id,
      })
      .returning();
    if (ngoUser.length === 0 || !ngoUser[0]) {
      return { success: false, error: "NGO creation failed" };
    }
    await signInWithCreds({ email, password });
    return { success: true, user: ngoUser[0] };
  } catch (error) {
    console.log(error, "Sign up error");
    return { success: false, error: "Sign up error" };
  }
};
