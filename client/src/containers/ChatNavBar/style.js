import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",   
    width: "100%",
    height: "10vh",
    backgroundColor: "#fff",
    // boxShadow: "0 6px 10px -10px #888",
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
    width: 60,
  },
}));
