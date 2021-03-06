import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(1),
    width: "100%",
    borderRadius: theme.spacing(1),
    backgroundColor: "transparent",
  },
  typography: {
    fontSize: theme.spacing(2),
    marginBottom: 0,
    fontWeight: 600,
  },
  [`@media (max-width:400px)`]: {
    root: {
      flexDirection: "column",
      justifyContent: "center",
    },
    typography: {
      fontSize: "1.3rem",
      marginBottom: theme.spacing(1),
    },
  },
}));
