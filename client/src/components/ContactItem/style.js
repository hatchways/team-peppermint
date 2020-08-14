import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(1),
    width: "100%",
    borderRadius: theme.spacing(1),
    backgroundColor: "transparent",
  },
  avatarNameContainer: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    height: "100%",
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
