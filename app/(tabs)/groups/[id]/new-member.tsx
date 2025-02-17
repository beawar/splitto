import { useGroup } from "@/hooks/useGroup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, Header, Icon } from "react-native-magnus";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewMember() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { group } = useGroup(id);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
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
        Add member to {group?.name}
      </Header>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
