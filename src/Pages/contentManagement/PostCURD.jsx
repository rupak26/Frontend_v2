import axios from "axios";
const URL = process.env.REACT_APP_API_URL

const API_URL = `http://44.192.125.34:8000/content/post/`; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPosts = async () => {
  const response = await axiosInstance.get("/", { headers: getAuthHeaders() });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axiosInstance.post("/", postData, { headers: getAuthHeaders() });
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const response = await axiosInstance.put(`/?post_id=${postId}`, postData, { headers: getAuthHeaders() });
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/?id=${postId}`, { headers: getAuthHeaders() });
  return response.data;
};
