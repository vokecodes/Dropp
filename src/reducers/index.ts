import { combineReducers } from "redux";
import authReducer from "./auth";
import user from "./user";

const appReducer = combineReducers({
  authReducer,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
