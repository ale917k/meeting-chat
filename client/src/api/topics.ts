import { get, post, patch } from "api";

/**
 * Retrieve active Topic of logged User.
 * @param {string} topicId - Id of topic to retrieve.
 * @returns {Topic} Active Topic document.
 */
export const retrieveTopic = async (topicId: string): Promise<Topic> => {
  try {
    const response = await get(`/api/topics/${topicId}`);
    return response?.data as Topic;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Retrieve list of Topics at specified skip number.
 * @param {number} skip - Number of entries to skip before fetching new data.
 * @returns {Topics} Array of Topics.
 */
export const retrieveTopics = async (skip: number): Promise<Topics> => {
  try {
    const response = await get(`/api/topics?skip=${skip}`);
    return response?.data as Topics;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Create new Topic.
 * @param {object} newData - Title, category and creatorId for creating new Topic.
 * @returns {string} Newly created Topic.
 */
export const addNewTopic = async (newData: RegUserTopic): Promise<string> => {
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
export const disableTopic = async (creatorId: string): Promise<boolean> => {
  try {
    await patch("/api/topics", { creatorId });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};
