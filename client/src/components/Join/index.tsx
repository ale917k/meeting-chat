import React, { useState } from "react";
import { Link } from "react-router-dom";
import { JoinOuterContainer, JoinInnerContainer, Heading, JoinInput, Button } from "./styles";

const Join: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <JoinOuterContainer>
      <JoinInnerContainer>
        <Heading>Join</Heading>
        <JoinInput placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} />
        <JoinInput placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} />
        <Link onClick={(e) => (!name || !room ? e.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
          <Button type="submit">Sign In</Button>
        </Link>
      </JoinInnerContainer>
    </JoinOuterContainer>
  );
};

export default Join;
