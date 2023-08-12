import Problem from "../models/ProblemModel.js";
import Submission from "../models/SubmissionModel.js";
import { StatusCodes } from "http-status-codes";
import generateFile from "../codeCompilation/generateFile.js";
import addJobQueue from "../codeCompilation/jobQueue.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const Verdict = async (req, res) => {
  const { code, language } = req.body;
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
  const { submissionId } = req.params;
  console.log("Status requested for jobId:", submissionId);

  if (!submissionId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing id query param" });
  }

  try {
    const job = await Submission.findById(submissionId);
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
    return res.status(500).json({
      success: false,
      message: "Error fetching job status",
      error: err.message,
    });
  }
};

export const showStats = async (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

  try {
    let stats = await Submission.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    let submittedCount = 0;
    let acceptedCount = 0;
    let wrongAnswerCount = 0;

    stats.forEach((stat) => {
      if (stat._id === "Accepted") {
        acceptedCount = stat.count;
      } else if (stat._id === "Wrong_Answer") {
        wrongAnswerCount = stat.count;
      }
    });

    submittedCount = acceptedCount + wrongAnswerCount;

    const defaultStats = {
      submitted: submittedCount,
      Accepted: acceptedCount,
      Wrong_Answer: wrongAnswerCount,
    };

    res.status(StatusCodes.OK).json({ defaultStats });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

