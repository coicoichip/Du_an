import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_TOKEN, GET_TOKEN_SUCCESS } from "../redux/socket";
import { notifyErrorMsg } from "../redux/Alert";
import { getToken } from "../apis/auth";
function* getTokenSaga({ payload }) {
  try {
    const {data: {token}} = yield call(getToken, payload);
    yield put({ type: GET_TOKEN_SUCCESS, payload: token });
  } catch (err) {
    console.log(err)
    notifyErrorMsg(err);
  }
}

export default function* socketWatcher() {
  yield takeEvery(GET_TOKEN, getTokenSaga);
}
