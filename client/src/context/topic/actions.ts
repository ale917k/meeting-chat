import TopicTypes from "./types";

type TopicPayload = {
  [TopicTypes.Set]: Topic;
  [TopicTypes.Clear]: null;
};

type TopicActions = ActionMap<TopicPayload>[keyof ActionMap<TopicPayload>];

export default TopicActions;
