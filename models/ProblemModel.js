import mongoose from "mongoose";

const TestCaseSchema = new mongoose.Schema({
  input: [mongoose.Schema.Types.Mixed],
  output: [mongoose.Schema.Types.Mixed],
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
    type: TestCaseSchema,
    required: true,
  },
});

export default mongoose.model("Problem", ProblemSchema);
