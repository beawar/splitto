import { getInitials } from "@/utils/string";
import { Avatar, ListItem as RNEListItem, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";

interface ListItemProps {
  id: string;
  name: string;
}

export default function ListItem({ id, name }: ListItemProps) {
  const initials = getInitials(name);
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <RNEListItem
      onPress={() => router.push({ pathname: "/groups/[id]", params: { id } })}
    >
      <Avatar
        size="medium"
        title={initials}
        rounded
        containerStyle={{ backgroundColor: theme.colors.secondary }}
      />
      <RNEListItem.Content>
        <RNEListItem.Title style={{ fontSize: 18, fontWeight: "600" }}>
          {name}
        </RNEListItem.Title>
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
}
