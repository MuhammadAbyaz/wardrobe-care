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
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
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
  pages: {
    signIn: "/auth/sign-in",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
