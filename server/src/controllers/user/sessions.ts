import jwt from "jsonwebtoken";
import redis from "redis";

// Set up Redis client
const redisClient = redis.createClient(process.env.REDIS_URI);

/**
 * Retrieve Redis token if any.
 * @param {string} authorization - JWT token to validate.
 * @return {Promise} Server response as Promise.
 */
export const getAuthTokenId = (authorization: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    redisClient.get(authorization, (err, id) => {
      if (err || !id) reject(err);
      else resolve(id);
    });
  });
};

/**
 * Sign JWT token.
 * @param {string} _id - User id used as JWT payload.
 * @return {string} New signed JWT token.
 */
const signToken = (_id: string): string => {
  const jwtPayload = { _id };

  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};

/**
 * Save token to Redis database.
 * @param {string} key - JWT token to save as Redis key.
 * @param {string} value - User id to save as Redis value.
 * @return {Promise} Result of the new Redis key-value pair.
 */
const setToken = (key: string, value: string): Promise<unknown> => Promise.resolve(redisClient.set(key, value));

/**
 * Create user session with JWT token saved on Redis database.
 * @param {string} _id - User id for signing new JWT token and save on Redis.
 * @return {Promise} Result of the session creation operation.
 */
export const createSessions = async (_id: string): Promise<ServerResponse> => {
  const token = signToken(_id);

  try {
    await setToken(token, _id.toString());
    return { success: true, data: { userId: _id, token } };
  } catch (err) {
    return err;
  }
};
