import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  DELETE_USER,
  EDIT_PROFILE,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNOUT,
  SIGNUP,
  SIGNUP_SUCCESS,
  WHO_AM_I,
  WHO_AM_I_SUCCESS,
} from "../redux/auth";
import {
  me,
  signin,
  signup,
  signout,
  editProfile,
  deleteProfile,
} from "../apis/auth";
import { notifyErrorMsg, notifySuccess } from "../redux/Alert";
function* signinSaga({ payload }) {
  try {
    yield call(signin, payload);
    yield put({ type: SIGNIN_SUCCESS });
    yield put({ type: WHO_AM_I });
    localStorage.setItem("login", "1");
    if (payload.email === "admin") {
      payload.history.push("/users");
    } else payload.history.push("/user");
  } catch (err) {
    payload.history.push("/signin");
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
    yield put({ type: WHO_AM_I });
    if (success) {
      if (payload.position === "owner") {
        payload.history.push("/seller/restaurants");
      } else payload.history.push("/restaurants/all");
      yield put({ type: SIGNUP_SUCCESS });
    }
  } catch (err) {
    notifyErrorMsg(err);
  }
}
function* signoutSaga({ payload }) {
  try {
    const { success } = yield call(signout, payload);
    localStorage.removeItem("login");
    payload.history.push("/restaurants/all");
    if (success) {
    }
  } catch (err) {
    console.log(err);
  }
}
function* editProfileSaga({ payload }) {
  try {
    const { success, data } = yield call(editProfile, payload);
    if (success) {
      notifySuccess();
      payload.history.push("/user/" + data.user_id);
      yield put({ type: WHO_AM_I });
    }
  } catch (err) {
    if (err) {
      notifyErrorMsg(err);
      console.log(err)
    }
  }
}
function* deleteUserSaga({ payload }) {
  try {
    const { success } = yield call(deleteProfile, payload);
    if (success) {
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* authWatcher() {
  yield all([
    yield takeEvery(SIGNIN, signinSaga),
    yield takeEvery(SIGNOUT, signoutSaga),
    yield takeEvery(SIGNIN_SUCCESS, getMeSaga),
    yield takeEvery(WHO_AM_I, getMeSaga),
    yield takeEvery(SIGNUP, signupSaga),
    yield takeEvery(EDIT_PROFILE, editProfileSaga),
    yield takeEvery(DELETE_USER, deleteUserSaga),
  ]);
}
