import React from "react";
import onlineIcon from "icons/onlineIcon.png";
import closeIcon from "icons/closeIcon.png";
import useStyles from "./styles";

type PropsType = {
  room: string;
};

const InfoBar: React.FC<PropsType> = ({ room }: PropsType) => {
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
