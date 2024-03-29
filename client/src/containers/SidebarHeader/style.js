import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
    minHeight: "10vh",

    backgroundColor: "transparent",
  },
  leftRightSideStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: theme.spacing(2),
  },
  badge: { top: 63, right: 5 },
  typography: {
    fontWeight: 600,
    textAlign: "center",
  },
  logoutStyle: {
    color: "black",
    textDecoration: "none",
  },
}));
