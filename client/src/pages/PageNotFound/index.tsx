import React from "react";
import useStyles from "./styles";

/**
 * Basic fallback page when no page is found on selected route.
 * @return - PageNotFound message.
 */
const PageNotFound: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.wrapper}>404 | Pagina Non Trovata</div>;
};

export default PageNotFound;
