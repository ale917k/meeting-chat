import React, { createContext, useReducer, Dispatch } from "react";
import UserActions from "./user/actions";
import userReducer from "./user/reducer";

type InitialState = {
  user: User | null;
};

// Context Initial State
const initialState = {
  user: null,
};

// Store for consuming Context on App
const Store = createContext<{
  user: User | null;
  dispatch: Dispatch<UserActions>;
}>({
  user: initialState.user,
  dispatch: () => null,
});

// Main Context reducer
const mainReducer = ({ user }: InitialState, action: UserActions) => ({
  user: userReducer(user, action as UserActions),
});

// Context Provider
export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <Store.Provider value={{ ...state, dispatch }}>{children}</Store.Provider>;
};

export default Store;
