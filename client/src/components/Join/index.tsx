import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Join: React.FC = () => {
  const classes = useStyles();

  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <h1 className={classes.heading}>Join</h1>
        <input
          type="text"
          className={classes.input}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          className={classes.input}
          onChange={(event) => setRoom(event.target.value)}
          placeholder="Room"
        />
        <Link onClick={(e) => (!name || !room ? e.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
          <button type="submit" className={classes.button}>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
