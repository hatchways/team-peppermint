import React, { useReducer, useContext } from "react";
import userReducer from "./userReducer";
import { fetchUserData, setUserData, updateUserImage } from "./helper";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    token: "",
    user: {
      id: "",
      name: "",
      email: "",
      language: "",
      pictureURL: { url: "" },
    },
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>{" "}
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = useContext(UserStateContext);
  return context;
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  fetchUserData,
  setUserData,
  updateUserImage,
};
