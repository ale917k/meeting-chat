import express from "express";
import passport from "passport";
import User from "server/models/User";
import { signinAuthentication, failedSignin } from "server/controllers/user/signin";
import { signupAuthentication } from "server/controllers/user/signup";

// Initialized userAPI router with passport middleware
const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

// Requests targetting all Users
router
  .route("/")
  .get((_, res) => {
    User.find()
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.warn(`Failed Retrieving Users: ${err}`);
        res.status(500).json({
          success: false,
          error: `Failed Retrieving Users: ${err}`,
        });
      });
  })
  .post(signupAuthentication());

// Requests targetting a specific User
router.post("/signin", signinAuthentication());
router.get("/failedSignin", failedSignin());

router
  .route("/:userId")
  .get((req, res) => {
    User.findOne({ _id: req.params.userId })
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.warn(`Failed Retrieving User: ${err}`);
        res.status(500).json({
          success: false,
          error: `Failed Retrieving User: ${err}`,
        });
      });
  })
  .patch((req, res) => {
    // Set New Password
    if (req.body.oldPassword) {
      User.findOne({ _id: req.params.userId })
        .then((user) => {
          if (user) {
            user.changePassword(req.body.oldPassword, req.body.newPassword, (err) => {
              if (err) {
                res.status(500).json({
                  success: false,
                  error: "Password corrente incorretta",
                });
              } else {
                const { hash, salt, ...updatedUser } = user;
                res.status(201).json({
                  success: true,
                  data: updatedUser,
                });
              }
            });
          } else {
            res.status(500).json({
              success: false,
              error: "User does not exist. Failed Setting New Password",
            });
          }
        })
        .catch((err) => {
          console.warn(`Failed Setting New Password: ${err}`);
          res.status(500).json({
            success: false,
            error: `Failed Setting New Password: ${err}`,
          });
        });
      // Reset Password
    } else if (req.body.newPassword) {
      User.findOne({ _id: req.params.userId })
        .then((user) => {
          if (user) {
            user.setPassword(req.body.newPassword, (err) => {
              if (err) {
                res.status(500).json({
                  success: false,
                  error: `Failed Resetting Password: ${err}`,
                });
              } else {
                user.save();
                const { hash, salt, ...updatedUser } = user;
                res.status(201).json({
                  success: true,
                  data: updatedUser,
                });
              }
            });
          } else {
            res.status(500).json({
              success: false,
              error: "User does not exist. Failed Resetting Password",
            });
          }
        })
        .catch((err) => {
          console.warn(`Failed Resetting Password: ${err}`);
          res.status(500).json({
            success: false,
            error: `Failed Resetting Password: ${err}`,
          });
        });
      // Update User information
    } else {
      User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
        .then((result) => {
          res.status(201).json({
            success: true,
            data: result,
          });
        })
        .catch((err) => {
          console.warn(`Failed Updating User: ${err}`);
          res.status(500).json({
            success: false,
            error: `Failed Updating User: ${err}`,
          });
        });
    }
  })
  .delete((req, res) => {
    User.deleteOne({ _id: req.params.userId })
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.warn(`Failed Deleting User: ${err}`);
        res.status(500).json({
          success: false,
          error: `Failed Deleting User: ${err}`,
        });
      });
  });

export default router;
