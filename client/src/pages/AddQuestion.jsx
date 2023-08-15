import React, { useState } from "react";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const AddQuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  h3 {
    margin: 0;
  }

  select,
  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  select {
    font-size: 16px;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const TestCasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TestCaseRow = styled.div`
  display: flex;
  gap: 20px;
`;


const AddQuestion = () => {
  const [problemData, setProblemData] = useState({
    problemName: "",
    problemStatement: "",
    sampleInputs: "",
    sampleOutputs: "",
    level: "easy",
    testCases: {
      input: ["", "", "", "", "", "", "", "", "", ""],
      output: ["", "", "", "", "", "", "", "", "", ""],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await customFetch.post(`/problem/`, problemData);
      toast.success("Problem added successfully");
      redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProblemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestCasesChange = (index, type, value) => {
    setProblemData((prevData) => {
      const newTestCases = { ...prevData.testCases };
      newTestCases[type][index] = value;
      return { ...prevData, testCases: newTestCases };
    });
  };

  return (
    <AddQuestionForm onSubmit={handleSubmit}>
      <h3>Add Problem</h3>
      <input
        type="text"
        name="problemName"
        placeholder="Problem Name"
        value={problemData.problemName}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="problemStatement"
        placeholder="Problem Statement"
        value={problemData.problemStatement}
        onChange={handleInputChange}
        required
        rows="8"
      />
      <input
        type="text"
        name="sampleInputs"
        placeholder="Sample Inputs"
        value={problemData.sampleInputs}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="sampleOutputs"
        placeholder="Sample Outputs"
        value={problemData.sampleOutputs}
        onChange={handleInputChange}
        required
      />
      <select
        name="level"
        value={problemData.level}
        onChange={handleInputChange}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <TestCasesContainer>
        {problemData.testCases.input.map((input, index) => (
          <TestCaseRow key={index}>
            <div className="test-case">
              <textarea
                name={`testCases.input[${index}]`}
                placeholder={`Input for Test Case ${index + 1}`}
                value={input}
                onChange={(e) =>
                  handleTestCasesChange(index, "input", e.target.value)
                }
                required
              />
            </div>

            <div className="test-case">
              <textarea
                name={`testCases.output[${index}]`}
                placeholder={`Output for Test Case ${index + 1}`}
                value={problemData.testCases.output[index]}
                onChange={(e) =>
                  handleTestCasesChange(index, "output", e.target.value)
                }
                required
              />
            </div>
          </TestCaseRow>
        ))}
      </TestCasesContainer>

      <button type="submit">Submit</button>
    </AddQuestionForm>
  );
};

export default AddQuestion;
