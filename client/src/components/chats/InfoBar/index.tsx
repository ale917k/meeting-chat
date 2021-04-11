import React from "react";
import onlineIcon from "icons/onlineIcon.png";
import closeIcon from "icons/closeIcon.png";
import useStyles from "./styles";

type Props = {
  room: string;
};

/**
 * Top bar displaying chat information.
 * @param {string} room - Chat room name to display.
 */
const InfoBar: React.FC<Props> = ({ room }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftContainer}>
        <img className={classes.onlineIcon} src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
      </div>
      <div className={classes.rightContainer}>
        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
