import { post } from "api";

/**
 * Create new Chat.
 * @param {object} newData - Title, category and creatorId for creating new Chat.
 * @returns {string | undefined} Either newly created Chat id or undefined if errored.
 */
export const addNewChat = async (newData: RegUserChat): Promise<string | undefined> => {
  try {
    const response = await post("/api/chats", newData);

    return response?.data as string;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default addNewChat;
