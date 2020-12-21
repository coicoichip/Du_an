import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_FOOD,
  CREATE_FOOD_SUCCESS,
  DELETE_FOOD,
  DELETE_FOOD_SUCCESS,
  EDIT_FOOD,
  EDIT_FOOD_SUCCESS,
  GET_FOOD,
  GET_FOODS,
  GET_FOODS_BY_RESID,
  GET_FOODS_BY_RESID_SUCCESS,
  GET_FOODS_SUCCESS,
  GET_FOOD_SUCCESS,
} from "../redux/foods";
import {
  createFood,
  deleteFood,
  editFood,
  getFood,
  getFoods,
  getFoodsByResId,
} from "../apis/foods";
import { notifyErrorMsg } from "../redux/Alert";
function* getFoodsSaga({ payload }) {
  try {
    const { data } = yield call(getFoods, payload);
    yield put({ type: GET_FOODS_SUCCESS, payload: data });
  } catch (err) {
    notifyErrorMsg(err)
  }
}
function* getFoodsByResIdSaga({ payload }) {
  try {
    const { data } = yield call(getFoodsByResId, payload);
    yield put({ type: GET_FOODS_BY_RESID_SUCCESS, payload: data });
  } catch (err) {
    notifyErrorMsg(err)
  }
}
function* getFoodSaga({ payload }) {
  try {
    const { data } = yield call(getFood, payload);
    yield put({ type: GET_FOOD_SUCCESS, payload: data });
  } catch (err) {
    notifyErrorMsg(err)
  }
}
function* editFoodSaga({ payload }) {
  try {
    const {} = yield call(editFood, payload);
    yield put({ type: EDIT_FOOD_SUCCESS });
  } catch (err) {
    notifyErrorMsg(err)
  }
}
function* deleteFoodSaga({ payload }) {
  const { resId } = payload;
  try {
    const { success } = yield call(deleteFood, payload);
    if (success) {
    }
    yield put({ type: GET_FOODS_BY_RESID, payload: { resId } });
  } catch (err) {
    notifyErrorMsg(err)
  }
}
function* createFoodSaga({ payload }) {
  try {
    const result = yield call(createFood, payload);
    console.log(result);
    yield put({ type: CREATE_FOOD_SUCCESS });
  } catch (err) {
    notifyErrorMsg(err)
  }
}

export default function* foodsWatcher() {
  yield all([
    yield takeEvery(GET_FOODS, getFoodsSaga),
    yield takeEvery(GET_FOODS_BY_RESID, getFoodsByResIdSaga),
    yield takeEvery(GET_FOOD, getFoodSaga),
    yield takeEvery(CREATE_FOOD, createFoodSaga),
    yield takeEvery(EDIT_FOOD, editFoodSaga),
    yield takeEvery(DELETE_FOOD, deleteFoodSaga),
  ]);
}
