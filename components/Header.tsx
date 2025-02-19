import { Header as HeaderRNE } from "@rneui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

type HeaderComponentProps = {
  title: string;
  showBackButton?: boolean;
};

export const Header = ({ title, showBackButton }: HeaderComponentProps) => {
  const router = useRouter();

  return (
    <HeaderRNE
      leftComponent={
        (showBackButton && {
          icon: "arrow-left",
          type: "material-community",
          color: "#fff",
          onPress: () => router.back(),
        }) ||
        undefined
      }
      centerComponent={{ text: title, style: styles.heading }}
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
