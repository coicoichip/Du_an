import { GET_BILL_SUCCESS } from "./bills";

export const RESET_BILLS_DETAIL = "RESET_BILLS_DETAIL";
export const RESET_BILLS_DETAIL_SUCCESS = "RESET_BILLS_DETAIL_SUCCESS";

export const resetBillDetails = () => ({
  type: RESET_BILLS_DETAIL,
});

const initialState = {};

export default function billDetail(state, action) {
  switch (action.type) {
    case GET_BILL_SUCCESS: {
        return action.payload
    }
    case RESET_BILLS_DETAIL:
      return initialState;
    default:
      return state || initialState;
  }
}
