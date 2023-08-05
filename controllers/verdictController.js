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

export const getStatus = async (req, res) => {
  const jobId = req.query.id;
  console.log("status requested", jobId);

  if (jobId == undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  try {
    const job = await Submission.findById(jobId).exec();
    if (!job) {
      return res.status(400).json({ success: false, error: "invalid job id" });
    }
    return res.status(200).json({ success: true, job });
  } catch (err) {
    return res.status(500).json({ success: false, error: `${err}` });
  }
};
