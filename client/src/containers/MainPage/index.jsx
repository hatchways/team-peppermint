import React from "react";
import { useStyles } from "./style";
import Sidebar from "../Sidebar";
import MainContentField from "../MainContentField";

const MainPage = () => {
  const classes = useStyles();
  
  return (
    <main className={classes.root}>
      <Sidebar/>
      <MainContentField/>
    </main>
  );
};

export default MainPage;
