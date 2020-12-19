import { all, put, takeEvery } from "redux-saga/effects";
import { SIGNIN, SIGNIN_SUCCESS } from "../redux/auth";

function* signin(action) {
  yield put({ type: SIGNIN_SUCCESS });
}

export default function* authenticationWatcher() {
  yield takeEvery(SIGNIN, signin);
}
