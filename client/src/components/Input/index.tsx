import React, { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";
import { Form, SendButton, StyledInput } from "./styles";

type PropsType = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: (event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => void;
};

const Input: React.FC<PropsType> = ({ message, setMessage, sendMessage }: PropsType) => (
  <Form>
    <StyledInput
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
    />
    <SendButton onClick={(e) => sendMessage(e)}>
      <i className="fa fa-paper-plane" />
    </SendButton>
  </Form>
);

export default Input;
