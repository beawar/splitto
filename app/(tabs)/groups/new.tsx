import { useGroups } from "@/hooks/useGroups";
import { Button, Input, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewGroupPage() {
  const [groupName, setGroupName] = useState("");
  const { createGroup } = useGroups();
  const router = useRouter();

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      createGroup({ name: groupName.trim() });
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text h4 style={styles.title}>
          Group Name
        </Text>
        <Input
          placeholder="Enter group name"
          value={groupName}
          onChangeText={setGroupName}
          autoFocus
        />
        <Button
          title="Create Group"
          onPress={handleCreateGroup}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
