import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Input } from "@rneui/themed";
import { Fragment, useState } from "react";

export type DateTimeInputProps = {
  label: string;
  value?: Date;
  onDateChange: (date: Date | undefined) => void;
  errorMessage?: string;
};
export const DateTimeInput = ({
  label,
  value = new Date(),
  onDateChange,
  errorMessage,
}: DateTimeInputProps) => {
  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setShow(false);
    onDateChange(selectedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const localizedDate = Intl.DateTimeFormat("it-IT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);

  return (
    <Fragment>
      <Input
        label={label}
        value={localizedDate}
        onPress={showDatepicker}
        errorMessage={errorMessage}
      />
      ;
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </Fragment>
  );
};
