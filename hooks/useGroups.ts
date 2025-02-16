import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as schema from "@/db/schema";
import { useDB, useLiveQuery } from "./useDB";

export const useGroups = () => {
  const { db } = useDB();
  const { data: groups } = useLiveQuery(db.select().from(schema.groups));

  const createGroup = async (group: { name: string }) => {
    const newGroup = {
      id: uuidv4(),
      ...group,
    };
    await db.insert(schema.groups).values(newGroup);
  };

  return {
    groups,
    createGroup,
  };
};
