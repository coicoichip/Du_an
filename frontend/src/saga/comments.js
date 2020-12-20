import { all, call, put, takeEvery } from "redux-saga/effects";
import { createComment, deleteComment, getComments } from "../apis/comments";
import { notifyErrorMsg } from "../redux/Alert";
import { CREATE_COMMENT, DELETE_COMMENT, getComment, GET_COMMENT, GET_COMMENTS } from "../redux/comments";


function* getCommentsSaga({ payload }) {
  try {
    const { success } = yield call(getComments, payload);
    if (success) {
    //   window.location.assign("/user/" + payload.data.user_id);
    //   yield put({ type: CREATE_BILLS_SUCCESS });
    }
  } catch (err) {
    notifyErrorMsg(err)
  }
}
function* getCommentSaga({ payload }) {
  try {
    const { data } = yield call(getComment, payload);
    if (data) {
    //   yield put({ type: GET_BILLS_SUCCESS, payload: data });
    }
  } catch (err) {
    notifyErrorMsg(err)
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
    notifyErrorMsg(err)
  }
}
function* deleteCommentSaga({ payload }) {
  try {
    const { resId } = payload;
    const { success } = yield call(deleteComment, payload);
    if (success) {
    //   yield put({ type: GET_BILLS, payload: { resId } });
    }
  } catch (err) {
    notifyErrorMsg(err)
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
