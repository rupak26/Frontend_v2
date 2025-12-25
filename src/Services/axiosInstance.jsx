import axios from "axios";
const URL = process.env.REACT_APP_API_URL
const axiosInstance = axios.create({
  baseURL: `${URL}`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
