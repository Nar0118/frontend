import { getToken } from "../utils/functions";
import { LOG_IN, LOG_OUT } from "./actionTypes";

const initialState = {
  user: getToken(),
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: (state.user = getToken()),
      };

    case LOG_OUT:
      return {
        ...state,
        user: (state.user = getToken()),
      };
    default:
      return state;
  }
}
