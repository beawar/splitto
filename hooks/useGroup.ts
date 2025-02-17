import { groups } from "@/db/schema/groups";
import { useDB, useLiveQuery } from "@/hooks/useDB";
import { eq } from "drizzle-orm";

export function useGroup(id: string) {
  const { db } = useDB();
  const { data } = useLiveQuery(
    db.query.groups.findFirst({
      where: eq(groups.id, id),
      with: { users: true },
    }),
  );

  return { group: data };
}
