/**
 * Table definitions live here.
 *
 * This file is intentionally empty in the starter — no entity exists yet.
 * As the project grows, split this into a `database/schema/` folder:
 *
 *   database/schema/users.schema.ts
 *   database/schema/products.schema.ts
 *   database/schema/index.ts   (re-exports everything)
 *
 * and point drizzle.config.ts + client.ts at `./schema/index.ts` instead.
 *
 * Example of what a first table looks like, for reference:
 *
 *   import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
 *
 *   export const users = pgTable("users", {
 *     id: serial("id").primaryKey(),
 *     email: text("email").notNull().unique(),
 *     createdAt: timestamp("created_at").defaultNow().notNull(),
 *   });
 */

export {};
