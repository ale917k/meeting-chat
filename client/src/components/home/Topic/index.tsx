import React, { Dispatch, SetStateAction } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";

type Props = {
  title: string;
  category: string;
  setActiveTopic: Dispatch<SetStateAction<number>>;
};

/**
 * Topic card
 */
const Topic: React.FC<Props> = ({ title, category, setActiveTopic }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={title} subheader={category} />

      <CardContent>
        <Button variant="contained" color="primary" onClick={() => setActiveTopic((prevState) => prevState + 1)}>
          Cambia
        </Button>
        <Button variant="contained" color="primary" onClick={joinChat}>
          Inizia chat
        </Button>
      </CardContent>
    </Card>
  );
};

export default Topic;
