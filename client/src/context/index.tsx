import React, { createContext, useReducer, Dispatch } from "react";
import UserActions from "./user/actions";
import userReducer from "./user/reducer";
import TopicActions from "./topic/actions";
import topicReducer from "./topic/reducer";
import TopicsActions from "./topics/actions";
import topicsReducer from "./topics/reducer";

type InitialState = {
  user: User | null;
  topic: Topic | null;
  topics: Topics;
};

type Actions = UserActions | TopicActions | TopicsActions;

type Context = InitialState & {
  dispatch: Dispatch<Actions>;
};

// Context Initial State
const initialState = {
  user: null,
  topic: null,
  topics: [],
};

// Store for consuming Context on App
const Store = createContext<Context>({
  ...initialState,
  dispatch: () => null,
});

// Main Context reducer
const mainReducer = ({ user, topic, topics }: InitialState, action: Actions) => ({
  user: userReducer(user, action as UserActions),
  topic: topicReducer(topic, action as TopicActions),
  topics: topicsReducer(topics, action as TopicsActions),
});

// Context Provider
export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <Store.Provider value={{ ...state, dispatch }}>{children}</Store.Provider>;
};

export default Store;
