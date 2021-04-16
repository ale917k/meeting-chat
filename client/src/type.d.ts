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

// Server Response
type ServerResponse = {
  success: boolean;
  data?: Models[] | Models | SessionRes | string;
  error?: string;
};

// DB Models
type Models = User | Topic;

type User = {
  _id: string;
  username: string;
  born: Date;
  status: boolean;
  activeTopic?: string;
  chatsId?: string[];
  createdAt: Date;
  updatedAt: Date;
};

type Message = {
  userId: string;
  text: string;
};

type Chat = {
  _id: string;
  topicId: string;
  creatorId: string;
  joinerId: string;
  active: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

type Topic = {
  _id: string;
  title: string;
  category: string;
  creatorId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Topics = Topic[];

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

type RegUserTopic = {
  title: string;
  category: string;
  creatorId: string;
};

type LogUserForm = {
  username: string;
  password: string;
};

type CreateActiveTopic = {
  status: boolean;
  topicTitle: string;
  topicCategory: string;
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
    }
  | CreateActiveTopic;
