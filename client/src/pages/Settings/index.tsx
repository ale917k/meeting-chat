import React, { useContext, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { retrieveTopic } from "api/topics";
import Store from "context";
import TopicTypes from "context/topic/types";
import CardForm from "components/global/CardForm";
import useStyles from "./styles";

/**
 * Settings page for updating username, password and status.
 */
const Settings: React.FC = () => {
  const classes = useStyles();

  // Context for retrieving User state from AppContext
  const { user, topic, dispatch } = useContext(Store);

  useEffect(() => {
    user?.activeTopic &&
      !topic &&
      retrieveTopic(user.activeTopic)
        .then((retrievedTopic) => {
          dispatch({
            type: TopicTypes.Set,
            payload: retrievedTopic,
          });
        })
        .catch((err) => console.error("retrieveTopic Settings err", err));
  }, []);

  // Form for editing User information
  const editStatusForm = [
    {
      type: "checkbox",
      name: "status",
      label: "Pronto a chattare con altre persone?",
      required: true,
    },
  ];

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
    <>
      {((user && topic) || (user && !user.activeTopic)) && (
        <Container maxWidth="lg">
          <div className={classes.wrapper}>
            <Typography variant="h1">Impostazioni</Typography>

            <CardForm
              title="Stato"
              titleVariant="h2"
              initialForm={{
                status: user.status,
                topicTitle: topic?.title || "",
                topicCategory: topic?.category || "",
              }}
              inputList={editStatusForm}
              requestType="editUser"
              buttonText="Aggiorna"
            />

            <CardForm
              title="Cambia nome"
              titleVariant="h2"
              initialForm={{
                username: (user as User).username,
              }}
              inputList={editDetailsForm}
              requestType="editUser"
              buttonText="Aggiorna"
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
              buttonText="Aggiorna"
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default Settings;
