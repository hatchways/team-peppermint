import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

import { theme } from "./themes/theme";
import LoginPage from "./containers/LoginPage";
import SignupPage from "./containers/SignupPage";
import { useUserDispatch, fetchUserData } from "./context/user/userContext";
import MainPage from "./containers/MainPage";
import { MuiThemeProvider, Container, CssBaseline } from "@material-ui/core";
import "./App.css";
import { userEmailFromLocalStorage } from "./context/contacts/helper";
import socket from "./socket-client/socket";

const dotenv = require("dotenv");
dotenv.config();

function App() {
  const dispatch = useUserDispatch();

  const email = userEmailFromLocalStorage();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:3001/api/user/tokenIsValid",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        socket.emit("login", email);
        fetchUserData(dispatch);
      }
    };
    checkLoggedIn();
    socket.emit("login", email);
  }, [dispatch, email]);

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
      socket.emit("logout", email);
    });
  }, [email]);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg" style={{ margin: "auto" }}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </Container>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
