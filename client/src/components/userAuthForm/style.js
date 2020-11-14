import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40px",
  },
  formField: {
    width: "80%",
    marginBottom: "40px",
    "& .MuiInputBase-input": {
      padding: "6px 0 20px",
    },
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
  [`@media (max-width:560px)`]: {
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      textAlign: "center",
      fontSize: "1.5em",
    },
  },
}));
