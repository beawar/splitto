import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";

export const useDB = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {
    schema: schema,
    logger: true,
  });
  useDrizzleStudio(db);

  return {
    db: drizzleDb,
  };
};

export { useLiveQuery } from "drizzle-orm/expo-sqlite";
