import { Header } from "@/components/Header";
import { EXPENSE_CATEGORY } from "@/constants";
import { useExpense } from "@/hooks/useExpense";
import { Icon, Text } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpenseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error } = useExpense(id);

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error {JSON.stringify(error)}</Text>
      </SafeAreaView>
    );
  }
  if (!data) {
    return (
      <SafeAreaView>
        <Text>Cannot find expense</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <Header title="Expense details" />
      <ScrollView>
        <View>
          <Text h4>Description</Text>
          <Text>{data.description}</Text>
        </View>
        <View>
          <Text h4>Amount</Text>
          <Text>{data.amount}</Text>
        </View>
        <View>
          <Text h4>Category</Text>
          <View>
            <Icon
              name={
                EXPENSE_CATEGORY[data.category as keyof typeof EXPENSE_CATEGORY]
                  .icon
              }
              type="material-community"
            />
            <Text>{data.category}</Text>
          </View>
        </View>
        <View>
          <Text h4>Date</Text>
          <Text>{data.date}</Text>
        </View>
        <View>
          <Text h4>Group</Text>
          <Text>{data.group.name}</Text>
        </View>
        <View>
          <Text h4>Payer</Text>
          <Text>{data.payer.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
