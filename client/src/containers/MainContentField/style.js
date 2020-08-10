import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2),
    display: "flex",
    flexDirection:'column',
    // justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "100%",
    backgroundColor: "#fff",    
  },
}));
