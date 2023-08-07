import Problem from "../models/ProblemModel.js";
import Submission from "../models/SubmissionModel.js";
import { REQUEST_URI_TOO_LONG, StatusCodes } from "http-status-codes";
import generateFile from "../codeCompilation/generateFile.js";
import addJobQueue from "../codeCompilation/jobQueue.js";
import jwt from "jsonwebtoken";


export const Verdict = async (req, res) => {
  const { code, language} = req.body;
  const { problemId } = req.params;

  if (code === undefined) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ success: false, error: "Empty code body!" });
  }
  
  const token = req.cookies.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decodedToken.userId;
    console.log(userId); 
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
  console.log("Status requested for jobId:", jobId);

  if (!jobId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing id query param" });
  }

  try {
    const job = await Submission.findById(jobId).exec();
    console.log(job);
    if (!job) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job id" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Job status fetched successfully", job });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching job status",
        error: err.message,
      });
  }
};
