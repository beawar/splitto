import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Div, Fab, Icon, Text } from "react-native-magnus";

export const GroupNewFab = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Fab>
      <Button
        p="none"
        bg="transparent"
        onPress={() => router.push(`./new-member`)}
      >
        <Div rounded="sm" bg="white" p="sm">
          <Text fontSize="md">Add member</Text>
        </Div>
        <Icon
          name="account-plus-outline"
          fontFamily="MaterialCommunityIcons"
          fontSize={24}
          p={18}
          rounded="circle"
          ml="md"
          bg="white"
        />
      </Button>
      <Button p="none" bg="transparent">
        <Div rounded="sm" bg="white" p="sm">
          <Text fontSize="md">Add expense</Text>
        </Div>
        <Icon
          name="cash-plus"
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
