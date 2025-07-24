import {
  integer,
  pgTable,
  uuid,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text(),
  image: varchar("image", { length: 255 }),
  price: doublePrecision("price").notNull(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar({length: 255}).notNull().unique(),
  password: varchar({length: 255}).notNull(),
  role: varchar({length: 255}).notNull().default('user'),

  name: varchar({length: 255}),
  address: text()
})

export const createProductSchema = createInsertSchema(productsTable)

export const updateProductSchema = createInsertSchema(productsTable).partial()

export const createUserSchema = createInsertSchema(usersTable).omit({role: true})

export const loginSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
})