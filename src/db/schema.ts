import {
  integer,
  pgTable,
  uuid,
  varchar,
  text,
  doublePrecision,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  status: varchar({ length: 50 }).notNull().default('New'),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
})

export const orderItemsTable = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
})

export const createProductSchema = createInsertSchema(productsTable)

export const updateProductSchema = createInsertSchema(productsTable).partial()

export const createUserSchema = createInsertSchema(usersTable).omit({role: true})

export const insertOrderSchema = createInsertSchema(ordersTable).omit({userId: true, status: true, createdAt: true})

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({ orderId: true })

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
})

export const loginSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
})