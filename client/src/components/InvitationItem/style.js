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
  }  
}));
