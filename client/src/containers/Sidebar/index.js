import React, { useState }  from "react";
import { useStyles } from "./style";
import SidebarNavBar from "../SidebarNavBar";
import SidebarInfo from "../SidebarInfo";

const Sidebar = () => {
  const classes = useStyles();


  return (
    <section className={classes.root}>
      <SidebarNavBar />
      <SidebarInfo />
    </section>
  );
};

export default Sidebar;
