import { useRouter } from "expo-router";
import { Avatar, Button, Div, Text } from "react-native-magnus";

interface ListItemProps {
  id: string;
  name: string;
}

const getInitials = (name: string): string => {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function ListItem({ id, name }: ListItemProps) {
  const initials = getInitials(name);

  const router = useRouter();

  return (
    <Button
      block
      bg="white"
      p="none"
      onPress={() => router.push(`/groups/${id}`)}
      justifyContent="flex-start"
    >
      <Div flexDir="row" alignItems="center" p={16}>
        <Avatar bg="green600" color="white" mr={16}>
          {initials}
        </Avatar>
        <Text fontSize="lg" fontWeight="600">
          {name}
        </Text>
      </Div>
    </Button>
  );
}
