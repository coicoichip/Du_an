import io from "socket.io-client";
import { BASE_URL } from "../config";
import { notifyInfo, showNoti } from "./Alert";
import { SIGNOUT } from "./auth";
import { emitter } from "./emitter";
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
        notifyInfo();
        emitter.emit('bell')
      });
      return true;
    }
    case SIGNOUT: {
      if (socket) {
        socket.disconnect();
      }
      return false;
    }
    default:
      return state || false;
  }
}
