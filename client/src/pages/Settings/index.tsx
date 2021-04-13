import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Store from "context";
import CardForm from "components/global/CardForm";
import useStyles from "./styles";

/**
 * Settings page for updating username, password and status.
 */
const Settings: React.FC = () => {
  const classes = useStyles();

  // Context for retrieving User state from AppContext
  const { user } = useContext(Store);

  // Form for editing User information
  const editDetailsForm = [
    {
      id: "username",
      type: "username",
      name: "username",
      label: "Username",
      required: true,
    },
  ];

  // Form for editing User password
  const editPasswordForm = [
    {
      id: "oldPassword",
      type: "password",
      name: "oldPassword",
      label: "Password corrente",
      required: true,
    },
    {
      id: "newPassword",
      type: "password",
      name: "newPassword",
      label: "Nuova password",
      required: true,
    },
  ];

  return (
    <Container maxWidth="lg">
      <div className={classes.wrapper}>
        <Typography variant="h1">Impostazioni</Typography>

        <CardForm
          title="Cambia nome"
          titleVariant="h2"
          initialForm={{
            username: (user as User).username,
          }}
          inputList={editDetailsForm}
          requestType="editUser"
          buttonText="Update"
        />

        <CardForm
          title="Aggiorna password"
          titleVariant="h2"
          initialForm={{
            oldPassword: "",
            newPassword: "",
          }}
          inputList={editPasswordForm}
          requestType="editUser"
          buttonText="Update"
        />
      </div>
    </Container>
  );
};

export default Settings;
