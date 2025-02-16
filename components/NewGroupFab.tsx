import { useRouter } from "expo-router";
import { Button, Div, Fab, Icon, Text } from "react-native-magnus";

export const NewGroupFab = () => {
  const router = useRouter();
  return (
    <Fab>
      <Button
        p="none"
        bg="transparent"
        onPress={() => router.push("/groups/new")}
      >
        <Div rounded="sm" bg="white" p="sm">
          <Text fontSize="md">New group</Text>
        </Div>
        <Icon
          name="account-multiple-plus-outline"
          fontFamily="MaterialCommunityIcons"
          fontSize={24}
          p={18}
          rounded="circle"
          ml="md"
          bg="white"
        />
      </Button>
    </Fab>
  );
};
