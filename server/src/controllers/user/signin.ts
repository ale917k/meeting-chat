import { Request, Response } from "express";
import passport from "passport";
import User, { UserDocument } from "server/models/User";
import { getAuthTokenId, createSessions } from "./sessions";

/**
 * Log user through passport authentication.
 * @param {Request} req - Express request for handling request body.
 * @param {Response} res - Express response for returning authentication result.
 * @return {Promise} Server response as Promise.
 */
const handleSignin = (req: Request, res: Response): Promise<ServerResponse> => {
  const user = new User({
    username: req.body.username,
  });

  return new Promise((resolve, reject) => {
    try {
      req.login(user, (err) => {
        if (!err) {
          passport.authenticate("local", {
            failureRedirect: "/api/users/failedSignin",
          })(req, res, () => {
            const { _id } = req.user as UserDocument;

            resolve({
              success: true,
              data: _id,
            });
          });
        } else {
          reject({
            success: false,
            error: err,
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Function triggered on unsuccessful login.
 */
export const failedSignin = () => (_: Request, res: Response) => {
  res.status(401).json({
    success: false,
    error: "Unauthorized access",
  });
};

/**
 * Check if user has session, if not then authenticate and create new session.
 */
export const signinAuthentication = () => (req: Request, res: Response) => {
  const { authorization } = req.headers;

  authorization
    ? getAuthTokenId(authorization)
        .then((userId) =>
          res.status(201).json({
            success: true,
            data: userId,
          }),
        )
        .catch((err) =>
          res.status(401).json({
            success: false,
            error: `Unauthorized access - ${err}`,
          }),
        )
    : handleSignin(req, res)
        .then((res: ServerResponse) => (res.data ? createSessions(res.data) : Promise.reject(res)))
        .then((session) => res.status(201).json(session))
        .catch((err) => res.status(500).json(err));
};
