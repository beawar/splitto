import { Icon } from "@rneui/themed";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon
              name="home-outline"
              type="material-community"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color }) => (
            <Icon
              name="account-group-outline"
              type="material-community"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
