import { Tabs } from "expo-router";
import { Icon } from "react-native-magnus";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon
              fontFamily="MaterialCommunityIcons"
              fontSize={28}
              color={color}
              name="home-outline"
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
              fontFamily="MaterialCommunityIcons"
              fontSize={28}
              color={color}
              name="account-group-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
}
