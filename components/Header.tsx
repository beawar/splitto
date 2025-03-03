import { Header as HeaderRNE } from "@rneui/themed";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

type HeaderComponentProps = {
  title: string;
  backRoute?: RelativePathString;
};

export const Header = ({ title, backRoute }: HeaderComponentProps) => {
  const router = useRouter();

  return (
    <HeaderRNE
      leftComponent={{
        icon: "arrow-left",
        type: "material-community",
        color: "#fff",
        onPress: () => {
          if (backRoute) {
            router.dismissTo(backRoute);
          } else {
            router.back();
          }
        },
      }}
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
