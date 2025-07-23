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


export const createProductSchema = createInsertSchema(productsTable)

export const updateProductSchema = createInsertSchema(productsTable).partial()