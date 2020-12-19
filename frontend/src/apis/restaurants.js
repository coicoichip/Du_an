import axios from "axios";
import { BASE_URL } from "../config";

export const getRestaurants = async () => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants`,
    withCredentials: true,
  });
  return response.data;
};

export const getRestaurant = async ({resId}) => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants/${resId}`,
    withCredentials: true,
  });
  return response.data;
};

export const editRestaurant = async ({resId, data}) => {
  const response = await axios({
    method: "PATCH",
    url: `${BASE_URL}/restaurants/${resId}`,
    withCredentials: true,
    data
  });
  return response.data;
};

export const deleteRestaurant = async ({resId}) => {
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/restaurants/${resId}`,
    withCredentials: true,
  });
  return response.data;
};

export const createRestaurant = async ({data}) => {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/restaurants`,
    withCredentials: true,
    data
  });
  return response.data;
};
