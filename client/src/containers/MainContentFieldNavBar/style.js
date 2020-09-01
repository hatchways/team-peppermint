import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: "10vh",
    backgroundColor: "#fff",
    boxShadow: " 0 15px 15px #f5f7fb",
  },
  leftRightSideStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  onOfflineStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 50,
  },
  typography: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#3A8DFF",
  },
  [`@media (max-width:510px)`]: {
    root: {
      flexDirection: "column",
      justifyContent: "center",
      padding: 20,
    },
    leftRightSideStyle: {
      padding: 0,
    },
    typography: {
      fontSize: "1.3rem",
    },
  },
}));

export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: theme.spacing(1.1),
    height: theme.spacing(1.1),
    borderRadius: "50%",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);
