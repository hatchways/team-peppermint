import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    // fontFamily: '"Roboto"',
    fontFamily: "Open sans",
    fontSize: 16,
    h1: {
      // could customize the h1 variant as well
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
  },
});
