import axios from "axios";
import { BASE_URL } from "../config";

export const getCategories = async () => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/categories`,
    withCredentials: true,
  });
  return response.data;
};
