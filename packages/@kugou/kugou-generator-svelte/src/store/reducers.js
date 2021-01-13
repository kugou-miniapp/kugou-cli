import { REQUEST_USER, RECEIVE_USER } from "./actions";

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, isFetching: true };
    case RECEIVE_USER:
      return { ...state, isFetching: false, user: state.user };
    default:
      return state;
  }
};
