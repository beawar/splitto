import { Group } from "@/db/schema/groups";
import { User, users } from "@/db/schema/users";
import { usersToGroups } from "@/db/schema/users_to_groups";
import { useDB, useLiveQuery } from "@/hooks/useDB";
import { useCallback, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

type GroupWithUsers = Group & {
  users: User[];
};

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
      users: members?.map(({ user }) => user) ?? [],
    } satisfies GroupWithUsers;
  }, [data, members]);

  return {
    group: normalizedGroup,
    addMember,
    error: groupError || membersError,
  };
}
