import React, { useReducer, useContext, createContext, useEffect } from "react";
import UserReducer from "./userReducer";

import UserServices from "services/apiCalls/user.services";
import Action, { ActionTypes } from 'types'
import socketIOClient from 'socket.io-client';

const UserStore = createContext();
const UserDispatch = createContext();

const initialState = {
  isAuthenticated: false,
  isLoaded: false,
  user: {
    _id: "",
    name: "",
    email: "",
    language: "",
    pictureURL: { url: "" },

  },
  socket: null,
}
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  useEffect(() => {
    UserServices.isAuthenticated()
      .then(res => {
        dispatch(Action(ActionTypes.SET_USER_DATA, res.data))
      })
      .catch(err => console.error(err.message))
  }, [])

  useEffect(() => {
    if (state.isAuthenticated && !state.socket) {
      dispatch(Action(ActionTypes.SET_SOCKET, socketIOClient({
        query: {
          userID: state.user._id
        }
      })))
    }
    return () => state.socket?.disconnect
  }, [state])
  return (
    <UserStore.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>
        {children}
      </UserDispatch.Provider>{" "}
    </UserStore.Provider>
  );
}

const useUserStore = () => useContext(UserStore)
const useUserDispatch = () => useContext(UserDispatch)
export {
  useUserStore,
  useUserDispatch,
  UserProvider,
};
