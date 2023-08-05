import React, { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "./Solve.css";



const Solve = () => {
  const [loading, setLoading] = useState(true);
  const [problemData, setProblemData] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("c_cpp");

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

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!problemData) {
    return <div>Error: Problem not found.</div>;
  }

  const { problemName, problemStatement, sampleInputs, sampleOutputs, level } =
    problemData;

  return (
    <Box className="solve-page">
      {/* Left Half - Question Details */}
      <Box className="question-details">
        <Typography variant="h4">{problemName}</Typography>
        <Typography variant="body1">{problemStatement}</Typography>
        <Typography variant="body2">Sample Inputs: {sampleInputs}</Typography>
        <Typography variant="body2">Sample Outputs: {sampleOutputs}</Typography>
        <Typography variant="body2">Level: {level}</Typography>
      </Box>

      {/* Right Half - Ace Code Editor */}
      <Box className="code-editor">
        <AceEditor
          mode={language}
          theme="monokai"
          value={code}
          onChange={handleCodeChange}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          style={{ height: "670px", width: "100%" }}
        />
        {/* Additional content for Ace code editor */}
        <Box className="language-select">
          <Typography htmlFor="language-select" variant="h5">
            Language:
          </Typography>
          <Select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <MenuItem value="c_cpp">C++</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
        </Box>
        {/* Add more UI elements or buttons for compile and submit */}
      </Box>
    </Box>
  );
};

export default Solve;
