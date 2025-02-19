import { FAB, Icon } from "@rneui/themed";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export const GroupsNewFab = () => {
  const router = useRouter();
  return (
    <FAB
      placement="right"
      icon={
        <Icon
          name="account-multiple-plus-outline"
          type="material-community"
          size={24}
        />
      }
      title="New group"
      onPress={() => router.push("/groups/new")}
      style={styles.fab}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    margin: 16,
  },
});
