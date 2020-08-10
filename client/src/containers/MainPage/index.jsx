import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { shadows } from '@material-ui/system';
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
