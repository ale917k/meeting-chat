import { get, post, patch } from "api";

/**
 * Retrieve active Topic of logged User.
 * @param {string} topicId - Id of topic to retrieve.
 * @returns {Topic | undefined} Either Topic document or undefined if errored.
 */
export const retrieveTopic = async (topicId: string): Promise<Topic | undefined> => {
  try {
    const response = await get(`/api/topics/${topicId}`);
    return response?.data as Topic;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Create new Topic.
 * @param {object} newData - Title, category and creatorId for creating new Topic.
 * @returns {string | undefined} Either newly created Topic id or undefined if errored.
 */
export const addNewTopic = async (newData: RegUserTopic): Promise<string | undefined> => {
  try {
    const response = await post("/api/topics", newData);

    return response?.data as string;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Disable active Topic.
 * @param {string} creatorId - User id who created the Topic to disable.
 * @returns {boolean | undefined} Either true if disabled successfully or undefined if errored.
 */
export const disableTopic = async (creatorId: string): Promise<boolean | undefined> => {
  console.log("we disabling");
  try {
    await patch("/api/topics", { creatorId });
    return true;
  } catch (err) {
    console.log("errored", err);
    throw new Error(err.message);
  }
};
