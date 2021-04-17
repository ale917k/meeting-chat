import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { addNewChat } from "api/chats";
import Store from "context";
import Alert from "components/global/Alert";
import useStyles from "./styles";

type Props = {
  _id: string;
  title: string;
  category: string;
  creatorId: string;
  setActiveTopic: Dispatch<SetStateAction<number>>;
};

/**
 * Topic card
 */
const Topic: React.FC<Props> = ({ _id, title, category, creatorId, setActiveTopic }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const { user } = useContext(Store);

  // Alert message used for displaying error messages in case of server errors
  const initialAlertMessage = {
    isActive: false,
    severity: undefined,
    message: "",
  };
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(initialAlertMessage);

  // Create and join chat
  const joinChat = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (user) {
      const chat = {
        topicId: _id,
        creatorId,
        joinerId: user._id,
        active: true,
        messages: [],
      };

      addNewChat(chat)
        .then((res) => {
          console.log("res", res);
          history.push("/chats");
        })
        .catch((err) => {
          console.error("addNewChat Topic err", err);
          setAlertMessage({
            isActive: true,
            severity: "error",
            message: "Il topic non sembrerebbe essere piu' attivo.",
          });
        });
    } else {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: "Devi essere loggato per poter accedere ad una chat.",
      });
    }
  };

  return (
    <Card className={classes.card}>
      <Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />

      <CardHeader title={title} subheader={category} />

      <CardContent className={classes.buttons}>
        <Button variant="contained" color="primary" onClick={() => setActiveTopic((prevState) => prevState + 1)}>
          Cambia
        </Button>
        <Button variant="contained" color="primary" onClick={joinChat}>
          Inizia chat
        </Button>
      </CardContent>
    </Card>
  );
};

export default Topic;
