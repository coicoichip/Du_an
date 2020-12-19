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
function* getFoodsSaga({ payload }) {
  try {
    const result = yield call(getFoods, payload);
    console.log(result);
    yield put({ type: GET_FOODS_SUCCESS });
  } catch (err) {
    console.log(err);
  }
}
function* getFoodsByResIdSaga({ payload }) {
  try {
    const { data } = yield call(getFoodsByResId, payload);
    yield put({ type: GET_FOODS_BY_RESID_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
}
function* getFoodSaga({ payload }) {
  try {
    const result = yield call(getFood, payload);
    console.log(result);
    yield put({ type: GET_FOOD_SUCCESS });
  } catch (err) {
    console.log(err);
  }
}
function* editFoodSaga({ payload }) {
  try {
    const result = yield call(editFood, payload);
    console.log(result);
    yield put({ type: EDIT_FOOD_SUCCESS });
  } catch (err) {
    console.log(err);
  }
}
function* deleteFoodSaga({ payload }) {
  try {
    const result = yield call(deleteFood, payload);
    console.log(result);
    yield put({ type: DELETE_FOOD_SUCCESS });
  } catch (err) {
    console.log(err);
  }
}
function* createFoodSaga({ payload }) {
  try {
    const result = yield call(createFood, payload);
    console.log(result);
    yield put({ type: CREATE_FOOD_SUCCESS });
  } catch (err) {
    console.log(err);
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
