import express from "express";
import retrieveTopics from "server/controllers/topic/retrieve";
import Topic from "server/models/Topic";

// Initialized topicAPI router
const router = express.Router();

// Requests targetting all Topics
router
  .route("/")
  .get(retrieveTopics())
  .post((req, res) => {
    const newTopic = new Topic({
      title: req.body.title,
      category: req.body.category,
      creatorId: req.body.creatorId,
      active: true,
    });

    newTopic
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          data: newTopic._id,
        });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Adding Topic: ${err}`,
        });
      });
  })
  .patch((req, res) => {
    // Disable topic if creator (user) id is parsed
    Topic.updateOne({ creatorId: req.body.creatorId }, { active: false })
      .then(() => {
        res.status(201).json({
          success: true,
        });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({
          success: false,
          error: `Failed Disabling Topic: ${err}`,
        });
      });
  });

// Requests targetting a specific Topic
router
  .route("/:topicId")
  .get((req, res) => {
    Topic.findOne({ _id: req.params.topicId })
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
          error: `Failed Retrieving Topic: ${err}`,
        });
      });
  })
  .patch((req, res) => {
    Topic.updateOne({ _id: req.params.topicId }, req.body)
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
          error: `Failed Updating Topic: ${err}`,
        });
      });
  })
  .delete((req, res) => {
    Topic.deleteOne({ _id: req.params.topicId })
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
          error: `Failed Deleting Topic: ${err}`,
        });
      });
  });

export default router;
