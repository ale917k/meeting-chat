// Server Response
type ServerResponse = {
  success: boolean;
  data?: Models[] | Models | Record<string, unknown> | string;
  error?: string;
};

type UserType = {
  id: string;
  name: string;
  room: string;
};
