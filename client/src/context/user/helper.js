import { ActionTypes } from 'types';
import axios from "axios";
import UserServices from 'services/apiCalls/user.services'
export const fetchUserData = async (dispatch) => {

  const userRes = UserServices.isAuthenticated()
  dispatch({
    type: ActionTypes.SET_USER_DATA,
    payload: userRes.data,
  });
};


export const updateUserImage = (imageUrl, dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_USER_IMAGE,
    payload: imageUrl,
  });
};
