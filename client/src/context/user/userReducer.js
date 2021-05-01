import { ActionTypes } from "types";

const UserReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA: {
      return { ...state, ...action.payload }
    }
    case ActionTypes.UPDATE_USER_IMAGE: {
      return {
        ...state,
        user: {
          ...state.user,
          pictureURL: { url: action.payload.imageUrl }
        }
      };
    }
    case ActionTypes.SET_SOCKET: {
      return {
        ...state,
        socket: action.payload
      }
    }
    default:
      return state;
  }
}
export default UserReducer