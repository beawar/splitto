import { useGroup } from "@/hooks/useGroup";
import { Button, Icon, Input, Header as RNEHeader } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewMember() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { group, addMember } = useGroup(id);
  const router = useRouter();
  const [name, setName] = useState("");

  const onAdd = () => {
    addMember(name);
    router.replace({ pathname: "/groups/[id]", params: { id } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNEHeader
        centerComponent={{
          text: `Add member to ${group?.name}`,
          style: styles.headerTitle,
        }}
        leftComponent={
          <Icon
            name="arrow-left"
            type="material-community"
            size={28}
            onPress={() => router.back()}
          />
        }
      />
      <View style={styles.content}>
        <Input placeholder="Name" value={name} onChangeText={setName} />
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
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginBottom: 16,
  },
});
