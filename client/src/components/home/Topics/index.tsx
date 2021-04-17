import React, { useContext, useEffect, useState } from "react";
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

  const { user, topics, dispatch } = useContext(Store);

  // Limit of fetched topics at each call
  const limit = 10;

  // Offset to fetch new data before reaching limit value (to avoid showing fetching in progress)
  const offset = 3;

  // Active topic currently viewed, used as reference for fetching new values
  const [activeTopic, setActiveTopic] = useState<number>(0);

  // Trigger new topics fetch every time the current viewed topic is the third to last
  useEffect(() => {
    if (user) {
      // Calculate active viewed topic to trigger new fetch based on defined offset and limit values
      (!topics.length || (activeTopic + offset) % limit === 0) &&
        retrieveTopics(user._id, topics.length)
          .then((res) => {
            dispatch({
              type: TopicsTypes.Set,
              payload: res,
            });
          })
          .catch((err) => console.error("retrieveTopics Topics err", err));
    }
  }, [activeTopic]);

  return (
    <div className={classes.topics}>
      {topics?.[activeTopic] ? (
        <Topic
          _id={topics[activeTopic]._id}
          title={topics[activeTopic].title}
          category={topics[activeTopic].category}
          creatorId={topics[activeTopic].creatorId}
          setActiveTopic={setActiveTopic}
        />
      ) : topics.length ? (
        <h2>Oops! Finito tutto!</h2>
      ) : null}
    </div>
  );
};

export default Topics;
