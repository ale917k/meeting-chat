import React, { useContext, useEffect, useState, useRef } from "react";
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

  // Limit of fetched topics at each call
  const limit = 10;

  // Offset to fetch new data before reaching limit value (to avoid showing fetching in progress)
  const offset = 3;

  // Active topic currently viewed, used as reference for fetching new values
  const [activeTopic, setActiveTopic] = useState<number>(0);

  // Loader Reference
  const loader = useRef<HTMLDivElement | null>(null);

  // Trigger new topics fetch every time the current viewed topic is the third to last
  useEffect(() => {
    (!topics.length || (activeTopic + offset) % limit === 0) &&
      retrieveTopics(topics.length)
        .then((res) => {
          dispatch({
            type: TopicsTypes.Set,
            payload: res,
          });
          console.log("fetched!", res);
        })
        .catch((err) => console.error("retrieveTopics Topics err", err));
  }, [activeTopic]);

  return (
    <div className={classes.topics}>
      {topics?.[activeTopic] ? (
        <div className={classes.scrollWrapper}>
          <Topic
            title={topics[activeTopic].title}
            category={topics[activeTopic].category}
            setActiveTopic={setActiveTopic}
          />

          <div className={classes.loader} ref={loader} />
        </div>
      ) : topics.length ? (
        <h2>Oops! Finito tutto!</h2>
      ) : null}
    </div>
  );
};

export default Topics;
