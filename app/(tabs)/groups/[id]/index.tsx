import ErrorPage from "@/components/ErrorPage";
import { GroupNewFab } from "@/components/GroupNewFab";
import { Header } from "@/components/Header";
import { EXPENSE_CATEGORY } from "@/constants";
import { useGroup } from "@/hooks/useGroup";
import { Button, Divider, Icon, ListItem, Text } from "@rneui/themed";
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
  const { group, error, deleteExpense } = useGroup(id);
  const [expandedTab, setExpandedTab] = useState<AccordionKeys>("expenses");

  const onDeleteExpense = (expenseId: string, reset: () => void) => () => {
    deleteExpense(expenseId);
    reset();
  };

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
      <Divider />
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Expenses</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expandedTab === ACCORDION_KEYS.expenses}
        onPress={() =>
          setExpandedTab((prevState) =>
            prevState === ACCORDION_KEYS.expenses
              ? undefined
              : ACCORDION_KEYS.expenses,
          )
        }
      >
        {group.expenses.length > 0 ? (
          group.expenses.map((expense) => (
            <ListItem key={expense.id}>
              <ListItem.Swipeable
                rightContent={(reset) => (
                  <Button
                    title="Delete"
                    onPress={onDeleteExpense(expense.id, reset)}
                    icon={{ name: "delete", color: "white" }}
                    buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                  />
                )}
              >
                <Icon
                  name={
                    EXPENSE_CATEGORY[
                      expense.category as keyof typeof EXPENSE_CATEGORY
                    ].icon
                  }
                />
                <ListItem.Content>
                  <ListItem.Title>{expense.description}</ListItem.Title>
                  <ListItem.Subtitle>
                    {expense.amount.toFixed(2)}€ (
                    {group.users.find((user) => user.id === expense.payerId)
                      ?.name ?? "Unknown"}
                    )
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
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
