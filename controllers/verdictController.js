import Problem from "../models/ProblemModel.js";
import Submission from "../models/SubmissionModel.js";
import { StatusCodes } from "http-status-codes";
import generateFile from "../codeCompilation/generateFile.js";
import addJobQueue  from "../codeCompilation/jobQueue.js";

export const Verdict = async (req, res) => {
  const { code, language } = req.body;
  const { userId, problemId } = req.params;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Problem not found" });
    }
    const filePath = generateFile(language, code);
    
    await addJobQueue({ filePath, code, language, userId, problemId });
    res.status(StatusCodes.OK).json({msg:"request succesfull"})


  } catch (error) {
    console.log();
  }
};
