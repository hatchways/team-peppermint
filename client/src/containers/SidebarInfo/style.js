import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  tabs: {
    backgroundColor: "#f5f7fb",
    borderColor: "none",
  },
  tabPanel: {
    width: "100%",
    height: "100%",
  },
  search: {
    display:'flex',
    justifyContent:'space-between',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e9eef9",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: "100%",
    height: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clearIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  debounceInput: {
    border: "none",
    height: "100%",
    width: "70%",
    backgroundColor: "transparent",
    fontSize: "1.3rem",
    right: 0,
    outline: "none",
  },
  collapse: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    width: "100%",
  },
  alert: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  [`@media (max-width:400px)`]: {
    tabs: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
