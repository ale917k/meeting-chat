import React from "react";
import ReactEmoji from "react-emoji";
import useStyles from "./styles";

type PropsType = {
  message: MessageType;
  name: string;
};

const Message: React.FC<PropsType> = ({ message: { user, text }, name }: PropsType) => {
  const classes = useStyles();

  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={`${classes.wrapper} ${classes.justifyEnd}`}>
      <p className={`${classes.sentText} ${classes.paddingRight}`}>{trimmedName}</p>
      <div className={`${classes.box} ${classes.bgPrimary}`}>
        <p className={`${classes.messageText} ${classes.colorWhite}`}>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className={`${classes.wrapper} ${classes.justifyStart}`}>
      <div className={`${classes.box} ${classes.bgLight}`}>
        <p className={`${classes.messageText} ${classes.colorDark}`}>{text}</p>
      </div>
      <p className={`${classes.sentText} ${classes.paddingLeft}`}>{user}</p>
    </div>
  );
};

export default Message;
