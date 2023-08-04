import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problemId: {
    type: mongoose.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  language: {
    type: String,
    enum: ["cpp", "py"],
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "Accepted", "Wrong Answer"],
  },
});

export default mongoose.model("Submission", SubmissionSchema)