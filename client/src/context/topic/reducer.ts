import TopicActions from "./actions";
import TopicTypes from "./types";

const topicReducer = (state: Topic | null, action: TopicActions): Topic | null => {
  switch (action.type) {
    case TopicTypes.Set:
      return { ...state, ...action.payload } as Topic;
    case TopicTypes.Clear:
      return null;
    default:
      return state;
  }
};

export default topicReducer;
