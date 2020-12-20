import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_RESTAURANT,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_SUCCESS,
  EDIT_RESTAURANT,
  EDIT_RESTAURANT_SUCCESS,
  GET_RESTAURANT,
  GET_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANT_SUCCESS,
} from "../redux/restaurants";
import {
  editRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  createRestaurant,
} from "../apis/restaurants";
import { notifyErrorMsg } from "../redux/Alert";
function* getRestaurantsSaga({ payload }) {
  try {
    const { data } = yield call(getRestaurants, payload);
    yield put({ type: GET_RESTAURANTS_SUCCESS, payload: data });
  } catch (err) {
    notifyErrorMsg(err);
  }
}
function* getRestaurantSaga({ payload }) {
  try {
    const { data } = yield call(getRestaurant, payload);
    yield put({ type: GET_RESTAURANT_SUCCESS, payload: data });
  } catch (err) {
    notifyErrorMsg(err);
  }
}
function* editRestaurantSaga({ payload }) {
  try {
    const result = yield call(editRestaurant, payload);
    console.log(result);
    yield put({ type: EDIT_RESTAURANT_SUCCESS });
  } catch (err) {
    notifyErrorMsg(err);
  }
}
function* deleteRestaurantSaga({ payload }) {
  try {
    const result = yield call(deleteRestaurant, payload);
    yield put({ type: GET_RESTAURANTS });
  } catch (err) {
    notifyErrorMsg(err);
  }
}
function* createRestaurantSaga({ payload }) {
  try {
    const result = yield call(createRestaurant, payload);
    console.log(result);
    yield put({ type: CREATE_RESTAURANT_SUCCESS });
  } catch (err) {
    notifyErrorMsg(err);
  }
}

export default function* restaurantsWatcher() {
  yield all([
    yield takeEvery(GET_RESTAURANTS, getRestaurantsSaga),
    yield takeEvery(GET_RESTAURANT, getRestaurantSaga),
    yield takeEvery(EDIT_RESTAURANT, editRestaurantSaga),
    yield takeEvery(DELETE_RESTAURANT, deleteRestaurantSaga),
    yield takeEvery(CREATE_RESTAURANT, createRestaurantSaga),
  ]);
}
