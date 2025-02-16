import { DBProvider } from "@/components/DBProvider";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ThemeProvider } from "react-native-magnus";
export default function RootLayout() {
  return (
    <ThemeProvider>
      <DBProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DBProvider>
    </ThemeProvider>
  );
}
