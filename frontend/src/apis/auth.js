import axios from "axios";
import { BASE_URL } from "../config";

export const signin = async ({ email, password }) => {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/login`,
    withCredentials: true,
    data: {
      email,
      password,
    },
  });
  return response.data;
};

export const me = async () => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/me`,
    withCredentials: true,
  });
  return response.data;
};

export const signup = async ({
  email,
  password,
  position,
  name,
  phone,
  address,
}) => {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/register`,
    withCredentials: true,
    data: {
      email,
      password,
      position,
      name,
      phone,
      address,
    },
  });
  return response.data;
};
