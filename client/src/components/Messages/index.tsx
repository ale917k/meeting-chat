import React, { Fragment } from "react";
import Message from "./Message";
import useStyles from "./styles";

type PropsType = {
  messages: MessageType[];
  name: string;
};

const Messages: React.FC<PropsType> = ({ messages, name }: PropsType) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {messages.map((message, index) => (
        <Fragment key={index}>
          <Message message={message} name={name} />
        </Fragment>
      ))}
    </div>
  );
};

export default Messages;
