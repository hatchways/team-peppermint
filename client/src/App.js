import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import MainPage from "./containers/MainPage";

import { MuiThemeProvider, Container, CssBaseline } from "@material-ui/core";
import "./App.css";

function App() {
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
