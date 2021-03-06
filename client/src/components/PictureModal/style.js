import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    display: "block",
    maxWidth: "50%",
    maxHeight: "80%",
    outline:'none',
    objectFit: "contain",
  },
}));
