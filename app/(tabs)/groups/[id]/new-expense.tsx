import { DateTimeInput } from "@/components/DateTimeInput";
import { Header } from "@/components/Header";
import { EXPENSE_CATEGORY } from "@/constants";
import { Expense } from "@/db/schema";
import { useGroup } from "@/hooks/useGroup";
import { capitalize } from "@/utils/string";
import { Picker } from "@react-native-picker/picker";
import { Button, Icon, Input, Text, useTheme } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewExpense() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { group, addExpense } = useGroup(id);
  const router = useRouter();
  const [expense, setExpense] = useState<Partial<Omit<Expense, "id">>>({});
  const { theme } = useTheme();

  const onAdd = () => {
    router.replace({ pathname: "/groups/[id]", params: { id } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Add expense to ${group?.name}`} backRoute=".." />
      <View style={styles.content}>
        <View style={styles.form}>
          <Input
            label="Description"
            placeholder="Train ticket to Rome"
            value={expense.description}
            onChangeText={(newValue) => {
              setExpense((prevState) => ({
                ...prevState,
                description: newValue,
              }));
            }}
          />
          <Input
            label="Amount"
            placeholder="0"
            inputMode="decimal"
            keyboardType="decimal-pad"
            value={expense.amount?.toString()}
            onChangeText={(newValue) => {
              setExpense((prevState) => ({
                ...prevState,
                amount: Number(newValue),
              }));
            }}
          />
          <DateTimeInput
            label="Date"
            value={expense.date ? new Date(expense.date) : undefined}
            onDateChange={(date = new Date()) => {
              setExpense((prevState) => ({
                ...prevState,
                date: date.getTime(),
              }));
            }}
          />
          <View style={styles.categoryContainer}>
            <Text style={[styles.label, { color: theme.colors.grey3 }]}>
              Category
            </Text>
            <View
              style={[
                styles.categoryField,
                { borderColor: theme.colors.grey3 },
              ]}
            >
              <Icon
                name={EXPENSE_CATEGORY[expense.category ?? "other"].icon}
                size={20}
                type="material-community"
              />
              <View style={styles.pickerContainer}>
                <Picker<keyof typeof EXPENSE_CATEGORY>
                  selectedValue={expense.category ?? "other"}
                  onValueChange={(itemValue) => {
                    setExpense((prevState) => ({
                      ...prevState,
                      category: itemValue,
                    }));
                  }}
                >
                  {Object.keys(EXPENSE_CATEGORY).map((category) => (
                    <Picker.Item
                      label={capitalize(category)}
                      value={category}
                      key={category}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
        <Button title="Add" onPress={onAdd} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    width: "100%",
    maxWidth: "100%",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginBottom: 16,
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
    width: "100%",
    maxWidth: "100%",
  },
  categoryContainer: {
    paddingHorizontal: 10,
    width: "100%",
  },
  categoryField: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pickerContainer: {
    width: "100%",
    flexShrink: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
