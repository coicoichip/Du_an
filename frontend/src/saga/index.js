import { all } from 'redux-saga/effects';
import authWatcher from './auth.js';


function *rootSaga() {
  yield all([
    authWatcher(),
  ]);
}

export default rootSaga;
