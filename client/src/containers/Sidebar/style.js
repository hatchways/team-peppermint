import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2.5),
    paddingTop: 0,
    width: "35%",
    minWidth: 410,
    height: "100%",
    backgroundColor: "#f5f7fb",
    [`@media (max-width:820px)`]: {
      width: "100%",
      minWidth: 0,
    },
  },
}));
