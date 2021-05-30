import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducer from "./reducer";
import history from "../history";

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger);

const store = createStore(reducer, enhancer);

export default store;
