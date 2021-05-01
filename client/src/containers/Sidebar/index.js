import React from "react";
import { useStyles } from "./style";
import SidebarHeader from "../SidebarHeader";
import SidebarInfo from "../SidebarInfo";

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SidebarHeader />
      <SidebarInfo />
    </div>
  );
};

export default Sidebar;
