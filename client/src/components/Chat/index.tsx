import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "components/InfoBar";
import Input from "components/Input";
import Messages from "components/Messages";
import useStyles from "./styles";

let socket: SocketIOClient.Socket;

const Chat: React.FC<RouteComponentProps> = ({ location }: RouteComponentProps) => {
  const classes = useStyles();

  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const ENDPOINT = "http://localhost:8080/";

  useEffect(() => {
    const { name: nameParam, room: roomParam } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(roomParam as string);
    setName(nameParam as string);

    if (nameParam && roomParam) {
      socket.emit("join", { name: nameParam, room: roomParam }, (error: string) => {
        if (error) {
          // TO REMOVE ONCE ADDED ERROR MESSAGES
          // eslint-disable-next-line
          alert(error);
        }
      });
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (newMessage: never) => {
      setMessages((prevState: MessageType[]) => [...prevState, newMessage]);
    });
  }, []);

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
