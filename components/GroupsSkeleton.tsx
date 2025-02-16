import { SafeAreaView } from "react-native";
import { Div, Skeleton } from "react-native-magnus";

export const GroupsSkeleton = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {[...Array(5)].map((_, index) => (
        <Div key={index} mb={16}>
          <Skeleton.Box h={60} w="100%" />
        </Div>
      ))}
    </SafeAreaView>
  );
};
