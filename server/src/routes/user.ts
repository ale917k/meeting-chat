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
        console.log("err", err);
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
        console.log("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Retrieving User: ${err}`,
        });
      });
  })
  .patch((req, res) => {
    // Update User information
    User.updateOne({ _id: req.params.userId }, req.body)
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Updating User: ${err}`,
        });
      });
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
        console.log("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Deleting User: ${err}`,
        });
      });
  });

export default router;
