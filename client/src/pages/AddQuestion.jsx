import { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect } from "react-router-dom";
import { Logo, FormRow, SubmitBtn } from "../components";
import styled from "styled-components";

const AddQuestionForm = styled(Form)`
  .form-row textarea {
    height: 150px; /* Increase the height for the problem statement */
  }

  .test-cases-box {
    display: flex;
    gap: 20px;
  }
`;


const AddQuestion = () => {
  const [problemData, setProblemData] = useState({
    problemName: "",
    problemStatement: "",
    sampleInputs: "",
    sampleOutputs: "",
    level: "easy", // Default level
    testCases: {
      input: [],
      output: [],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await customFetch.post(`/problem/`, problemData);
      toast.success("Problem added successfully");
      redirect("/dashboard");
      // Redirect or perform any other action after successful submission
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
    <AddQuestionForm method="post" className="form" onSubmit={handleSubmit}>
      <Logo />
      <h3>Add Problem</h3>
      <FormRow
        type="text"
        name="problemName"
        value={problemData.problemName}
        onChange={handleInputChange}
      />
      <FormRow
        type="textarea"
        name="problemStatement"
        value={problemData.problemStatement}
        onChange={handleInputChange}
      />
      <FormRow
        type="text"
        name="sampleInputs"
        value={problemData.sampleInputs}
        onChange={handleInputChange}
      />
      <FormRow
        type="text"
        name="sampleOutputs"
        value={problemData.sampleOutputs}
        onChange={handleInputChange}
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

      <div className="test-cases-box">
        {problemData.testCases.input.map((input, index) => (
          <div key={index}>
            <h4>Test Case {index + 1}</h4>
            <FormRow
              type="textarea"
              name={`testCases.input[${index}]`}
              value={input}
              onChange={(e) =>
                handleTestCasesChange(index, "input", e.target.value)
              }
            />
            <FormRow
              type="textarea"
              name={`testCases.output[${index}]`}
              value={problemData.testCases.output[index]}
              onChange={(e) =>
                handleTestCasesChange(index, "output", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <SubmitBtn formBtn />
    </AddQuestionForm>
  );
};

export default AddQuestion;
