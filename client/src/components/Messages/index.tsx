import React, { Fragment } from "react";
import Message from "./Message";
import MessagesWrapper from "./styles";

type PropsType = {
  messages: MessageType[];
  name: string;
};

const Messages: React.FC<PropsType> = ({ messages, name }: PropsType) => (
  <MessagesWrapper>
    {messages.map((message, index) => (
      <Fragment key={index}>
        <Message message={message} name={name} />
      </Fragment>
    ))}
  </MessagesWrapper>
);

export default Messages;
