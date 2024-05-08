import axios from "axios";
import { AUTH_URL } from "../constant/Constant";

const apiClient = axios.create({
  baseURL: AUTH_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default apiClient;
