import {
  Expense,
  expenses,
  expensesToUsers,
  User,
  users,
  usersToGroups,
} from "@/db/schema";
import { useDB, useLiveQuery } from "@/hooks/useDB";
import { eq } from "drizzle-orm";
import { useCallback, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export function useGroup(id: string) {
  const { db } = useDB();
  const { data, error: groupError } = useLiveQuery(
    db.query.groups.findFirst({
      where: (groups, { eq }) => eq(groups.id, id),
    }),
    [id],
  );

  const { data: members, error: membersError } = useLiveQuery(
    db.query.usersToGroups.findMany({
      with: {
        user: true,
      },
      where: (usersToGroups, { eq }) => eq(usersToGroups.groupId, id),
    }),
    [id],
  );

  const { data: expensesData, error: expensesError } = useLiveQuery(
    db.query.expenses.findMany({
      where: (expenses, { eq }) => eq(expenses.groupId, id),
    }),
    [id],
  );

  const addMember = useCallback(
    async (name: string) => {
      await db.transaction(async (tx) => {
        const user = { id: uuidV4(), name } satisfies User;
        await tx.insert(users).values(user);
        await tx.insert(usersToGroups).values({ userId: user.id, groupId: id });
      });
    },
    [db, id],
  );

  const addExpense = useCallback(
    async (expense: Omit<Expense, "id">, participants: string[]) => {
      const id = uuidV4();
      await db.transaction(async (tx) => {
        await tx.insert(expenses).values({ id, ...expense });
        await tx.insert(expensesToUsers).values(
          participants.map((participant) => ({
            expenseId: id,
            userId: participant,
          })),
        );
      });
    },
    [db],
  );

  const deleteExpense = useCallback(
    async (expenseId: string) => {
      await db.delete(expenses).where(eq(expenses.id, expenseId));
    },
    [db],
  );

  const normalizedGroup = useMemo(() => {
    if (!data) return undefined;
    return {
      id: data.id,
      name: data.name,
      users: members?.map(({ user }) => user) ?? [],
      expenses: expensesData ?? [],
    };
  }, [data, members, expensesData]);

  return {
    group: normalizedGroup,
    error: groupError || membersError || expensesError,
    addMember,
    addExpense,
    deleteExpense,
  };
}
