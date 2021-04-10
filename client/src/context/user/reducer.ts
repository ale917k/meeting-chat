import UserActions from "./actions";
import UserTypes from "./types";

const userReducer = (state: User | null, action: UserActions): User | null => {
  switch (action.type) {
    case UserTypes.Set:
      return { ...state, ...action.payload } as User;
    case UserTypes.Clear:
      return null;
    default:
      return state;
  }
};

export default userReducer;
