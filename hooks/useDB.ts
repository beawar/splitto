import { groups } from "@/db/schema/groups";
import { users } from "@/db/schema/users";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";

const schema = {
  groups: groups,
  users: users,
} as const;

export const useDB = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);

  return {
    db: drizzleDb,
  };
};

export { useLiveQuery } from "drizzle-orm/expo-sqlite";
