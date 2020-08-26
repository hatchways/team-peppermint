import { FETCH_USER_DATA, UPDATE_USER_IMAGE, SET_USER_DATA } from "../../types";

export default function userReducer(state, action) {
  switch (action.type) {
    case SET_USER_DATA:
    case FETCH_USER_DATA: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    case UPDATE_USER_IMAGE: {
      return {
        ...state,
        user: { ...state.user, pictureURL: action.payload.imageUrl },
      };
    }
    default:
      return state;
  }
}
