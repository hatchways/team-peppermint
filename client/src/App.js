import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import LandingPage from "./pages/Landing";
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
