import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../assets/login-signup-bgImage.png";
import SmsRoundedIcon from "@material-ui/icons/SmsRounded";
import TranslateRoundedIcon from "@material-ui/icons/TranslateRounded";

const useStyles = makeStyles({
  imageContainer: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
    marginRight: 20,
  },
  gradientContainer: {
    backgroundImage: "linear-gradient(#3a8cffca, #86b8ffc9)",
    height:'100%',
    width: "100%",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
  },
  iconStyle: {
    fontSize: 70,
    color: "rgba(255, 255, 255, 0.80)",
  },
  textStyle: {
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "200",
    fontSize: 40,
    width: "70%",
    textAlign: "center",
    marginBottom: -80,
    marginTop: -80,
  },
  [`@media (max-width:560px)`]: {
    imageContainer: {
     display:'none'
    },
  },
});

export default function BackgroundImage() {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <div className={classes.gradientContainer}>
        <SmsRoundedIcon className={classes.iconStyle} />
        <h3 className={classes.textStyle}>
          Converse with anyone with any language
        </h3>
        <TranslateRoundedIcon className={classes.iconStyle} />
      </div>
    </div>
  );
}
