import axios from "axios";
import { BASE_URL } from "../config";

export const getBills = async ({ resId }) => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants/${resId}/bills`,
    withCredentials: true,
  });
  return response.data;
};

export const totalBills = async () => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/bills`,
    withCredentials: true,
  });
  return response.data;
};

export const getBill = async ({ resId, billId }) => {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/restaurants/${resId}/bills/${billId}`,
    withCredentials: true,
  });
  return response.data;
};

export const createBill = async ({ resId, data }) => {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/restaurants/${resId}/bills`,
    withCredentials: true,
    data,
  });
  return response.data;
};

export const editBill = async ({ resId, billId, data }) => {
  const response = await axios({
    method: "PUT",
    url: `${BASE_URL}/restaurants/${resId}/bills/${billId}`,
    withCredentials: true,
    data,
  });
  return response.data;
};

export const deleteBill = async ({ resId, billId }) => {
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/restaurants/${resId}/bills/${billId}`,
    withCredentials: true,
  });
  return response.data;
};
