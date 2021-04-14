import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Store from "context";
import Alert from "components/global/Alert";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import StatusSwitch from "./StatusSwitch";
import { handleChange, handleSubmit } from "./utils";
import useStyles from "./styles";

type Props = {
  title: string;
  titleVariant?: Variant | "inherit";
  initialForm: Form;
  inputList: Array<Input>;
  requestType: string;
  buttonText: string;
  children?: React.ReactNode;
};

/**
 * Handle CRUD methods through creation of dynamic forms.
 * @param {string} title - Title to display on top of the form.
 * @param {string} titleVariant - Title element to display (e.g. h1, body2, ecc.).
 * @param {Object} initialForm - Initial shape of the form data.
 * @param {array} inputList - List of inputs and related attributes to display on the form.
 * @param {string} requestType - Type of CRUD request to apply.
 * @param {string} buttonText - Text to display on submit button.
 * @param {ReactNode} children - Display custom content below form.
 * @return Generic form to apply CRUD methods to server.
 */
const CardForm: React.FC<Props> = ({
  title,
  titleVariant,
  initialForm,
  inputList,
  requestType,
  buttonText,
  children,
}: Props) => {
  const classes = useStyles();

  // Context for retrieving and dispatching User state from and to Store
  const { user, dispatch } = useContext(Store);

  // Data to send to server for applying CRUD methods
  const [form, setForm] = useState<Form>(initialForm);
  type FormKey = keyof typeof form;

  // Date field for registration
  const [date, setDate] = useState<Date | null>(null);

  // Alert message used for displaying error messages in case of server errors
  const initialAlertMessage = {
    isActive: false,
    severity: undefined,
    message: "",
  };
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(initialAlertMessage);

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <Typography variant={titleVariant || "h1"} className={classes.textCenter}>
          {title}
        </Typography>

        <Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} snackbar={requestType === "editUser"} />

        <form onSubmit={(e) => handleSubmit(e, form, date, requestType, setAlertMessage, user, dispatch)}>
          {inputList.map(({ type, name, label, required }, index) =>
            type === "date" ? (
              <DatePicker
                key={`${name}-${index}`}
                date={date}
                setDate={setDate}
                label={label}
                name={name}
                required={required}
              />
            ) : type === "checkbox" ? (
              <StatusSwitch
                key={`${name}-${index}`}
                form={form as RegUserForm}
                handleChange={(e) => handleChange(e, form, setForm)}
                label={label}
                name={name}
              />
            ) : (
              <TextField
                key={`${name}-${index}`}
                handleChange={(e) => handleChange(e, form, setForm)}
                type={type}
                label={label}
                name={name}
                value={form[name as FormKey]}
                required={required}
              />
            ),
          )}
          <Button variant="contained" size="large" color="primary" type="submit" fullWidth>
            {buttonText}
          </Button>
        </form>

        <div className={classes.textCenter}>{children}</div>
      </div>
    </div>
  );
};

export default CardForm;
