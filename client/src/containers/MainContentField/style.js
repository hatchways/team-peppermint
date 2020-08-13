import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    height: "100%",
    backgroundColor: "#fff",
    [`@media (max-width:820px)`]: {
      width: "100%",
    },
  },
}));
