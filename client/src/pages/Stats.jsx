import React from 'react'
import { StatsContainer } from "../components";
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const response = await customFetch.get("/submission/stats");
    return response.data
  } catch (error) {
    return error
  }
}


const Stats = () => {
  const {defaultStats} = useLoaderData();
  
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
    </>
  );
}

export default Stats