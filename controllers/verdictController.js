import Problem from "../models/ProblemModel.js";
import Submission from "../models/SubmissionModel.js";
import { StatusCodes } from "http-status-codes";
import generateFile from "../codeCompilation/generateFile.js";
import addJobQueue from "../codeCompilation/jobQueue.js";

export const Verdict = async (req, res) => {
  const { code, language } = req.body;
  const { userId, problemId } = req.params;

  if (code === undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ success: false, error: "Empty code body!" });
  }
  try {
    const filePath = generateFile(language, code);

    const job = await new Submission({
      language,
      filePath,
      userId,
      problemId,
    }).save();
    const jobId = job["_id"];

    addJobQueue(jobId);
    return res.status(201).json({ success: true, jobId });
  } catch (err) {
    return res.status(500).json({ success: false, error: JSON.stringify(err) });
  }
};
