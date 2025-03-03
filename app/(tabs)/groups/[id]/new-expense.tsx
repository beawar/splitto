import { DateTimeInput } from "@/components/DateTimeInput";
import { Header } from "@/components/Header";
import { EXPENSE_CATEGORY } from "@/constants";
import { Expense } from "@/db/schema";
import { useGroup } from "@/hooks/useGroup";
import { capitalize } from "@/utils/string";
import { Picker } from "@react-native-picker/picker";
import { Button, Icon, Input, makeStyles, Text } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewExpense() {
  const router = useRouter();
  const styles = useStyles();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { group, addExpense } = useGroup(id);
  const [expense, setExpense] = useState<Partial<Omit<Expense, "id">>>({
    groupId: id,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Expense, string>>>(
    {},
  );

  const onAdd = async () => {
    console.log("onAdd", expense);
    const validationErrors: Partial<Record<keyof Expense, string>> = {};
    if (!expense.description?.trim()) {
      validationErrors.description = "Description cannot be empty";
    }
    if (expense.amount === undefined) {
      validationErrors.amount = "Amount cannot be empty";
    }
    if (expense.date === undefined) {
      validationErrors.date = "Date cannot be empty";
    }
    if (!expense.payerId) {
      validationErrors.payerId = "Payer cannot be empty";
    }
    if (Object.keys(validationErrors).length > 0) {
      console.log({ errors });
      setErrors(validationErrors);
      return;
    }

    assertValidExpense(expense);
    await addExpense(expense, group?.users.map((user) => user.id) ?? []);
    router.replace({ pathname: "/groups/[id]", params: { id } });
  };

  const users = useMemo(
    () => group?.users.map((user) => ({ id: user.id, title: user.name })) ?? [],
    [group?.users],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.container}>
        <Header title={`Add expense to ${group?.name}`} backRoute=".." />
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
                errorMessage={errors.description}
              />
              <Input
                label="Amount"
                placeholder="0"
                inputMode="decimal"
                keyboardType="decimal-pad"
                defaultValue={expense.amount?.toString()}
                onChangeText={(newValue) => {
                  if (Number.isNaN(Number(newValue))) {
                    setErrors((prevState) => ({
                      ...prevState,
                      ["amount"]: "Invalid amount",
                    }));
                  } else {
                    setErrors((prevState) => ({
                      ...prevState,
                      ["amount"]: undefined,
                    }));
                    setExpense((prevState) => ({
                      ...prevState,
                      amount: Number(newValue),
                    }));
                  }
                }}
                errorMessage={errors.amount}
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
                errorMessage={errors.date}
              />
              <View style={styles.fieldContainer}>
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
                  <Text>{errors.date}</Text>
                </View>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Payer</Text>
                <AutocompleteDropdown
                  initialValue={expense.payerId}
                  clearOnFocus={false}
                  closeOnBlur={true}
                  closeOnSubmit={true}
                  onSelectItem={(item) => {
                    setExpense((prevState) => ({
                      ...prevState,
                      payerId: item?.id,
                    }));
                  }}
                  dataSet={users}
                  containerStyle={styles.autocompleteContainer}
                  inputContainerStyle={styles.autocompleteInputContainer}
                  suggestionsListContainerStyle={
                    styles.autocompleteSuggestionContainer
                  }
                  textInputProps={{ style: styles.autocompleteInput }}
                />
                <Text>{errors.payerId}</Text>
              </View>
            </View>
            <Button title="Add" onPress={onAdd} style={styles.button} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function assertValidExpense(
  expense: Partial<Omit<Expense, "id">>,
): asserts expense is Omit<Expense, "id"> {
  if (
    expense.description === undefined ||
    expense.amount === undefined ||
    expense.date === undefined ||
    expense.category === undefined ||
    expense.payerId === undefined
  ) {
    throw new Error("Invalid expense. Undefined field", { cause: expense });
  }
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
  fieldContainer: {
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
  autocompleteContainer: {
    paddingInlineEnd: 4,
    borderBottomWidth: 1,
    borderColor: theme.colors.grey3,
  },
  autocompleteInputContainer: {
    backgroundColor: "transparent",
  },
  autocompleteSuggestionContainer: {
    backgroundColor: theme.colors.searchBg,
  },
  autocompleteInput: {
    color: theme.colors.black,
  },
}));
