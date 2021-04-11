import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { addNewUser, loginUser, editUser } from "api/users";
import Store from "context";
import UserTypes from "context/user/types";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import StatusSwitch from "./StatusSwitch";
import useStyles from "./styles";

type Input = {
  type: string;
  name: string;
  label: string;
  required: boolean;
};

type Props = {
  title: string;
  initialForm: Form;
  inputList: Array<Input>;
  requestType: string;
  buttonText: string;
  children?: React.ReactNode;
};

/**
 * Handle CRUD methods through creation of dynamic forms.
 * @param {string} title - Title to display on top of the form.
 * @param {Object} initialForm - Initial shape of the form data.
 * @param {array} inputList - List of inputs and related attributes to display on the form.
 * @param {string} requestType - Type of CRUD request to apply.
 * @param {string} buttonText - Text to display on submit button.
 * @param {ReactNode} children - Display custom content below form.
 * @return Generic form to apply CRUD methods to server.
 */
const CardForm: React.FC<Props> = ({ title, initialForm, inputList, requestType, buttonText, children }: Props) => {
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

  // Listen to form inputs and updates form state respectively
  const handleChange = (event: React.ChangeEvent<MuiEvent>) => {
    const { type, name, value, checked } = event.target;

    setForm({ ...form, [name as string]: type === "checkbox" ? checked : value });
    setAlertMessage(initialAlertMessage);
  };

  // Trigger CRUD request to server
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create temp form obj and remove empty fields
    const filteredForm = Object.entries(form).reduce(
      (acc, [key, value]) => ({ ...acc, ...(value !== "" && { [key]: value }) }),
      {},
    );

    switch (requestType) {
      case "addNewUser":
        addNewUser({ ...form, born: date } as RegUserForm, false)
          .then((newUser) =>
            dispatch({
              type: UserTypes.Set,
              payload: newUser as User,
            }),
          )
          .catch((err) => {
            console.error("addNewUser global/CardForm err", err);
            setAlertMessage({
              isActive: true,
              severity: "error",
              message: err.message,
            });
          });
        break;
      case "loginUser":
        loginUser(form as LogUserForm, false)
          .then((loggedUser) =>
            dispatch({
              type: UserTypes.Set,
              payload: loggedUser as User,
            }),
          )
          .catch((err) => {
            console.error("loginUser global/CardForm err", err);
            setAlertMessage({
              isActive: true,
              severity: "error",
              message: err.message,
            });
          });
        break;
      case "editUser":
        editUser(user as User, filteredForm)
          .then((EditedUser) =>
            dispatch({
              type: UserTypes.Set,
              payload: EditedUser as User,
            }),
          )
          .catch((err) => {
            console.error("editUser global/CardForm err", err);
            setAlertMessage({
              isActive: true,
              severity: "error",
              message: err.message,
            });
          });
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <Typography variant="h1">{title}</Typography>

        {alertMessage.isActive && <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>}

        <form onSubmit={handleSubmit}>
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
                handleChange={handleChange}
                label={label}
                name={name}
              />
            ) : (
              <TextField
                key={`${name}-${index}`}
                handleChange={handleChange}
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

        {children}
      </div>
    </div>
  );
};

export default CardForm;
