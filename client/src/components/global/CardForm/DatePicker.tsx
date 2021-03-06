import React, { Dispatch, SetStateAction } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import useStyles from "./styles";

type Props = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  label: string;
  name: string;
  required: boolean;
};

/**
 * Input picker with popup for selecting new Date.
 * @param {Date} date - Controlled state with selected date.
 * @param {function} setDate - Hook function for selecting new dates.
 * @param {string} label - Element label.
 * @param {string} name - Element name property.
 * @param {boolean} required - Element required property.
 */
const DatePicker: React.FC<Props> = ({ date, setDate, label, name, required }: Props) => {
  const classes = useStyles();

  // Limit max available date to 14 years ago
  const getMaxDate = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDay();

    const year = currentYear - 12;

    return new Date(year, currentMonth, currentDay);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        label={label}
        name={name}
        value={date}
        onChange={(newDate) => setDate(newDate)}
        required={required}
        className={classes.field}
        size="small"
        inputVariant="filled"
        format="dd/MM/yyyy"
        maxDate={getMaxDate()}
        KeyboardButtonProps={{
          edge: "end",
          "aria-label": "cambia data",
        }}
        fullWidth
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
