import { post } from "api";

/**
 * Create new Chat.
 * @param {object} newData - Chat object with properties for creating new Chat.
 * @returns {string} Newly created Chat.
 */
export const addNewChat = async (newData: Chat): Promise<Chat> => {
  try {
    const response = await post("/api/chats", newData);

    return response?.data as Chat;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default addNewChat;
