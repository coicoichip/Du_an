import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_CATEGORIES, GET_CATEGORIES_SUCCESS } from "../redux/categories";
import { getCategories } from "../apis/categories";
import { notifyErrorMsg } from "../redux/Alert";
function* getCategoriesSaga({ payload }) {
  try {
    const result = yield call(getCategories, payload);
    console.log(result);
    yield put({ type: GET_CATEGORIES_SUCCESS });
  } catch (err) {
    console.log(err)
    notifyErrorMsg(err)
  }
}

export default function* categoriesWatcher() {
  yield takeEvery(GET_CATEGORIES, getCategoriesSaga);
}
