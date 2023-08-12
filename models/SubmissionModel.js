import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  problemId: {
    type: mongoose.Types.ObjectId,
    ref: "Problem",
  },
  language: {
    type: String,
    enum: ["cpp", "py"],
    required: true,
  },
  code: {
    type: String,
  },
  filePath: {
    type: String,
    required: true,
  },
  startedAt: {
    type: Date,
  },
  output: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "Accepted", "Wrong_Answer"],
  },
});

export default mongoose.model("Submission", SubmissionSchema);
