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

  // Track number of topics already loaded
  const [page, setPage] = useState<number>(0);

  // Loader Reference
  const loader = useRef<HTMLDivElement | null>(null);

  // Handle intersection observer to trigger new topics fetches
  useEffect(() => {
    // Increase page number every time the loader ref gets intersected
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];

      if (target.isIntersecting) {
        setPage((prevState) => prevState + 1);
      }
    };

    const options = {
      root: null, // Element used as the viewport for checking target's visibility. Default to browser viewport
      rootMargin: "0px", // Margin around the root
      threshold: 0.1, // percentage of the target's visibility the observer's callback should be executed
    };

    // initialize IntersectionObserver and attach to loader reference
    const observer = new IntersectionObserver(handleObserver, options);
    loader.current && observer.observe(loader.current);
  }, []);

  // Trigger new topics fetch every time the page number changes (increases)
  useEffect(() => {
    retrieveTopics(page)
      .then((res) => {
        dispatch({
          type: TopicsTypes.Set,
          payload: res,
        });
      })
      .catch((err) => console.error("retrieveTopics Topics err", err));
  }, [page]);

  return (
    <div className={classes.topics}>
      <div className={classes.scrollWrapper}>
        {topics?.map(
          ({ title, category, active }, index) => active && <Topic key={index} title={title} category={category} />,
        )}

        <div className={classes.loader} ref={loader} />

        <h2>Oops! Finito tutto!</h2>
      </div>
    </div>
  );
};

export default Topics;
