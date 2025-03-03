import { DBProvider } from "@/components/DBProvider";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Stack } from "expo-router";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

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
        <AutocompleteDropdownContextProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AutocompleteDropdownContextProvider>
      </DBProvider>
    </ThemeProvider>
  );
}
