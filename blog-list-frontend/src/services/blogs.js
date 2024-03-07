import axios from "axios";
const baseUrl = "/api/blog";
import storageService from "./storage";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addComment = async (id, comment, user) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment,
    user,
  });
  return response.data;
};

const create = async (newObject, token) => {
  console.log("Token in blog service", token);
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(baseUrl, newObject, config);

      return response.data;
    } else {
      throw new Error("Token not found");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Token is unauthorized or expired");
      storageService.removeUser();
    }
  }
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getOne, create, update, remove, addComment };
