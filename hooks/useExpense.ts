import { useDB, useLiveQuery } from "./useDB";

export const useExpense = (id: string) => {
  const { db } = useDB();
  const { data, error } = useLiveQuery(
    db.query.expenses.findFirst({
      where: (expenses, { eq }) => eq(expenses.id, id),
      with: {
        group: true,
        payer: true,
      },
    }),
    [id],
  );

  return { data, error };
};
