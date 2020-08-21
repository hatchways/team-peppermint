import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

import { theme } from "./themes/theme";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import { ContactsProvider } from "./context/contacts/contactsContext";
import MainPage from "./containers/MainPage";
import UserContext from "./Context/UserContext";
import { MuiThemeProvider, Container, CssBaseline } from "@material-ui/core";
import "./App.css";

const dotenv = require("dotenv");
dotenv.config();

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  });
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
        const userRes = await Axios.get("http://localhost:3001/api/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    // const checkLoggedIn = async () => {
    //   const tokenRes = await userCall.post("http://localhost:3001/api/user/tokenIsValid");
    //   if (tokenRes) {
    //     const userRes = await userCall.get("http://localhost:3001/api/user/");
    //     setUserData({
    //       user: userRes.data
    //     });
    //   }
    // }
    checkLoggedIn();
  }, []);
  console.log(userData);
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <ContactsProvider>
            <CssBaseline />
            <Container maxWidth="lg" style={{ margin: "auto" }}>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
              </Switch>
            </Container>
          </ContactsProvider>
        </UserContext.Provider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
