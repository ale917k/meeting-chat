import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import useStyles from "./styles";

/**
 * Main Navigation Header bar.
 */
const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton component={Link} to="/" color="inherit">
          <HomeRoundedIcon />
        </IconButton>
        <IconButton component={Link} to="/chats" color="inherit">
          <QuestionAnswerRoundedIcon />
        </IconButton>
        <IconButton component={Link} to="/impostazioni" color="inherit">
          <TuneRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
