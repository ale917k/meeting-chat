import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import Store from "context";
import UserTypes from "context/user/types";
import TopicsTypes from "context/topics/types";
import useStyles from "./styles";

/**
 * Main Navigation Header bar.
 */
const Header: React.FC = () => {
  const classes = useStyles();

  const { dispatch } = useContext(Store);

  // Logout User
  const logout = () => {
    dispatch({
      type: UserTypes.Clear,
      payload: null,
    });

    dispatch({
      type: TopicsTypes.Clear,
      payload: [],
    });

    // Remove session token
    window.localStorage.removeItem("mChatAccToken");
  };

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
        <IconButton component={Link} to="/" onClick={logout} color="inherit">
          <ExitToAppRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
