import React, { useReducer, useContext } from "react";
import userReducer from "../../../context/user/userReducer";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    token: "123",
    user: {
      id: "1",
      name: "Jane",
      email: "jane@gmail.com",
      language: "English",
      pictureURL: { url: "https://www.picture.com" },
    },
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>{" "}
    </UserStateContext.Provider>
  );
};

export default UserProvider;

