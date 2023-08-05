import Queue from "bull";
const jobQueue = new Queue("job-queue");
const NUM_WORKERS = 5;

import Problem from "../models/ProblemModel.js";
import Submission from "../models/SubmissionModel.js";
import compilationCpp from "./compilationCpp.js";

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const { id: jobId } = data;
  const job = await Submission.findById(jobId);

  const problemId = job.problemId;
  const problem = await Problem.findById(problemId);

  if (job === undefined) {
    throw Error("job not found");
  }

  try {
    let response;
    job["startedAt"] = new Date();
    if (job.language === "cpp") {
      response = await compilationCpp(problem.testCases, job.filePath);
    }
    job["completedAt"] = new Date();
    job["status"] = "Accepted";
    job["output"] = JSON.stringify(response);
    await job.save();
  } catch (err) {
    console.log("response: ", err);
    job["completedAt"] = new Date();
    job["status"] = "Wrong Answer";
    job["output"] = JSON.stringify(err);
    await job.save();
  }

  return true;
});

jobQueue.on("failed", (err) => {
  console.log(err.data.id, "failed", err.failedReason);
});

const addJobQueue = async (jobId) => {
  await jobQueue.add({ id: jobId });
};

export default addJobQueue;
