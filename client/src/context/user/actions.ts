import UserTypes from "./types";

type UserPayload = {
  [UserTypes.Set]: User;
  [UserTypes.Clear]: null;
};

type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export default UserActions;
