import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { pgTable, unique, foreignKey } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `wardrobe-care_${name}`);

export const ROLE = pgEnum("role", ["USER", "ADMIN", "NGO"]);
export const STATUS = pgEnum("status", ["PENDING", "VERIFIED", "IN PROGRESS"]);
export const wardrobeCareNgo = pgTable(
  "wardrobe-care_ngo",
  {
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    status: STATUS("status").default("IN PROGRESS"),
    contactPerson: varchar("contact_person").default("").notNull(),
    headOfficeAddress: varchar("head_office_address").notNull(),
    website: varchar("website").notNull(),
    bio: varchar("bio").notNull(),
    proofOfRegistrationUrl: varchar("proof_of_registration_url").notNull(),
    registrationId: varchar("registration_id").primaryKey().notNull(),
    taxExemptionCertificateUrl: varchar(
      "tax_exemption_certificate_url",
    ).notNull(),
  },
  (table) => {
    return {
      wardrobeCareNgoRegistrationIdFkey: foreignKey({
        columns: [table.registrationId],
        foreignColumns: [users.registrationNumber],
        name: "wardrobe-care_ngo_registration_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
      wardrobeCareNgoWebsiteKey: unique("wardrobe-care_ngo_website_key").on(
        table.website,
      ),
      wardrobeCareNgoProofOfRegistrationUrlKey: unique(
        "wardrobe-care_ngo_proof_of_registration_url_key",
      ).on(table.proofOfRegistrationUrl),
      wardrobeCareNgoRegistrationIdKey: unique(
        "wardrobe-care_ngo_registration_id_key",
      ).on(table.registrationId),
      wardrobeCareNgoTaxExemptionCertificateUrlKey: unique(
        "wardrobe-care_ngo_tax_exemption_certificate_url_key",
      ).on(table.taxExemptionCertificateUrl),
    };
  },
);

export const wardrobeCareNgoRelations = relations(wardrobeCareNgo, ({ one }) => ({
  users: one(users, {
    fields: [wardrobeCareNgo.registrationId],
    references: [users.registrationNumber],
  }),
}));

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }),
  role: ROLE("role").default("USER"),
  registrationNumber: varchar("registration_number", { length: 255 })
    .unique()
    .notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));
export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
