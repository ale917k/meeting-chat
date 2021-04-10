declare module "react-emoji";

// Context Actions
type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// Dispatch actions for UserType
type UserDispatch = {
  type: string;
  payload: User;
};

// Server Response
type ServerResponse = {
  success: boolean;
  data: Models[] | Models | Record<string, unknown> | string;
  error?: string;
};

// DB Models
type Models = User;

type User = {
  _id: string;
  name: string;
  born: Date;
  status: boolean;
  activeTopic?: {
    title: string;
    category: string;
  };
  chats?: string[];
};

type UserMessage = {
  id: string;
  name: string;
  room: string;
};

type Message = {
  user: string;
  text: string;
};

// Global
type AlertMessage = {
  isActive: boolean;
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string;
};

// User registration / login and edit user info forms
type RegUserForm = {
  name: string;
  born: Date | null;
  status: boolean;
  password: string;
  topicTitle: string;
  topicCategory: string;
};

type LogUserForm = {
  name: string;
  password: string;
};

type EditUserInfo = {
  name?: string;
  email?: string;
};

type EditUserPsw = {
  oldPassword: string;
  newPassword: string;
};
