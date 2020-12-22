import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  createBill,
  deleteBill,
  editBill,
  getBill,
  getBills,
  totalBills,
} from "../apis/bills";
import { notifyErrorMsg } from "../redux/Alert";
import {
  CREATE_BILLS,
  CREATE_BILLS_SUCCESS,
  DELETE_BILL,
  EDIT_BILL,
  GET_BILL,
  GET_BILLS,
  GET_BILLS_SUCCESS,
  GET_BILL_SUCCESS,
  GET_TOTAL_BILL,
} from "../redux/bills";

function* getBillsSaga({ payload }) {
  try {
    const { data } = yield call(getBills, payload);
    yield put({ type: GET_BILLS_SUCCESS, payload: data });
  } catch (err) {
    console.log(err)
  }
}
function* getBillSaga({ payload }) {
  try {
    const { data } = yield call(getBill, payload);
    yield put({ type: GET_BILL_SUCCESS, payload: data });
  } catch (err) {
    console.log(err)
    notifyErrorMsg(err)
  }
}
function* createBillSaga({ payload }) {
  try {
    const { success, data } = yield call(createBill, payload);
    if (success) {
      payload.history.push("/user/" + payload.data.user_id);
      yield put({ type: CREATE_BILLS_SUCCESS });
    }
  } catch (err) {
    console.log(err)
    notifyErrorMsg(err)
  }
}
function* getTotalBillsSaga({ payload }) {
  try {
    const { data } = yield call(totalBills, payload);
    if (data) {
      yield put({ type: GET_BILLS_SUCCESS, payload: data });
    }
  } catch (err) {
    console.log(err)
    notifyErrorMsg(err)
  }
}
function* editBillSaga({ payload }) {
  try {
    const { resId } = payload;
    const { success } = yield call(editBill, payload);
    if (success) {
      yield put({ type: GET_BILLS, payload: { resId } });
    }
  } catch (err) {
    console.log(err)
    notifyErrorMsg(err)
  }
}
function* deleteBillSaga({ payload }) {
  try {
    const { resId } = payload;
    const { success } = yield call(deleteBill, payload);
    if (success) {
      yield put({ type: GET_BILLS, payload: { resId } });
    }
  } catch (err) {
    console.log(err)
    notifyErrorMsg(err)
  }
}

export default function* billsWatcher() {
  yield all([
    yield takeEvery(GET_BILLS, getBillsSaga),
    yield takeEvery(GET_BILL, getBillSaga),
    yield takeEvery(GET_TOTAL_BILL, getTotalBillsSaga),
    yield takeEvery(CREATE_BILLS, createBillSaga),
    yield takeEvery(EDIT_BILL, editBillSaga),
    yield takeEvery(DELETE_BILL, deleteBillSaga),
  ]);
}
