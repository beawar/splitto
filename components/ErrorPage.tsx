import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

type ErrorPageProps = {
  title: string;
  subtitle: string;
};

export default function ErrorPage({ title, subtitle }: ErrorPageProps) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
});
