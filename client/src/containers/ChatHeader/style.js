import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "10%",
    backgroundColor: "#fff",
    borderBottomStyle: 'solid',
    borderBottomWidth:'1px',
    borderBottomColor: theme.palette.grey[200],
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    padding: theme.spacing(0,4)
  },
  chatHeaderUserInfo:{
    display:'flex',
    alignItems: 'center'
  },
  chatHeaderOptions:{
    display:'flex',
    alignItems:'center',
    justifySelf:'flex-end'
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
