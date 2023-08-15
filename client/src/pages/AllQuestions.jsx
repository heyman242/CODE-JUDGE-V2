import React, { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  

  tr:hover {
    background-color: #f5f5f54b;
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

const AllQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await customFetch.get("/problem");
      setQuestions(data.problem);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleSolve = async (problemId) => {
    navigate(`/dashboard/problem/${problemId}`);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th>Index</th>
              <th>Problem Name</th>
              <th>Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.problemName}</td>
                <td>{item.level}</td>
                <td>
                  <button onClick={() => handleSolve(item._id)}>Solve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </div>
  );
};

export default AllQuestions;
