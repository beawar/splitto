import { DBProvider } from "@/components/DBProvider";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Stack } from "expo-router";

const theme = createTheme({
  // lightColors: {
  //   primary: "#2f855a",
  // },
  // darkColors: {
  //   primary: "#48bb78",
  // },
});

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <DBProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DBProvider>
    </ThemeProvider>
  );
}
