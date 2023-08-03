import mongoose from "mongoose";

const TestcaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const ProblemSchema = new mongoose.Schema({
  problemName: {
    type: String,
    required: true,
    unique: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  sampleInputs: {
    type: String,
    required: true,
  },
  sampleOutputs: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  testCases: {
    type: [TestcaseSchema],
    required: true,
  },
});

export default mongoose.model("Problem", ProblemSchema);
