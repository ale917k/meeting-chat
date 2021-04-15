import { Dispatch, SetStateAction } from "react";
import { addNewUser, loginUser, editUser } from "api/users";
import UserActions from "context/user/actions";
import UserTypes from "context/user/types";

/**
 * Listen to form inputs and updates form state respectively.
 * @param {object} event - DOM element change event.
 * @param {object} form - Controlled inputs form.
 * @param {function} setForm - Hook function for updating form object.
 * @returns {void} Hook call for updating form with parsed properties.
 */
export const handleChange = (
  event: React.ChangeEvent<MuiEvent>,
  form: Form,
  setForm: Dispatch<SetStateAction<Form>>,
): void => {
  const { type, name, value, checked } = event.target;

  setForm({ ...form, [name as string]: type === "checkbox" ? checked : value });
};

/**
 * Trigger CRUD request to server.
 * @param {object} event - DOM element form event.
 * @param {object} form - Controlled inputs form.
 * @param {function} setForm - Hook function for updating form object.
 * @param {object} initialAlertMessage - Initial object shape to reset alert messages.
 * @param {function} setAlertMessage - Hook function for resetting alert message state.
 * @returns {void} Hook call for updating form with parsed properties and reset alert message.
 */
export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  form: Form,
  date: Date | null,
  requestType: string,
  setAlertMessage: Dispatch<SetStateAction<AlertMessage>>,
  user: User | null,
  dispatch: Dispatch<UserActions>,
): Promise<void> => {
  event.preventDefault();

  // Create temp form obj and remove empty fields
  const filteredForm = Object.entries(form).reduce(
    (acc, [key, value]) => ({ ...acc, ...(value !== "" && { [key]: value }) }),
    {},
  ) as EditUserForm;

  switch (requestType) {
    case "addNewUser": {
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
    }
    case "loginUser": {
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
    }
    case "editUser": {
      type UserKey = keyof typeof user;
      type FormKey = keyof typeof form;

      // Check if filteredForm field and user field differ
      const comparedFields = Object.keys(filteredForm).map((formField) => {
        // Check if filteredForm fields contains user fields (to remove password fields)
        const matchedField = Object.keys(user as User).indexOf(formField);

        // Check if fields match (have same key) but differ in value
        if (matchedField > -1) {
          if (filteredForm[formField as FormKey] !== user?.[formField as UserKey]) return "differ";
          return "equal";
        }
        return "unmatched";
      })[0];

      // Make api call if form fields are different than user fields
      if (comparedFields === "differ" || comparedFields === "unmatched") {
        editUser(user as User, filteredForm)
          .then((editedUser) => {
            dispatch({
              type: UserTypes.Set,
              payload: editedUser as User,
            });

            setAlertMessage({
              isActive: true,
              severity: "success",
              message: "Informazioni aggiornate con successo",
            });
          })
          .catch((err) => {
            console.error("editUser global/CardForm err", err);
            setAlertMessage({
              isActive: true,
              severity: "error",
              message: err.message,
            });
          });
      } else {
        setAlertMessage({
          isActive: true,
          severity: "warning",
          message: "Nessuna informazione da aggiornare",
        });
      }

      break;
    }
    default:
      break;
  }
};
