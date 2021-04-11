import React, { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";
import useStyles from "./styles";

type Props = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: (event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Chat input for writing new message.
 * @param {string} message - Controlled state with message to send.
 * @param {function} setMessage - Hook function for updating message state.
 * @param {function} sendMessage - Submit message when triggered.
 */
const Input: React.FC<Props> = ({ message, setMessage, sendMessage }: Props) => {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <input
        className={classes.input}
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
      />
      <button type="button" className={classes.button} onClick={sendMessage}>
        Invia
      </button>
    </form>
  );
};

export default Input;
