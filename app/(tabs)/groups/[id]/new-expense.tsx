import { DateTimeInput } from "@/components/DateTimeInput";
import { Header } from "@/components/Header";
import { EXPENSE_CATEGORY } from "@/constants";
import { Expense, User } from "@/db/schema";
import { useGroup } from "@/hooks/useGroup";
import { capitalize } from "@/utils/string";
import { Picker } from "@react-native-picker/picker";
import { Button, Icon, Input, makeStyles, Text } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewExpense() {
  const router = useRouter();
  const styles = useStyles();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { group, addExpense } = useGroup(id);
  const [expense, setExpense] = useState<Partial<Omit<Expense, "id">>>({});
  const [payerName, setPayerName] = useState("");
  const [payerOptions, setPayerOptions] = useState<User[]>([]);

  const onAdd = () => {
    router.replace({ pathname: "/groups/[id]", params: { id } });
  };

  const searchUsers = (text: string) => {
    setPayerName(text);
    if (group) {
      setPayerOptions(group.users.filter((user) => user.name.includes(text)));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Add expense to ${group?.name}`} backRoute=".." />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryField}>
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
              <Input
                label="Payer"
                placeholder="John Doe"
                value={payerName}
                onChangeText={searchUsers}
              />
            </View>
            {/* TODO: button goes under the tabs when keyboard is open */}
            <Button title="Add" onPress={onAdd} style={styles.button} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  form: {
    gap: 16,
  },
  button: {
    marginBottom: 16,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 17,
  },
  categoryField: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.grey3,
  },
  pickerContainer: {
    width: "100%",
    flexShrink: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.grey3,
  },
}));
