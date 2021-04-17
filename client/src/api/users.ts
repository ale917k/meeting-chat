import { get, post, patch } from "api";
import { addNewTopic, disableTopic } from "api/topics";

/**
 * Retrieve User with specified ID.
 * @param {string} userId - Id of user to retrieve.
 * @returns {User} User document.
 */
export const retrieveUser = async (userId: string): Promise<User> => {
  try {
    const response = await get(`/api/users/${userId}`);
    return response?.data as User;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Login specific User through session tokens.
 * @param {string} token - JWT authentication token.
 * @returns {string} Either User id or undefined if errored.
 */
export const loginUserWithToken = async (token: string): Promise<string> => {
  try {
    const response = await post("/api/users/signin", null, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token, // prettier-ignore
      },
    });
    return response?.data as string;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Log User in.
 * @param {object} authData - Object containing the User info for login authentication.
 * @param {boolean} admin - If true log admin users.
 * @returns {User} Logged User document.
 */
export const loginUser = async (authData: LogUserForm, admin: boolean): Promise<User> => {
  try {
    const response = await post("/api/users/signin", { ...authData, admin });

    type SessionRes = {
      userId: string;
      token: string;
    };

    // Set localStorage token
    response?.data &&
      window.localStorage.setItem(admin ? "mChatAdmAccToken" : "mChatAccToken", (response.data as SessionRes).token);

    return retrieveUser((response?.data as SessionRes).userId)
      .then((user) => user as User)
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Edit User information.
 * @param {object} oldData - Object containing the old User information.
 * @param {object} newData - Object containing the new User information which need to be updated.
 * @returns {User} Edited User document.
 */
export const editUser = async (oldData: User, newData: EditUserForm): Promise<User> => {
  const { status, topicTitle, topicCategory } = newData as CreateActiveTopic;

  // Create new topic if editing user status
  if (Object.prototype.hasOwnProperty.call(newData, "status")) {
    const topicData = {
      title: topicTitle,
      category: topicCategory,
      creatorId: oldData._id,
    };

    // Add new topic if status is true, remove if on false
    if (status) {
      return addNewTopic(topicData)
        .then(async (topicId) => {
          // Update user with activeTopic and status on true
          try {
            const response = await patch(`/api/users/${oldData._id}`, { status: true, activeTopic: topicId });

            return response?.data as User;
          } catch (err) {
            throw new Error(err.message);
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
    disableTopic(oldData._id)
      .then(async () => {
        // Update user removing activeTopic and setting status on false
        try {
          const response = await patch(`/api/users/${oldData._id}`, { status: false, activeTopic: "" });

          return response?.data as User;
        } catch (err) {
          throw new Error(err.message);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  // Edit user info
  try {
    const response = await patch(`/api/users/${oldData._id}`, newData);

    return response?.data as User;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Register new User.
 * @param {object} newData - Object containing the new User entry to insert into the database.
 * @param {boolean} admin - If true log admin users.
 * @returns {object} Object containing user and possibly topic for creating both upon User registration.
 */
export const addNewUser = async (newData: RegUserForm, admin: boolean): Promise<{ user: User; topic?: Topic }> => {
  try {
    const { topicTitle, topicCategory, ...userData } = newData;

    const response = await post("/api/users", userData);

    type UserWithToken = User & { token: string };

    const { token, ...newUser } = response?.data as UserWithToken;

    // Set localStorage token
    response?.data && window.localStorage.setItem(admin ? "mChatAdmAccToken" : "mChatAccToken", token);

    if (newData.status) {
      const topicData = {
        title: topicTitle,
        category: topicCategory,
        creatorId: (response?.data as UserWithToken)._id,
      } as Topic;

      return addNewTopic(topicData)
        .then(async (topicId) => {
          try {
            const updatedUser = await editUser(newUser, { activeTopic: topicId });
            return {
              user: updatedUser,
              topic: topicData,
            };
          } catch (err) {
            throw new Error(err.message);
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
    return { user: newUser };
  } catch (err) {
    throw new Error(err.message);
  }
};
