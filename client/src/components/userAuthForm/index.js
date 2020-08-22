import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useHistory } from "react-router";

import Axios from "axios";

import UserContext from "../../Context/UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
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

export default function UserAuthForm({ headerText }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("");
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [error, setError] = useState();
  let validEmail, validPassword, validName;

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [nameHelperText, setNameHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  function validateInput(name, email, password) {
    // true means invalid, so our conditions got reversed
    if (headerText === "Create an account.") {
      return {
        name: name.length === 0,
        email: email.length === 0,
        password: password.length === 0,
      };
    } else {
      return {
        email: email.length === 0,
        password: password.length === 0,
      };
    }
  }

  const handleBlur = (field) => (evt) => {
    evt.preventDefault();
    setTouched({ ...touched, [field]: true });
  };

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
    if (validateName(event.target.value)) {
      setNameHelperText("");
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setEmailHelperText("");
    }
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    if (validatePass(event.target.value)) {
      setPasswordHelperText("");
    }
  };

  const errors = validateInput(name, email, password);
  const isDisabled = Object.keys(errors).some((x) => errors[x]);

  function validateEmail(email) {
    let regex = /^[^@]+@[^@]+\.[^@]+$/;
    validEmail = regex.test(email);
    if (!validEmail) setEmailHelperText("That is not an email");
    return validEmail;
  }
  function validateName(name) {
    if (name.length === 0) setNameHelperText("Name is required");
    return name.length > 0;
  }
  function validatePass(password) {
    validPassword = password.length >= 6;
    if (!validPassword)
      setPasswordHelperText("Password needs to be at least 6 characters");

    return validPassword;
  }

  function isFormValid() {
    //check individual
    //check individual
    validEmail = validateEmail(email);
    validPassword = validatePass(password);

    if (validEmail) setEmailHelperText("");
    if (validPassword) setPasswordHelperText("");
    if (headerText === "Create an account.") {
      validName = validateName(name);
      if (validName) setNameHelperText("");
    }
    //check entire form
    return (
      (validName === undefined ? true : validName) &&
      validEmail &&
      validPassword
    );
  }

  function resetInputs() {
    setName("");
    setEmail("");
    setPassword("");
    setLanguage("");
  }

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setError();
    try {
      //make sure that form is valid

      if (isFormValid()) {
        if (headerText === "Create an account.") {
          //Signup route

          //UI response
          setIsAlert(true);
          //set newUser to register and then post to backend, then reset fields
          const newUser = {
            name: name,
            email: email,
            password: password,
            language: language,
          };
          await Axios.post("http://localhost:3001/api/user/signup", newUser);
          const loginRes = await Axios.post(
            "http://localhost:3001/api/user/login",
            {
              email,
              password,
            }
          );
          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          resetInputs();
          history.push("/");
        } else {
          //login route
          //UI response
          setIsAlert(true);
          //set user to login and then post to backend, then reset fields
          const user = {
            email: email,
            password: password,
          };
          const loginRes = await Axios.post(
            "http://localhost:3001/api/user/login",
            user
          );
          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          resetInputs();
          history.push("/");
        }
      }
    } catch (err) {
      if (err.response.data.msg) setError(err.response.data.msg);
      else console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAlertClose = () => {
    setIsAlert(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h2 className={classes.header}>{headerText}</h2>
      <form onSubmit={handleSubmit} className={classes.root}>
        {headerText === "Create an account." ? (
          <TextField
            label="Choose your display name"
            className={classes.formField}
            name="name"
            required
            type="text"
            onChange={handleName}
            value={name}
            onBlur={handleBlur("name")}
            helperText={nameHelperText}
            error={nameHelperText ? true : false}
          />
        ) : null}
        <TextField
          label="E-mail address"
          className={classes.formField}
          name="email"
          required
          type="text"
          onChange={handleEmail}
          value={email}
          onBlur={handleBlur("email")}
          helperText={emailHelperText}
          error={emailHelperText ? true : false}
        />
        <TextField
          label="Password"
          className={classes.formField}
          required
          type="password"
          name="password"
          onChange={handlePassword}
          value={password}
          onBlur={handleBlur("password")}
          helperText={passwordHelperText}
          error={passwordHelperText ? true : false}
        />
        {headerText === "Create an account." ? (
          <>
            <InputLabel id="label" className={classes.languageHeader}>
              Select primary language
            </InputLabel>
            <Select
              labelId="label"
              id="select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={language}
              onChange={handleLanguage}
              className={classes.formField}
              label="Select primary language"
            >
              <MenuItem value="english" default>
                English
              </MenuItem>
              <MenuItem value="chinese">Chinese (Mandarin)</MenuItem>
              <MenuItem value="spanish">Spanish</MenuItem>
              <MenuItem value="french">French</MenuItem>
            </Select>
          </>
        ) : null}


        <Button
          variant="contained"
          disableElevation
          className={classes.ctaBTN}
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </Button>
      </form>

      {/* Welcome Message */}

      <Snackbar
        open={isAlert}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        {error ? (
          <Alert open={isAlert} onClose={handleAlertClose} severity="error">
            {error}
          </Alert>
        ) : (
          <Alert open={isAlert} onClose={handleAlertClose}>
            {headerText === "Create an account." ? "Welcome!" : "Welcome Back"}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
