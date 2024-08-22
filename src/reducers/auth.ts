import { AUTH_DATA } from "./type";

const initialState = {
  auth: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_DATA:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
