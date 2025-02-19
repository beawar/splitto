import { Group, groups } from "@/db/schema/groups";
import { User, users } from "@/db/schema/users";
import { usersToGroups } from "@/db/schema/users_to_groups";
import { useDB, useLiveQuery } from "@/hooks/useDB";
import { eq } from "drizzle-orm";
import { useCallback, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

type GroupWithUsers = Group & {
  users: User[];
};

export function useGroup(id: string) {
  const { db } = useDB();
  const { data } = useLiveQuery(
    db.query.groups.findFirst({
      where: eq(groups.id, id),
      with: {
        usersToGroups: {
          with: {
            user: true,
          },
        },
      },
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

  const normalizedGroup = useMemo(() => {
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      users: data.usersToGroups.map((item) => item.user) ?? [],
    } satisfies GroupWithUsers;
  }, [data]);

  console.log(normalizedGroup);

  return { group: normalizedGroup, addMember };
}
