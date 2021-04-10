declare module "react-emoji";

// Models
type User = {
  id: string;
  name: string;
  room: string;
};

type Message = {
  user: string;
  text: string;
};
