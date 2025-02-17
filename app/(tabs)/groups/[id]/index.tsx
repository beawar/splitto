import { GroupNewFab } from "@/components/GroupNewFab";
import { useGroup } from "@/hooks/useGroup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList } from "react-native";
import { Button, Collapse, Div, Header, Icon, Text } from "react-native-magnus";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { group } = useGroup(id);
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Header
        alignment="center"
        prefix={
          <Button bg="transparent" onPress={() => router.back()}>
            <Icon
              name="arrow-left"
              fontFamily="MaterialCommunityIcons"
              fontSize="2xl"
            />
          </Button>
        }
      >
        {group?.name}
      </Header>
      <Div>
        <Collapse>
          <Collapse.Header bg="white" color="gray900">
            Members
          </Collapse.Header>
          <Collapse.Body>
            <FlatList
              data={group?.users}
              renderItem={({ item }) => <Text>{item.name}</Text>}
            />
          </Collapse.Body>
        </Collapse>
      </Div>
      <GroupNewFab />
    </SafeAreaView>
  );
}
