import React from "react";
import { StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

const StyledStats = styled.div`
  margin-top: 20px;

  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
`;

export const loader = async () => {
  try {
    const response = await customFetch.get("/submission/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, submissions } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      <StyledStats>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Problem Name</th>
              <th>Language</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id}>
                <td>{index + 1}</td>
                <td>{submission.problemName}</td>
                <td>{submission.language}</td>
                <td>{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledStats>
    </>
  );
};

export default Stats;
