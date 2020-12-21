export const GET_BILLS = "GET_BILLS";
export const GET_BILLS_SUCCESS = "GET_BILLS_SUCCESS";
export const GET_BILL = "GET_BILL";
export const GET_BILL_SUCCESS = "GET_BILL_SUCCESS";
export const CREATE_BILLS = "CREATE_BILLS";
export const CREATE_BILLS_SUCCESS = "CREATE_BILLS_SUCCESS";
export const RESET_BILLS = "RESET_BILLS";
export const RESET_BILLS_SUCCESS = "RESET_BILLS_SUCCESS";
export const GET_TOTAL_BILL = "GET_TOTAL_BILL";
export const GET_TOTAL_BILL_SUCCESS = "GET_TOTAL_BILL_SUCCESS";
export const EDIT_BILL = "EDIT_BILL";
export const EDIT_BILL_SUCCESS = "EDIT_BILL_SUCCESS";
export const DELETE_BILL = "DELETE_BILL";
export const DELETE_BILL_SUCCESS = "DELETE_BILL_SUCCESS";

export const getBills = ({ resId }) => ({
  type: GET_BILLS,
  payload: { resId },
});

export const getBill = ({resId, billId}) => ({
  type: GET_BILL,
  payload: {resId, billId}
});

export const createBill = ({resId, data, history}) => ({
  type: CREATE_BILLS,
  payload: {resId, data, history}
});

export const resetBills = () => ({
  type: RESET_BILLS,
});

export const getTotalBills = () => ({
  type: GET_TOTAL_BILL,
});

export const editBill = ({resId, billId, data}) => ({
  type: EDIT_BILL,
  payload: {resId, billId, data}
});

export const deleteBill = ({resId, billId}) => ({
  type: DELETE_BILL,
  payload: {resId, billId}
});

const initialState = [];

export default function bills(state, action) {
  switch (action.type) {
    case GET_BILLS_SUCCESS: {
        return [...action.payload]
    }
    case RESET_BILLS:
      return initialState;
    default:
      return state || initialState;
  }
}
