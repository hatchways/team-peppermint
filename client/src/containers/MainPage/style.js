import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: theme.spacing(1),
    [`@media (max-width:820px)`]: {
      flexDirection: "column-reverse",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
}));
