import { groups } from "@/db/schema/groups";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useDB, useLiveQuery } from "./useDB";

export const useGroups = () => {
  const { db } = useDB();
  const { data } = useLiveQuery(db.query.groups.findMany());

  const createGroup = async (group: { name: string }) => {
    await db.transaction(async (tx) => {
      const newGroup = {
        id: uuidv4(),
        ...group,
      };
      await tx.insert(groups).values(newGroup);
    });
  };

  return {
    groups: data,
    createGroup,
  };
};
