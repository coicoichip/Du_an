import { all, call, put, takeEvery } from "redux-saga/effects";
import { createComment, deleteComment, getComments } from "../apis/comments";
import { notifyErrorMsg } from "../redux/Alert";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  getComment,
  GET_COMMENT,
  GET_COMMENTS,
  GET_COMMENT_SUCCESS,
} from "../redux/comments";

function* getCommentsSaga({ payload }) {
  try {
    const { success, data } = yield call(getComments, payload);
    if (success) {
      yield put({ type: GET_COMMENT_SUCCESS, payload: data });
    }
  } catch (err) {
    console.log(err)
  }
}
function* getCommentSaga({ payload }) {
  try {
    const { data } = yield call(getComment, payload);
    if (data) {
      //   yield put({ type: GET_BILLS_SUCCESS, payload: data });
    }
  } catch (err) {
    console.log(err)
  }
}
function* createCommentSaga({ payload }) {
  try {
    const { resId } = payload;
    const { success } = yield call(createComment, payload);
    if (success) {
      yield put({ type: GET_COMMENTS, payload: { resId } });
    }
  } catch (err) {
    console.log(err)
  }
}
function* deleteCommentSaga({ payload }) {
  try {
    const { resId } = payload;
    const { success } = yield call(deleteComment, payload);
    if (success) {
      yield put({ type: GET_COMMENTS, payload: { resId } });
      //   yield put({ type: GET_BILLS, payload: { resId } });
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* commentsWatcher() {
  yield all([
    yield takeEvery(GET_COMMENTS, getCommentsSaga),
    yield takeEvery(GET_COMMENT, getCommentSaga),
    yield takeEvery(CREATE_COMMENT, createCommentSaga),
    yield takeEvery(DELETE_COMMENT, deleteCommentSaga),
  ]);
}
