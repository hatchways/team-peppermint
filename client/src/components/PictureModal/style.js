import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    display: "block",
    width: "50%",
    height: "80%",
    outline:'none',
    objectFit: "contain",
  },
}));
