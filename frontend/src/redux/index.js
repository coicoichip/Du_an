import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import auth from './auth';
import categories from './categories';
import foods from './foods';
import restaurants from './restaurants';
import comments from './comments';
import bills from './bills';
import billDetails from './billDetails';
import cart from './cart';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    auth,
    categories,
    foods,
    restaurants,
    bills,
    billDetails,
    cart,
    comments
});
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const reduxStore = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default reduxStore;
