import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Axios from "axios";
import { theme } from "./themes/theme";
import { useUserDispatch, fetchUserData } from "./context/user/userContext";
import {
  MuiThemeProvider,
  Container,
  CssBaseline,
  CircularProgress,
  Box,
} from "@material-ui/core";
import "./App.css";
import { userEmailFromLocalStorage } from "./context/contacts/helper";
import socket from "./socket-client/socket";

const MainPage = lazy(() => import("./containers/MainPage"));
const LoginPage = lazy(() => import("./containers/LoginPage"));
const SignupPage = lazy(() => import("./containers/SignupPage"));

const dotenv = require("dotenv");
dotenv.config();

function App() {
  const dispatch = useUserDispatch();
  const email = userEmailFromLocalStorage();

  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/tokenIsValid`,
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
      // e.returnValue = null;
      socket.emit("logout", email);
    });
  }, [email]);

  return (
    <MuiThemeProvider theme={theme}>
      <Suspense
        fallback={
          <Box
            component="div"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <CircularProgress size={50} thickness={4} />
          </Box>
        }
      >
        <Router>
          <CssBaseline />
          <Container maxWidth="lg" style={{ margin: "auto" }}>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/login">
                {token ? <Redirect to="/" /> : <LoginPage />}
              </Route>
              <Route path="/signup" component={SignupPage} />
            </Switch>
          </Container>
        </Router>
      </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
