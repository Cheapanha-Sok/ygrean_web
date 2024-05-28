import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

const apiClient = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": ["application/json"],
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default apiClient;

