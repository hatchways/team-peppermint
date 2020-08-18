import React from "react";
import { MuiThemeProvider, Container, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import MainPage from "./containers/MainPage";
import "./App.css";
import { ContactsProvider } from "./context/contacts/contactsContext";
const dotenv = require("dotenv");
dotenv.config();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg" style={{ margin: "auto" }}>
          <ContactsProvider>
            <Route path="/" component={MainPage} />
          </ContactsProvider>
        </Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
