import  { useEffect, useState } from "react";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useParams } from "react-router-dom";

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const ResultCard = styled.div`
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 2px 4px rgba(115, 107, 107, 0.1);
`;

const Result = () => {
  const [resultData, setResultData] = useState(null);
  const { submissionId } = useParams();

  useEffect(() => {
    fetchDataWithDelay();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await customFetch.get(
        `/submission/status/${submissionId}`
      );
      setResultData(data.job);

      // Parse the output JSON string into a JavaScript object
      if (data.job && data.job.output) {
        const outputObject = JSON.parse(data.job.output);
        setResultData((prevResultData) => ({
          ...prevResultData,
          output: outputObject,
        }));
      }
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  const fetchDataWithDelay = () => {
    setTimeout(() => {
      fetchData();
    }, 5000); // Delay of 5000 milliseconds (5 seconds)
  };

  if (!resultData) {
    return <div>Loading...</div>;
  }

  return (
    <ResultContainer>
      <h2>Submission Result</h2>
      <ResultCard>
        <h1> {resultData.status}</h1>
        {resultData.output && (
          <>

            <p>Status: {resultData.output.status}</p>
            <p>Message: {resultData.output.msg}</p>
            
          </>
        )}
      </ResultCard>
    </ResultContainer>
  );
};

export default Result;
