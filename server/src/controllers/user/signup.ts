import { Request, Response } from "express";
import passport from "passport";
import User, { UserDocument } from "server/models/User";
import { createSessions } from "./sessions";

/**
 * Register new user through passport authentication.
 * @param {Request} req - Express request for handling request body.
 * @param {Response} res - Express response for returning authentication result.
 * @return {ServerResponse} Server response as Promise.
 */
const handleSignup = (req: Request, res: Response): Promise<ServerResponse> => {
  return new Promise((resolve, reject) => {
    const user = new User(req.body);

    User.register(user, req.body.password)
      .then(() => {
        passport.authenticate("local")(req, res, () => {
          resolve({
            success: true,
            data: (req.user as UserDocument)._id,
          });
        });
      })
      .catch((err) => {
        console.log("err", err);
        reject({
          success: false,
          error: `Failed Creating User: ${err}`,
        });
      });
  });
};

/**
 * Register new user and generate new session.
 */
export const signupAuthentication = () => (req: Request, res: Response) => {
  handleSignup(req, res)
    .then((res: ServerResponse) => (res.data ? createSessions(res.data) : Promise.reject(res)))
    .then((session) => res.status(201).json(session))
    .catch((err) => res.status(500).json(err));
};
