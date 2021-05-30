import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../history";

import imageReducer, { moduleName as imageModule } from "../ducks/images";

export default combineReducers({
  router: connectRouter(history),
  [imageModule]: imageReducer
});
