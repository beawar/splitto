import { useState } from "react";

export const useGroups = () => {
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([
    {
      id: "1",
      name: "Group 1",
    },
    {
      id: "2",
      name: "Group 2",
    },
  ]);

  const createGroup = (group: { name: string }) => {
    const newGroup = {
      id: String(groups.length + 1),
      ...group,
    };
    setGroups((prevState) => [...prevState, newGroup]);
  };

  return {
    groups,
    createGroup,
  };
};
