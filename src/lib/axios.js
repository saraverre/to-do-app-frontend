import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api",
});

export default api;
