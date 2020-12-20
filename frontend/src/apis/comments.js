import axios from "axios";
import { BASE_URL } from "../config";

export const getComments = async ({ resId }) => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants/${resId}/comments`,
    withCredentials: true,
  });
  return response.data;
};

export const rateRes = async ({ resId, data }) => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants/${resId}/rates`,
    withCredentials: true,
    data
  });
  return response.data;
};

export const createComment = async ({ resId, data }) => {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/restaurants/${resId}/comments`,
    withCredentials: true,
    data,
  });
  return response.data;
};

export const deleteComment = async ({ resId, comment_id }) => {
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/restaurants/${resId}/comments/${comment_id}`,
    withCredentials: true,
  });
  return response.data;
};
