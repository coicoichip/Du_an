import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS,
  WHO_AM_I,
  WHO_AM_I_SUCCESS
} from "../redux/auth";
import { me, signin, signup } from "../apis/auth";
function* signinSaga({ payload }) {
  try {
    const result = yield call(signin, payload);
    console.log(result);
    yield put({ type: SIGNIN_SUCCESS });
  } catch (err) {
    console.log(err);
  }
}
function* getMeSaga({ payload }) {
  try {
    const { data } = yield call(me, payload);
    yield put({ type: WHO_AM_I_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
}
function* signupSaga({ payload }) {
  try {
    const { success } = yield call(signup, payload);
    if (success) {
      window.location.assign('/signin')
      yield put({ type: SIGNUP_SUCCESS });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* authWatcher() {
  yield all([
    yield takeEvery(SIGNIN, signinSaga),
    yield takeEvery(SIGNIN_SUCCESS, getMeSaga),
    yield takeEvery(WHO_AM_I, getMeSaga),
    yield takeEvery(SIGNUP, signupSaga),
  ]);
}
