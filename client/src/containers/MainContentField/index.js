import React from "react";
import { useStyles } from "./style";
import MainContentFieldNavBar from "../MainContentFieldNavBar";
import MessageField from "../MessageField";

const MainContentField = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <MainContentFieldNavBar /> 
      <MessageField/>
    </section>
  );
};

export default MainContentField;