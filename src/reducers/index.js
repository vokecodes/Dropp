import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";

const appReducer = combineReducers({
  auth,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
