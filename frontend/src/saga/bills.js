import { all, call, put, takeEvery } from "redux-saga/effects";
import { createBill, getBill, getBills, totalBills } from "../apis/bills";
import {
  CREATE_BILLS,
  CREATE_BILLS_SUCCESS,
  GET_BILL,
  GET_BILLS,
  GET_BILLS_SUCCESS,
  GET_BILL_SUCCESS,
  GET_TOTAL_BILL,
} from "../redux/bills";

function* getBillsSaga({ payload }) {
  try {
    const {data} = yield call(getBills, payload);
    yield put({ type: GET_BILLS_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
}
function* getBillSaga({ payload }) {
  try {
    const { data } = yield call(getBill, payload);
    yield put({ type: GET_BILL_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
}
function* createBillSaga({ payload }) {
  try {
    const { success } = yield call(createBill, payload);
    if (success) {
      window.location.assign("/signin");
      yield put({ type: CREATE_BILLS_SUCCESS });
    }
  } catch (err) {
    console.log(err);
  }
}
function* getTotalBillsSaga({ payload }) {
  try {
    const { data } = yield call(totalBills, payload);
    if (data) {
      yield put({ type: GET_BILLS_SUCCESS, payload: data });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* billsWatcher() {
  yield all([
    yield takeEvery(GET_BILLS, getBillsSaga),
    yield takeEvery(GET_BILL, getBillSaga),
    yield takeEvery(GET_TOTAL_BILL, getTotalBillsSaga),
    yield takeEvery(CREATE_BILLS, createBillSaga),
  ]);
}
