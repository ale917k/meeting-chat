import TopicsActions from "./actions";
import TopicsTypes from "./types";

const topicsReducer = (state: Topics, action: TopicsActions): Topics => {
  switch (action.type) {
    case TopicsTypes.Set:
      return [...state, ...action.payload] as Topics;
    case TopicsTypes.Clear:
      return [];
    default:
      return state;
  }
};

export default topicsReducer;
