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
            data: user,
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
    .then((signupRes: ServerResponse) => {
      if (signupRes.data) {
        const { hash, salt, ...newUser } = signupRes.data.toObject();

        createSessions(signupRes.data._id)
          .then((sessionRes: ServerResponse) => {
            res.status(201).json({
              success: true,
              data: {
                ...newUser,
                token: sessionRes.data.token,
              },
            });
          })
          .catch((err) => Promise.reject(err));
      } else {
        Promise.reject(signupRes);
      }
    })
    .catch((err) => res.status(500).json(err));
};
