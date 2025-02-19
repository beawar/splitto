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
      leftComponent={
        (backRoute && {
          icon: "arrow-left",
          type: "material-community",
          color: "#fff",
          onPress: () => router.replace(backRoute),
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
