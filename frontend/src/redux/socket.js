import io from "socket.io-client";
import { BASE_URL } from "../config";
import { showNoti } from "./Alert";
import { SIGNOUT } from "./auth";
export const GET_TOKEN = "GET_TOKEN";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";

export const getToken = () => ({
  type: GET_TOKEN,
});
let socket;
export default function sockets(state, { type, payload }) {
  switch (type) {
    case GET_TOKEN_SUCCESS: {
      socket = io(`${BASE_URL}/notifications`, {
        query: { token: payload },
      });
      socket.emit('connect')
      socket.on("error", (payload) => console.log(payload));
      socket.on("newNotify", (payload) => {
        showNoti(payload);
        console.log('----------------')
        console.log(payload)
      });
      return true;
    }
    case SIGNOUT: {
      return false;
    }
    default:
      return state || false;
  }
}
