import { Request, Response } from "express";
import Topic from "server/models/Topic";

/**
 * Retrieve Topics (limited to 5), starting from Topic n. 'skip'.
 * @returns array of Topics from pos. 'skip'.
 */
const retrieveTopics = () => async (req: Request, res: Response) => {
  try {
    // Check if skip param has been parsed and is a digit (0-9) only, otherwise fallback to skip=0
    const skip = req.query.skip && /^\d+$/.test(req.query.skip.toString()) ? Number(req.query.skip) : 0;

    // Number of topics fetched and retrieved at each call
    const limit = 10;

    // Fetched topics
    const topics = await Topic.find({}, undefined, { skip, limit });

    return res.status(201).json({
      success: true,
      data: topics,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      success: false,
      error: `Failed Retrieving Topics: ${err}`,
    });
  }
};

export default retrieveTopics;
