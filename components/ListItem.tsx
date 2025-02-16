import { Div, Text, Avatar } from "react-native-magnus";

interface ListItemProps {
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

export default function ListItem({ name }: ListItemProps) {
  const initials = getInitials(name);

  return (
    <Div flexDir="row" alignItems="center" p={16}>
      <Avatar bg="green600" color="white" mr={16}>
        {initials}
      </Avatar>
      <Text fontSize="lg" fontWeight="600">
        {name}
      </Text>
    </Div>
  );
}
