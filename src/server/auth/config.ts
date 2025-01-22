import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type User, type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { and, eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const user = await db
          .select()
          .from(users)
          .where(and(eq(users.email, credentials.email.toString())))
          .limit(1);

        if (user.length === 0) {
          return null;
        }

        const userRecord = user[0];
        if (!userRecord?.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password.toString(),
          userRecord.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: userRecord.id.toString(),
          email: userRecord.email,
          name: userRecord.name,
          role: userRecord.role,
        } as User;
      },
    }),
    Google,
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
