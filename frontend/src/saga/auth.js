import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNOUT,
  SIGNUP,
  SIGNUP_SUCCESS,
  WHO_AM_I,
  WHO_AM_I_SUCCESS
} from "../redux/auth";
import { me, signin, signup, signout } from "../apis/auth";
import { notifyErrorMsg } from "../redux/Alert";
function* signinSaga({ payload }) {
  try {
    const result = yield call(signin, payload);
    yield put({ type: SIGNIN_SUCCESS });
    window.location.assign('/user')
  } catch (err) {
    window.location.assign('/signin')
    notifyErrorMsg(err)
  }
}
function* getMeSaga({ payload }) {
  try {
    const { data } = yield call(me, payload);
    yield put({ type: WHO_AM_I_SUCCESS, payload: data });
  } catch (err) {
  }
}
function* signupSaga({ payload }) {
  try {
    const { success } = yield call(signup, payload);
    if (success) {
      if (payload.position === 'owner') {
        window.location.assign('/seller/restaurants')
      }
      else window.location.assign('/restaurants/all')
      yield put({ type: SIGNUP_SUCCESS });
    }
  } catch (err) {
    notifyErrorMsg(err)
  }
}
function* signoutSaga({ payload }) {
  try {
    const { success } = yield call(signout, payload);
    if (success) {
    }
  } catch (err) {
    notifyErrorMsg(err)
  }
}

export default function* authWatcher() {
  yield all([
    yield takeEvery(SIGNIN, signinSaga),
    yield takeEvery(SIGNOUT, signoutSaga),
    yield takeEvery(SIGNIN_SUCCESS, getMeSaga),
    yield takeEvery(WHO_AM_I, getMeSaga),
    yield takeEvery(SIGNUP, signupSaga),
  ]);
}
