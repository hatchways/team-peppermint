import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./context/user/userContext";
import { ContactsProvider } from "./context/contacts/contactsContext";

ReactDOM.render(
  <UserProvider>
    <ContactsProvider>
      <App />
    </ContactsProvider>
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
