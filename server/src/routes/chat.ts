import express from "express";
import Chat from "server/models/Chat";

// Initialized chatAPI router
const router = express.Router();

// Requests targetting all Chats
router
  .route("/")
  .get((_, res) => {
    Chat.find()
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.warn(`Failed Retrieving Chats: ${err}`);
        res.status(500).json({
          success: false,
          error: `Failed Retrieving Chats: ${err}`,
        });
      });
  })
  .post((req, res) => {
    const newChat = new Chat({
      name: req.body.name,
      topicId: req.body.topicId,
      creatorId: req.body.creatorId,
      joinerId: req.body.joinerId,
      active: req.body.active,
      messages: req.body.messages,
    });

    newChat
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          data: newChat,
        });
      })
      .catch((err) => {
        console.warn("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Adding Chat: ${err}`,
        });
      });
  });

// Requests targetting a specific Chat
router
  .route("/:chatId")
  .get((req, res) => {
    Chat.findOne({ _id: req.params.chatId })
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.warn("err", err);
        res.status(500).json({
          success: false,
          error: err,
        });
      });
  })
  .patch((req, res) => {
    Chat.updateOne({ _id: req.params.chatId }, req.body)
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.warn("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Updating Chat: ${err}`,
        });
      });
  })
  .delete((req, res) => {
    Chat.deleteOne({ _id: req.params.chatId })
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.warn("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Deleting Chat: ${err}`,
        });
      });
  });

export default router;
