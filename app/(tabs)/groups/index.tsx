import { GroupsNewFab } from "@/components/GroupsNewFab";
import { Header } from "@/components/Header";
import ListItem from "@/components/ListItem";
import { useGroups } from "@/hooks/useGroups";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },
});

export default function Index() {
  const { groups } = useGroups();

  return (
    <SafeAreaProvider style={styles.container}>
      <Header title="Groups" />
      <FlatList
        data={groups}
        renderItem={({ item }) => <ListItem id={item.id} name={item.name} />}
        style={styles.list}
      />
      <GroupsNewFab />
    </SafeAreaProvider>
  );
}
