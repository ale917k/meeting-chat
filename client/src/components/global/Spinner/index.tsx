import React from "react";
import useStyles from "./styles";

/**
 * Spinner component, used for lazy loaded pages / components.
 */
const Spinner: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.spinner} />
    </div>
  );
};

export default Spinner;
