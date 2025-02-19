import ErrorPage from "@/components/ErrorPage";
import ErrorPage from "@/components/ErrorPage";
import { GroupNewFab } from "@/components/GroupNewFab";
import { Header } from "@/components/Header";
import { Header } from "@/components/Header";
import { useGroup } from "@/hooks/useGroup";
import { ListItem, Text } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ACCORDION_KEYS = {
  members: "members",
  expenses: "expenses",
} as const;

type AccordionKeys = keyof typeof ACCORDION_KEYS | undefined;

export default function GroupDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { group, error } = useGroup(id);
  const [expandedTab, setExpandedTab] = useState<AccordionKeys>("expenses");

  if (error) {
    return (
      <ErrorPage
        title="Ops! Qualcosa è andato storto"
        subtitle="Assicurati di aver selezionato un gruppo valido"
      />
    );
  }

  if (!group) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider>
      <Header title={group?.name} backRoute=".." />
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Members</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expandedTab === ACCORDION_KEYS.members}
        onPress={() =>
          setExpandedTab((prevState) =>
            prevState === ACCORDION_KEYS.members
              ? undefined
              : ACCORDION_KEYS.members,
          )
        }
      >
        {group.users.length > 0 ? (
          group.users.map((user) => (
            <ListItem key={user.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.accordionText}>
                  {user.name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text>It seems there is no member yet.</Text>
          </View>
        )}
      </ListItem.Accordion>
      <GroupNewFab />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  accordionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
