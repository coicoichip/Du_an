import { all } from 'redux-saga/effects';
import authWatcher from './auth.js';
import foodsWatcher from './foods.js';
import categoriesWatcher from './categories.js';
import restaurantsWatcher from './restaurants.js';


function *rootSaga() {
  yield all([
    authWatcher(),
    foodsWatcher(),
    categoriesWatcher(),
    restaurantsWatcher(),
  ]);
}

export default rootSaga;
