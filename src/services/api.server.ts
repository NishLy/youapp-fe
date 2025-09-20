import axios from "axios";

const apiServer = axios.create({
  baseURL: "http://techtest.youapp.ai/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiServer;
