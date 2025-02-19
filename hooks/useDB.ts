import * as groups from "@/db/schema/groups";
import * as users from "@/db/schema/users";
import * as usersToGroups from "@/db/schema/users_to_groups";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";

export const useDB = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {
    schema: { ...groups, ...users, ...usersToGroups },
    logger: true,
  });
  useDrizzleStudio(db);

  return {
    db: drizzleDb,
  };
};

export { useLiveQuery } from "drizzle-orm/expo-sqlite";
