import React, { useContext, useEffect } from "react";
import { retrieveTopics } from "api/topics";
import Store from "context";
import Topic from "components/home/Topic";
import TopicsTypes from "context/topics/types";
import useStyles from "./styles";

/**
 * List of lazy loaded Topics displayed on infinite scroll effect.
 */
const Topics: React.FC = () => {
  const classes = useStyles();

  const { topics, dispatch } = useContext(Store);

  useEffect(() => {
    !topics.length &&
      retrieveTopics()
        .then((res) =>
          dispatch({
            type: TopicsTypes.Set,
            payload: res,
          }),
        )
        .catch((err) => console.error("retrieveTopics Topics err", err));
  }, []);

  return (
    <div className={classes.topics}>
      {topics?.map(
        ({ title, category, active }, index) => active && <Topic key={index} title={title} category={category} />,
      )}
    </div>
  );
};

export default Topics;
