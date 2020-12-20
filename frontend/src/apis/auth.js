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

export const signout = async () => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/logout`,
    withCredentials: true,
  });
  return response.data;
};

export const editProfile = async ({data}) => {
  const response = await axios({
    method: "PUT",
    url: `${BASE_URL}/users`,
    withCredentials: true,
    data
  });
  return response.data;
};

export const deleteProfile = async ({user_id}) => {
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/users`,
    withCredentials: true,
    data: {
      user_id
    }
  });
  return response.data;
};
