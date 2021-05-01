import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { theme } from "./themes/theme";
//import { useUserDispatch, fetchUserData } from "./context/user/userContext"
import {
  ThemeProvider,
  Container,
  CssBaseline,
} from "@material-ui/core";
import "./App.css";

//import socket from "./socket-client/socket";
import PrivateRoute from './hocs/privateRoute'
import UnPrivateRoute from './hocs/unPrivateRoute'
import LandingPage from "./containers/LandingPage"
import Home from 'containers/Home'



const dotenv = require("dotenv");
dotenv.config();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg" style={{ margin: "auto" }}>
          <Switch>
            <UnPrivateRoute exact path="/" component={LandingPage} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
