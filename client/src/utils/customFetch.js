import axios from "axios";
const customFetch = axios.create({
  baseURL: "/api/v2",
});

export default customFetch;
