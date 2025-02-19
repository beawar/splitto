import { Icon, SpeedDial } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";

export const GroupNewFab = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <SpeedDial
      isOpen={open}
      icon={<Icon name="plus" type="material-community" />}
      openIcon={<Icon name="close" type="material-community" />}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <SpeedDial.Action
        icon={<Icon name="account-plus-outline" type="material-community" />}
        title="Add member"
        onPress={() => {
          router.push("./new-member", { relativeToDirectory: true });
          setOpen(false);
        }}
      />
      <SpeedDial.Action
        icon={<Icon name="cash-plus" type="material-community" />}
        title="Add expense"
        onPress={() => {
          setOpen(false);
        }}
      />
    </SpeedDial>
  );
};
