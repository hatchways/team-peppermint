import { ActionTypes } from 'types'
export const initialState = {
  isAuthenticated: false,
  isLoaded: false,
  user: {
    _id: '',
    name: '',
    email: '',
    language: '',
    pictureURL: { url: '' },
  },
  socket: null,
}
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
          pictureURL: { url: action.payload.imageUrl },
        },
      }
    }
    case ActionTypes.SET_SOCKET: {
      return {
        ...state,
        socket: action.payload,
      }
    }
    case ActionTypes.RESET_USER: {
      return initialState
    }
    default:
      return state
  }
}
export default UserReducer
