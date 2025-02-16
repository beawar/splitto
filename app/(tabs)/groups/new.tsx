import { StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useGroups } from "../../../hooks/useGroups";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Div, Input, Text } from "react-native-magnus";

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
      <Div p="lg">
        <Text fontWeight="bold" fontSize="lg" mb="md">
          Group Name
        </Text>
        <Input
          placeholder="Enter group name"
          value={groupName}
          onChangeText={setGroupName}
          autoFocus
          mb="lg"
          borderColor="gray400"
        />
        <Button block onPress={handleCreateGroup}>
          Create Group
        </Button>
      </Div>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
