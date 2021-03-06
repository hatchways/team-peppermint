import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./context/user/userContext";
import { ContactsProvider } from "./context/contacts/contactsContext";
import { ConversationsProvider } from "./context/conversations/conversationsContext";
import Axios from "axios";

if (process.env.REACT_APP_BACKEND_URL) {
  Axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
}

ReactDOM.render(
  <UserProvider>
    <ContactsProvider>
      <ConversationsProvider>
        <App />
      </ConversationsProvider>
    </ContactsProvider>
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
