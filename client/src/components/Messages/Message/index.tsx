import React from "react";
import ReactEmoji from "react-emoji";
import { MessageWrapper, MessageBox, MessageText, SentText } from "./styles";

type PropsType = {
  message: MessageType;
  name: string;
};

const Message: React.FC<PropsType> = ({ message: { user, text }, name }: PropsType) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <MessageWrapper justify="flex-end">
      <SentText padding="0 10px 0 0">{trimmedName}</SentText>
      <MessageBox bg="#2979ff">
        <MessageText color="white">{ReactEmoji.emojify(text)}</MessageText>
      </MessageBox>
    </MessageWrapper>
  ) : (
    <MessageWrapper justify="flex-start">
      <MessageBox bg="#f3f3f3">
        <MessageText color="#353535">{text}</MessageText>
      </MessageBox>
      <SentText padding="0 0 0 10px">{user}</SentText>
    </MessageWrapper>
  );
};

export default Message;
