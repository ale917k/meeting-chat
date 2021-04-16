import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import useStyles from "./styles";

type Props = {
  title: string;
  category: string;
};

/**
 * Topic card
 */
const Topic: React.FC<Props> = ({ title, category }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={title} subheader={category} />

      {/* <CardContent>
        <Button
          variant="contained"
          color="primary"
          component={!preview ? RouterLink : "button"}
          to={!preview ? `./articolo/${_id}` : ""}
        >
          Cambia
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={!preview ? RouterLink : "button"}
          to={!preview ? `./articolo/${_id}` : ""}
        >
          Inizia chat
        </Button>
      </CardContent> */}
    </Card>
  );
};

export default Topic;
