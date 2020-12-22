import axios from "axios";
import { BASE_URL } from "../config";

export const getFoods = async () => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/foods`,
    withCredentials: true,
  });
  return response.data;
};

export const getFoodsByResId = async ({resId}) => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants/${resId}/foods`,
    withCredentials: true,
  });
  return response.data;
};

export const getFood = async ({foodId, resId}) => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants/${resId}/foods/${foodId}`,
    withCredentials: true,
  });
  return response.data;
};

export const editFood = async ({resId, foodId, data}) => {
  const response = await axios({
    method: "PUT",
    url: `${BASE_URL}/restaurants/${resId}/foods/${foodId}`,
    withCredentials: true,
    data
  });
  return response.data;
};

export const deleteFood = async ({resId, foodId}) => {
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/restaurants/${resId}/foods/${foodId}`,
    withCredentials: true,
  });
  return response.data;
};

export const createFood = async ({data}) => {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/restaurants/${data.resId}/foods`,
    withCredentials: true,
    data
  });
  return response.data;
}