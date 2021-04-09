import React, { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";
import useStyles from "./styles";

type PropsType = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: (event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => void;
};

const Input: React.FC<PropsType> = ({ message, setMessage, sendMessage }: PropsType) => {
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
      <button type="button" className={classes.button} onClick={(e) => sendMessage(e)}>
        <i className="fa fa-paper-plane" />
      </button>
    </form>
  );
};

export default Input;
