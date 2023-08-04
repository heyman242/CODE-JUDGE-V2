





const addJobQueue = async ({ filePath, code, language, userId, problemId }) => {
  await jobQueue.add({ filePath, code, language, userId, problemId });
};

export default addJobQueue;
