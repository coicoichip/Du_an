import { all } from 'redux-saga/effects';
import authWatcher from './auth.js';
import foodsWatcher from './foods.js';
import categoriesWatcher from './categories.js';
import restaurantsWatcher from './restaurants.js';
import billsWatcher from './bills.js';
import commentsWatcher from './comments.js';
import socketWatcher from './socket.js';


function *rootSaga() {
  yield all([
    authWatcher(),
    foodsWatcher(),
    categoriesWatcher(),
    restaurantsWatcher(),
    billsWatcher(),
    commentsWatcher(),
    socketWatcher(),
  ]);
}

export default rootSaga;
