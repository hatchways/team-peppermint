import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2.5),
    width: "35%",
    height: "100%",
    backgroundColor: "#f5f7fb",
  },
}));
