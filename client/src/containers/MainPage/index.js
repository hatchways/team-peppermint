import React, { useState } from "react";
import { useStyles } from "./style";
import Sidebar from "../Sidebar";
import MainContentField from "../MainContentField";
import SelectContact from "../../Context/SelectContact"
const MainPage = () => {
  const classes = useStyles();
  const [contact, setContact] = useState({})
  return (
    <main className={classes.root}>
      <SelectContact.Provider value={{ contact, setContact }}>
        <Sidebar />
        <MainContentField />
      </SelectContact.Provider>
    </main>
  );
};

export default MainPage;
