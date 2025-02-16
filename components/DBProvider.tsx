import { DATABASE_NAME } from "@/constants";
import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";

export const DBProvider = ({ children }: { children: React.ReactNode }) => {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        {children}
      </SQLiteProvider>
    </Suspense>
  );
};
