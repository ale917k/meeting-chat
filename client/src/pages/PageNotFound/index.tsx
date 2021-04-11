import React from "react";
import useStyles from "./styles";

/**
 * Basic 404 fallback page.
 */
const PageNotFound: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.wrapper}>404 | Pagina Non Trovata</div>;
};

export default PageNotFound;
