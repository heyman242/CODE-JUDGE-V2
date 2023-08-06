import Problem from "../models/ProblemModel.js";
import { StatusCodes } from "http-status-codes";

export const addProblem = async (req, res) => {
  const problem = await Problem.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "problem added successfully" });
};

export const getProblem = async (req, res) => {
  const problem = await Problem.find({}).select("problemName level");
  res.status(StatusCodes.OK).json({ problem });
};

export const getSingleProblem = async (req, res) => {
    const {problemId} = req.params;
    const problem = await Problem.findById({_id:problemId}).select('-testCases');
    res.status(StatusCodes.OK).json({ problem: problem });
}