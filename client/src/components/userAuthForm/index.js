import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'Column',
    marginTop: "40px"
  },
  formField: {
    width: '80%',
    marginBottom: '40px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  },
  header: {
    marginTop: '80px'
  },
  languageHeader: {
    marginTop: '20px'
  },
  ctaBTN: {
    color: '#fff',
    backgroundColor: '#3A8DFF',
    width: '40%',
    margin: '0 17.5%',
    padding: '20px 30px'
  }
}));

//
function validateInput(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0
  };
}

export default function UserAuthForm({headerText}) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [emailHelperText, setEmailHelperText] = useState('')
  const [passwordHelperText, setPasswordHelperText] = useState('')

  const handleBlur = (field) => (evt) => {
    evt.preventDefault();
    setTouched({...touched, [field]: true})
  }

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    if (validateEmail()) {
      setEmailHelperText('')
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    if (validatePass()) {
      setPasswordHelperText('');
    } 
  };

  console.log(`email: ${email} password: ${password} language: ${language}`)

  const errors = validateInput(email, password);
  const isDisabled = Object.keys(errors).some(x => errors[x]);

  // const shouldMarkError = field => {
  //   const hasError = errors[field];
  //   const shouldShow = touched[field];

  //   return hasError ? shouldShow : false;
  // };

  function validateEmail() {
    let regex = /^[^@]+@[^@]+\.[^@]+$/
    if (regex.test(email) === false) {
      setEmailHelperText("That is not an email");
      return false;
    } else {
      return true;
    }
  }

  function validatePass() {
    if (password.length < 6) {
      setPasswordHelperText("Password needs to be at least 6 characters");
      return false;
    } else {
      return true;
    }
  }

  function isFormValid() {
    //check individual
    if (validateEmail()) {
      setEmailHelperText('')
    } else if (validatePass()) {
      setPasswordHelperText('');
    } 
    //check entire form
    if (validateEmail() && validatePass()) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (isFormValid()){
      alert(`Signed up with email: ${email}, password: ${password}, language: ${language}`);
      setIsAlert(true);
    }
    return;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h2 className={classes.header}>{headerText}</h2>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          label="E-mail address" 
          className={classes.formField}
          name="email" 
          required
          type="text"
          onChange={handleEmail}
          value={email}
          onBlur={handleBlur('email')}
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
          onBlur={handleBlur('password')}
          helperText={passwordHelperText}
          error={passwordHelperText ? true : false}
        />
        {headerText === 'Create an account.' ? 
          <>
            <InputLabel id='label' className={classes.languageHeader}>Select primary language</InputLabel>
            <Select 
              labelId='label'
              id="select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={language}
              onChange={handleLanguage}
              className={classes.formField}
              label="Select primary language"
            >
              <MenuItem value="en" default>English</MenuItem>
              <MenuItem value="ch">Chinese (Mandarin)</MenuItem>
              <MenuItem value="sp">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
            </Select>
          </>
          : null}

        <Button
          variant="contained"
          disableElevation
          className={classes.ctaBTN}
          type="submit"
          disabled={isDisabled}
        >Submit</Button>
      </form>

      {/* Welcome Message */}
      <Snackbar
        open={isAlert}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severeity="success"
        >
          {headerText === 'Create an account.' ? 'Welcome!' : 'Welcome Back'}
        </Alert>
      </Snackbar>
    </>
  )
}