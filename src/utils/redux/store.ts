import Redux, {  createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import rootReducer from "utils/redux/reducers/root";

const middlewares:Redux.Middleware[] = [  promiseMiddleware, ReduxThunk ];

const enhancerDev = composeWithDevTools( applyMiddleware( ...middlewares ) );
const enhancer = compose( applyMiddleware( ...middlewares ) );

const store = createStore( 
  rootReducer, 
  process.env.NODE_ENV !== 'production' ? enhancerDev : enhancer );

export default store;