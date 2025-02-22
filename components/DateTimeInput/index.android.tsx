import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Input } from "@rneui/themed";
import { DateTimeInputProps } from ".";

export const DateTimeInput = ({
  label,
  value = new Date(),
  onDateChange,
}: DateTimeInputProps) => {
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    DateTimePickerAndroid.dismiss("date");
    onDateChange(selectedDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: value,
      onChange,
      mode: "date",
    });
  };

  const localizedDate = Intl.DateTimeFormat("it-IT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);

  return <Input label={label} value={localizedDate} onPress={showDatepicker} />;
};
