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
  data?: Models[] | Models | Record<string, unknown> | string;
  error?: string;
};

// DB Models
type Models = User | Chat;

type User = {
  _id: string;
  username: string;
  born: Date;
  status: boolean;
  activeTopic?: string;
  chats?: string[];
  createdAt: Date;
  updatedAt: Date;
};

type Message = {
  user: string;
  text: string;
};

type Chat = {
  _id: string;
  title: string;
  category: string;
  creatorId: string;
  joinerId: string;
  active: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

// Global
type AlertMessage = {
  isActive: boolean;
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string;
};

// User registration / login and edit user info forms
type RegUserForm = {
  username: string;
  born: Date | null;
  status: boolean;
  password: string;
  topicTitle: string;
  topicCategory: string;
};

type RegUserChat = {
  title: string;
  category: string;
  creatorId: string;
};

type LogUserForm = {
  username: string;
  password: string;
};

type EditUserForm =
  | {
      username: string;
    }
  | {
      oldPassword: string;
      newPassword: string;
    }
  | {
      activeTopic: string;
    };
