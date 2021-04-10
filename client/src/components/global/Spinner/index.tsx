import React from "react";
import useStyles from "./styles";

/**
 * Spinner component, used when lazy loading pages / components.
 * @return - Spinner animated through css keyframes.
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
