import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { groups } from "./groups";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  groupId: text("group_id").references(() => groups.id),
});

export type User = typeof users.$inferSelect;
