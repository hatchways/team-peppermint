import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: "center",
    justifyContent: "end",
    paddingTop: 15
  },
  button: {
    marginRight: 30,
    padding: '15px 40px',
    color: "#3A8DFF",
    backgroundColor: '#fff',
  },
  text: {
    marginRight: 25,
    color: "rgb(180, 180, 180)",
  },
});

export default function FormPageHeader({questionText, buttonText}) {
  const classes = useStyles();
  
  //get conditional routing
  function checkNav(text) {
    if (text.toLowerCase() === "login") {
      return '/login'
    } else {
      return '/signup'
    }
  }
  let pageNav = checkNav(buttonText);

  return (
    <div className={classes.container}>
      <Button 
        className={classes.button}
        variant="contained"
      >
        <Link to={pageNav}>
          {buttonText}
        </Link>
      </Button>
      <p className={classes.text}>{questionText}</p>
      
    </div>
  )
}