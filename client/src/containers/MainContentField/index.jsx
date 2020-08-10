import React from "react";
import { useStyles } from "./style";
import ChatNavBar from "../ChatNavBar";
import MessageField from "../MessageField";

const MainContentField = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ChatNavBar /> 
      <MessageField/>
    </section>
  );
};

export default MainContentField;