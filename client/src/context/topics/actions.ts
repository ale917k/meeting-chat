import TopicsTypes from "./types";

type TopicsPayload = {
  [TopicsTypes.Set]: Topics;
  [TopicsTypes.Clear]: [];
};

type TopicsActions = ActionMap<TopicsPayload>[keyof ActionMap<TopicsPayload>];

export default TopicsActions;
