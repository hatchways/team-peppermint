import { FETCH_USER_DATA, SET_USER_DATA, UPDATE_USER_IMAGE } from "../../types";
import axios from "axios";

export const fetchUserData = async (dispatch) => {
  let token = localStorage.getItem("auth-token");

  const userRes = await axios.get("/api/user/", {
    headers: { "x-auth-token": token },
  });  
  dispatch({
    type: FETCH_USER_DATA,
    payload: {
      token: token,
      user: userRes.data,
    },
  });
};

export const setUserData = async (token, user, dispatch) => {
  dispatch({
    type: SET_USER_DATA,
    payload: {
      token,
      user,
    },
  });
};

export const updateUserImage = async (imageUrl, dispatch) => {
  dispatch({
    type: UPDATE_USER_IMAGE,
    payload: imageUrl,
  });
};
