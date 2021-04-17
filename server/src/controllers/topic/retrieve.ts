import { Request, Response } from "express";
import Topic from "server/models/Topic";

/**
 * Retrieve Topics (limited to 5), starting from Topic n. 'page'.
 * @returns array of Topics from pos. 'page'.
 */
const retrieveTopics = () => async (req: Request, res: Response) => {
  try {
    // Check if page param has been parsed and is a digit (0-9) only, otherwise fallback to page=0
    const page = req.query.page && /^\d+$/.test(req.query.page.toString()) ? Number(req.query.page) : 0;

    // Number of topics fetched and retrieved at each call
    const limit = 10;

    // Fetched topics
    const topics = await Topic.find({}, undefined, { skip: page * limit, limit });

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
