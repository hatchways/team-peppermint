import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export const OfflineBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#D3D3D3",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: theme.spacing(1.4),
    height: theme.spacing(1.4),
    borderRadius: "50%",
    top: theme.spacing(5),
    right: theme.spacing(0.5),    
  }, 
}))(Badge);

export const OnlineBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: theme.spacing(1.1),
    height: theme.spacing(1.1),
    borderRadius: "50%",
    top: theme.spacing(5),
    right: theme.spacing(0.5),
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


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      marginRight: theme.spacing(3),
    },
  },
  avatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
}));
