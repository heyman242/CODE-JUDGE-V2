import React, { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";
import Wrapper from "../assets/wrappers/solvePage";

const Solve = () => {
  const [loading, setLoading] = useState(true);
  const [problemData, setProblemData] = useState(null);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const { problemId } = useParams();

  useEffect(() => {
    fetchData();
  }, [problemId]);

  const fetchData = async () => {
    try {
      const { data } = await customFetch.get(`/problem/${problemId}`);
      setProblemData(data.problem);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching problem data:", error);
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = async () => {
    try {
      // Send the code to the backend for verdict
      const { jobId } = await customFetch.post(
        `/submission/${problemId}/verdict`,
        {
          code,
          language: "cpp",
          withCredentials: true,
        }
      );

      // Poll the backend to get the status
      let isRunning = true;
      while (isRunning) {
        try {
          const { success, job } = await customFetch.get(
            `/submission/${problemId}/status`,
            { params: { id: jobId } } // Pass jobId as a query parameter
          );
          
          console.log(jobId);

        
          if (success && job) {
            setStatus(job.status);
            if (job.status !== "Pending" && job.status !== "Running") {
              isRunning = false;
            }
          }
        } catch (error) {
          console.error("Error fetching status:", error);
          setStatus("Error");
          isRunning = false;
        }

        await new Promise((resolve) => setTimeout(resolve, 5000)); // Poll every 1 second
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      setStatus("Error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!problemData) {
    return <div>Error: Problem not found.</div>;
  }

  return (
    <Wrapper>
      <div className="problem-detail">
        <h2>
          <u>{problemData.problemName}</u>
        </h2>
        <br />
        <h5>Problem Detail:- {problemData.problemStatement}</h5>
        <br />
        <h5>Sample Inputs: {problemData.sampleInputs}</h5>
        <h5>Sample Outputs: {problemData.sampleOutputs}</h5>
        <br />
        <h5>Level: {problemData.level}</h5>
        {/* Add the Submit button here */}
        <button onClick={handleSubmit}>Submit</button>
        {/* Display the status */}
        <h5>Status: {status}</h5>
      </div>
      {/* Ace Editor */}
      <AceEditor
        className="ace-editor"
        mode="c_cpp"
        theme="dracula"
        value={code}
        onChange={handleCodeChange}
        readOnly={false}
        fontSize={20}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
      />
    </Wrapper>
  );
};

export default Solve;
