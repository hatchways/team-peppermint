import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "Column",
    marginTop: "40px",
  },
  formField: {
    width: "80%",
    marginBottom: "40px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  header: {
    marginTop: "80px",
  },
  languageHeader: {
    marginTop: "20px",
  },
  ctaBTN: {
    color: "#fff",
    backgroundColor: "#3A8DFF",
    width: "40%",
    margin: "0 17.5%",
    padding: "20px 30px",
  },
}));