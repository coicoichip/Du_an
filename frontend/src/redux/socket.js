import io from "socket.io-client";
import { BASE_URL } from "../config";
import { showNoti } from "./Alert";
import { SIGNOUT } from "./auth";
export const GET_TOKEN = "GET_TOKEN";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";

export const getToken = () => ({
  type: GET_TOKEN,
});
let socket = "";
export default function sockets(state, { type, payload }) {
  switch (type) {
    case GET_TOKEN_SUCCESS: {
      socket = io(`http://localhost:5000/notifications`, {
        query: { token: payload },
      });
      socket.on("error", (payload) => console.log(payload));
      socket.on("newNotify", (payload) => {
        showNoti(payload);
      });
      return true;
    }
    case SIGNOUT: {
      console.log('---------------')
      if (socket) {
        console.log(socket.disconnect())
        socket.disconnect()
      }
      return false;
    }
    default:
      return state || false;
  }
}
