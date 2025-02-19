import { Skeleton } from "@rneui/themed";
import { SafeAreaView, StyleSheet, View } from "react-native";

export const GroupsSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.skeletonContainer}>
          <Skeleton animation="wave" height={60} />
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  skeletonContainer: {
    marginBottom: 16,
  },
});
