import { useEffect, useState, useRef } from "react";
import customFetch from "../utils/customFetch";
import { useNavigate, useParams } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";
import Wrapper from "../assets/wrappers/solvePage";

const Solve = () => {
  const [loading, setLoading] = useState(true);
  const [problemData, setProblemData] = useState(null);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { problemId } = useParams();
  const navigate = useNavigate();
  const ref = useRef();

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

  const submitHandler = () => {
    if (isLoading) return;
    setIsLoading(true);

    customFetch
      .post(`/submission/${problemId}/verdict`, {
        code,
        language: "cpp",
        withCredentials: true,
      })
      .then((res) => {
        const { data } = res;
        const jobId = data.jobId;
        navigate(`/dashboard/submission/status/${jobId}`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
        <button onClick={submitHandler}>Submit</button>
        <div ref={ref} />
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
