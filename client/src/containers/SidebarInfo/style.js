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
  tabsHeader:{
    backgroundColor: '#FFFFFF'
  },
  tabs: {
    borderColor: "none",
  },
  tabPanel: {
    width: "100%",
    height: "100%",
  },
 
  collapse: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
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
