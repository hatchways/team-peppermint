import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "10vh",
    backgroundColor: "transparent",
  },
  leftRightSideStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
    border: `2px solid ${theme.palette.background.paper}`,
  },
  badge: { top: 63, right: 5 },
  typography: {
    fontWeight: 600,
  },
  logoutStyle: {
    color: "black",
    textDecoration: "none",
  },
}));
