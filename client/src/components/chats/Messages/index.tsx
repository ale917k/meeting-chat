import React, { Fragment } from "react";
import Message from "./Message";
import useStyles from "./styles";

type Props = {
  messages: Message[];
  name: string;
};

/**
 * List of messages of a chat.
 * @param {array} messages - List of messages present on a chat.
 * @param {string} name - Chat room name.
 */
const Messages: React.FC<Props> = ({ messages, name }: Props) => {
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
