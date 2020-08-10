import React from "react";
import { MuiThemeProvider, Container, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import MainPage from "./containers/MainPage";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg" style={{ margin: "auto" }}>
          <Route path="/" component={MainPage} />
        </Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
