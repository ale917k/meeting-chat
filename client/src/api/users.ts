import { get, post, patch } from "api";

/**
 * Retrieve User with specified ID.
 * @param {string} userId - Id of user to retrieve.
 * @returns {Models | undefined} Either User document or undefined if errored.
 */
export const retrieveUser = async (userId: string): Promise<Models | undefined> => {
  try {
    const response = await get(`/api/users/${userId}`);
    return response?.data as Models;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Login specific User through session tokens.
 * @param {string} token - JWT authentication token.
 * @returns {string | undefined} Either User id or undefined if errored.
 */
export const loginUserWithToken = async (token: string): Promise<string | undefined> => {
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
 * @param {Object} authData - Object containing the User info for login authentication.
 * @param {boolean} admin - If true log admin users.
 * @returns {User | undefined} Either User document or undefined if errored.
 */
export const loginUser = async (authData: LogUserForm, admin: boolean): Promise<User | undefined> => {
  try {
    const response = await post("/api/users/signin", { ...authData, admin });

    type SessionRes = {
      userId: string;
      token: string;
    };

    // Set localStorage token
    response?.data &&
      window.localStorage.setItem(admin ? "mChatAdmAccToken" : "mChatAccToken", (response.data as SessionRes).token);

    return retrieveUser((response?.data as SessionRes).userId as string)
      .then((user) => user as User)
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Register new User.
 * @param {Object} newData - Object containing the new User entry to insert into the database.
 * @param {boolean} admin - If true log admin users.
 * @returns {User | undefined} Either User document or undefined if errored.
 */
export const addNewUser = async (newData: RegUserForm | User, admin: boolean): Promise<User | undefined> => {
  console.log("newData", newData);
  try {
    const response = await post("/api/users", newData);

    type SessionRes = {
      userId: string;
      token: string;
    };

    // Set localStorage token
    response?.data &&
      window.localStorage.setItem(admin ? "mChatAdmAccToken" : "mChatAccToken", (response.data as SessionRes).token);

    return retrieveUser((response?.data as SessionRes).userId as string)
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
 * @param {Object} oldData - Object containing the old User information.
 * @param {Object} newData - Object containing the new User information which need to be updated.
 * @returns {string | undefined} Either User document or undefined if errored.
 */
export const editUser = async (oldData: User, newData: EditUserInfo | EditUserPsw): Promise<User | undefined> => {
  try {
    const response = await patch(`/api/users/${oldData._id}`, newData);
    return response?.data as User;
  } catch (err) {
    throw new Error(err.message);
  }
};
