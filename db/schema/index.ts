import { EXPENSE_CATEGORY } from "@/constants";
import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// ----------------- Groups ----------------
export const groups = sqliteTable("groups", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(usersToGroups),
  expenses: many(expenses),
}));

export type Group = typeof groups.$inferSelect;

// ---------------------------------------

// ----------------- Users -----------------
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(usersToGroups),
  expenses: many(expensesToUsers),
}));

export type User = typeof users.$inferSelect;

// ---------------------------------------

// ----------------- UsersToGroups -----------------
export const usersToGroups = sqliteTable(
  "users_to_groups",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.groupId] })],
);

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
}));

export type UsersToGroups = typeof usersToGroups.$inferSelect;

// ---------------------------------------

// ----------------- Expenses -----------------
export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey(),
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  date: integer("date").notNull(),
  category: text("category", {
    enum: Object.keys(EXPENSE_CATEGORY) as [string, ...string[]],
  })
    .notNull()
    .default("other"),
  groupId: text("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
  payerId: text("payer_id")
    .notNull()
    .references(() => users.id),
});

export const expensesRelations = relations(expenses, ({ one, many }) => ({
  group: one(groups, {
    fields: [expenses.id],
    references: [groups.id],
  }),
  payer: one(users, {
    fields: [expenses.payerId],
    references: [users.id],
  }),
  participants: many(expensesToUsers),
}));

export type Expense = typeof expenses.$inferSelect & {
  category: keyof typeof EXPENSE_CATEGORY;
};

// ---------------------------------------

export const expensesToUsers = sqliteTable(
  "expenses_to_users",
  {
    expenseId: text("expense_id")
      .notNull()
      .references(() => expenses.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.expenseId, t.userId] })],
);

export const expensesToUsersRelations = relations(
  expensesToUsers,
  ({ one }) => ({
    expense: one(expenses, {
      fields: [expensesToUsers.expenseId],
      references: [expenses.id],
    }),
    user: one(users, {
      fields: [expensesToUsers.userId],
      references: [users.id],
    }),
  }),
);

export type ExpensesToParticipants = typeof expensesToUsers.$inferSelect;

// ---------------------------------------
