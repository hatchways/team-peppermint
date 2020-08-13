import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
    borderRadius: theme.spacing(1),
    backgroundColor: "#f9fafc",
    boxShadow: "0 0 1px 0 grey",
  },
  avatarNameContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    height: "100%",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
