import {FETCH_USER} from "../actions/types";

const authReducer = (store = null, action) => {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return store;
  }
};

export default authReducer;
