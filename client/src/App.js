import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

import { theme } from "./themes/theme";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import { useUserDispatch, fetchUserData } from "./context/user/userContext";
import MainPage from "./containers/MainPage";
import { MuiThemeProvider, Container, CssBaseline } from "@material-ui/core";
import "./App.css";

const dotenv = require("dotenv");
dotenv.config();

function App() {
  const dispatch = useUserDispatch();

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
        fetchUserData(dispatch);
      }
    };    
    checkLoggedIn();
  }, [dispatch]);

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
