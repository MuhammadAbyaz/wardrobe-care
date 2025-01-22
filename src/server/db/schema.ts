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
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `wardrobe-care_${name}`);

export const ROLE = pgEnum("role", ["USER", "ADMIN", "NGO"]);
export const STATUS = pgEnum("status", ["PENDING", "VERIFIED", "IN PROGRESS"]);
export const DONATION_TYPE = pgEnum("donation_type", ["DONATION", "DISPOSAL"]);
export const ITEM_CONDITION = pgEnum("item_condition", [
  "GOOD",
  "NORMAL",
  "BAD",
]);
export const DONATION_STATUS = pgEnum("donation_status", [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "DELIVERED",
]);

export const ngo = createTable("ngo", {
  id: varchar("id", { length: 255 })
    .notNull()
    .unique()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  status: STATUS("status").default("IN PROGRESS").notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull().unique(),
  headOfficeAddress: varchar("head_office_address", { length: 255 }).notNull(),
  website: varchar("website", { length: 255 }).notNull(),
  bio: text("bio").notNull(),
  proofOfRegistrationUrl: text("proof_of_registration_url").notNull(),
  taxExemptionCertificateUrl: text("tax_exemption_certificate_url").notNull(),
  registrationId: varchar("registration_id", { length: 255 })
    .references(() => userNgo.regId)
    .notNull()
    .unique(),
});

export const ngoRelation = relations(ngo, ({ one, many }) => ({
  userNgo: one(userNgo, {
    fields: [ngo.registrationId],
    references: [userNgo.regId],
  }),
  donations: many(donations),
}));

export const userNgo = createTable("user_ngo", {
  regId: varchar("reg_id", { length: 255 }).notNull().unique().primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
});

export const userNgoRelation = relations(userNgo, ({ one }) => ({
  users: one(users, {
    fields: [userNgo.userId],
    references: [users.id],
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
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  donations: many(donations),
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
  }),
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
  }),
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
  }),
);

export const donations = createTable("donation", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  ngoId: varchar("ngo_id", { length: 255 }).references(() => userNgo.userId),
  donationType: DONATION_TYPE("donation_type").notNull(),
  item: varchar("item", { length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
  pickupLocation: varchar("pickup_location", { length: 255 }).notNull(),
  itemCondition: ITEM_CONDITION("item_condition").notNull(),
  pickupDateTime: timestamp("pickup_date_time", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  additionalNotes: text("additional_notes"),
  status: DONATION_STATUS("status").default("PENDING").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const donationsRelations = relations(donations, ({ one }) => ({
  user: one(users, { fields: [donations.userId], references: [users.id] }),
  userNgo: one(userNgo, {
    fields: [donations.ngoId],
    references: [userNgo.userId],
  }),
}));
